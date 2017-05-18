## s3-bucket-size

Get a S3 bucket total size.

### Installation

```bash
npm install -g s3-bucket-size
```

### Usage

```bash
# basic usage
$ s3-bucket-size bucket-name
146.42 GB in 930 objects

# filter results by a prefix
$ s3-bucket-size bucket-name --prefix=2016
40.95 GB in 282 objects

# output bytes only
$ s3-bucket-size bucket-name -b
157213872121

# see progress in buckets with a lot of objects
$ DEBUG=s3-bucket-size s3-bucket-size big-bucket
  s3-bucket-size 432.55 MB in 1000 objects so far.. +0ms
  s3-bucket-size 957.06 MB in 2000 objects so far.. +547ms
  s3-bucket-size 1.63 GB in 3000 objects so far.. +692ms
  s3-bucket-size 2.38 GB in 4000 objects so far.. +666ms
  s3-bucket-size 3.24 GB in 4234 objects so far.. +828ms
3.24 GB in 4234 objects
```

### License

MIT license - http://www.opensource.org/licenses/mit-license.php
