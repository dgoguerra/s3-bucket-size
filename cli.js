#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
    bucketSize = require('./index.js');

if (argv.help || argv.h || argv._.length !== 1) {
    console.error('usage: s3-bucket-size BUCKET [--prefix=PREFIX] [-b]');
    process.exit(1);
}

var bucket = argv._[0];

bucketSize(bucket, argv.prefix || '', function(err, res) {
    if (err) return console.error(err.message);

    if (argv.b) {
        return console.log(res.bytes);
    }

    console.log(res.bytes_str+' in '+res.num_objects+' objects');
});
