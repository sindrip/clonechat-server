const AWS = require('aws-sdk');
const environment = process.env.NODE_ENV;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1',
});

const s3 = new AWS.S3(require('./s3config')[environment]);

module.exports = s3;