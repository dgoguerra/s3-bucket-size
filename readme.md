## s3-bucket-size

Get a S3 bucket total size.

### Installation

```bash
npm install -g s3-bucket-size
```

### Usage

`s3-bucket-size` uses the git repository in the current directory.

```bash
# basic usage
$ s3-bucket-size backups-3264fa7
146.42 GB in 930 objects

# filter results by a prefix
$ s3-bucket-size backups-3264fa7 --prefix=2016
40.95 GB in 282 objects

# output bytes only
$ s3-bucket-size backups-3264fa7 -b
157213872121
```

### License

MIT license - http://www.opensource.org/licenses/mit-license.php
