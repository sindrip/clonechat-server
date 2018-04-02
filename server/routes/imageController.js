// const AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'eu-west-1',
// });

// s3 = new AWS.S3({
//     apiVersion: '2006-03-01',
//     endpoint: process.env.LOCALSTACK_HOSTNAME,
//     s3ForcePathStyle: true,
// });

const s3 = require('../aws/s3');

module.exports.upload = async (req, res) => {
    console.log(process.env.LOCALSTACK_URL);
    console.log('here1');
    
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log('here2');
            
            console.log("Error", err);
        } else {
            console.log('here3');
            console.log("Bucket List", data.Buckets);
            data.Buckets.map((b) => {
                console.log(b);
                if (b.Name === 'flot') {
                    console.log('found')
                }
            });
        }
     });

    //  s3.createBucket({Bucket: 'flot'}, (err, data) => {
    //     if (err) {
    //         console.log("Error", err);
    //      } else {
    //         console.log("Success", data.Location);
    //      }
    //  });
     console.log('here4');

    return res.sendStatus(200);
}