var AWS = require('aws-sdk'),
    filesize = require('filesize');

module.exports = function(bucket, prefix, next) {
    if (typeof prefix === 'function') {
        next = prefix;
        prefix = '';
    }

    var client = new AWS.S3(),
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

