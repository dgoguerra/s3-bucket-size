var AWS = require('aws-sdk'),
    filesize = require('filesize'),
    debug = require('debug')('s3-bucket-size');

module.exports = function(bucket, prefix, next) {
    if (typeof prefix === 'function') {
        next = prefix;
        prefix = '';
    }

    var client = new AWS.S3({signatureVersion: 'v4'}),
        numObjects = 0,
        totalBytes = 0;

    (function listNextChunk(nextToken) {
        var params = {
            Bucket: bucket,
            Prefix: prefix.toString(),
            ContinuationToken: nextToken
        };

        client.listObjectsV2(params, function(err, data) {
            if (err) return next(err);

            data.Contents.forEach(function(obj) {
                numObjects++;
                totalBytes += obj.Size;
            });

            if (debug.enabled) {
                debug(filesize(totalBytes)+' in '+numObjects+' objects so far..');
            }

            if (data.NextContinuationToken) {
                return listNextChunk(data.NextContinuationToken);
            }

            return next(null, {
                num_objects: numObjects,
                bytes: totalBytes,
                bytes_str: filesize(totalBytes)
            });
        });
    })();
};

