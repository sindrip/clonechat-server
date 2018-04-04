const uuid = require('uuid');

const s3 = require('../aws/s3');
const Image = require('./../resources/Image');

const BUCKET_NAME = 'clonechatbucket'

let createBucketIfNotExists = async () => {
    const data = await s3.listBuckets().promise();
    console.log(data.Buckets);
    const size = data.Buckets.filter(b => b.Name === BUCKET_NAME).length;
    console.log(size);
    if (size === 0) {
        console.log('create bucket');
        const bucket = await s3.createBucket({Bucket: BUCKET_NAME}).promise();
    } else {
        console.log('already created');
    }
};

module.exports.upload = async (req, res) => {
    await createBucketIfNotExists();

    filename = uuid();
    
    try {
        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: req.file.buffer,
        }).promise();
    } catch(e) {
        return res.status(400).send();
    }

    const image = await Image.create(filename, req.session.user_id);

    return res.status(200).send(image);
}

module.exports.getSignedUrl = async (req, res) => {
    if (!req.params.id || isNaN(Number(req.params.id))) {
        return res.status(400).send();
    }

    if (!(await Image.userHasAccess(req.session.user_id, req.params.id))) {
        return res.status(400).send();
    }

    const result = await Image.findById(req.params.id);
    if (!result) {
        return res.sendStatus(400);
    }

    const params = {
        Bucket: BUCKET_NAME,
        Key: result.uuid,
    };

    try {
        await s3.headObject(params).promise();
    } catch (e) {
        return res.status(400).send();
    }

    let url = s3.getSignedUrl('getObject', params);
    if (!url) {
        return res.status(400).send();
    }
    if (process.env.NODE_ENV === 'development') {
        url = url.replace(/http:\/\/localstack:4572/, 'http://localhost:4572');
    }

    await Message.deleteMessageById(req.session.user_id, req.params.id);

    return res.redirect(url);
};