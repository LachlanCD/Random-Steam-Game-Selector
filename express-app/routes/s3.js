const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: "ap-southeast-2"
});

const s3 = new AWS.S3();

const bucketName = "11244682-counter";
const objectKey = "counter.json";

const jsonData = {
    counter: 1
}

router.get('/', async (req, res) => {

    try {
        await createBucket();
        await getObjectFromS3();
        await uploadJsonToS3();

        res.json(jsonData);

    } catch (err) {
        res.status(400)
        res.send({ error: true, message: err.code });
    }
});

async function createBucket(){
    try {
        await s3.createBucket( { Bucket:bucketName }).promise();
    } catch (err) {
        if (err.statusCode !== 409) throw err;
    }
}

async function getObjectFromS3() {
    const params = {
        Bucket: bucketName,
        Key: objectKey,
    };

    try {
        const data = await s3.getObject(params).promise();
        const parsedData = JSON.parse(data.Body.toString("utf-8"));
        jsonData.counter = parsedData.counter + 1
    } catch (err) {
        if (err.code !== 'NoSuchKey') throw err;
    }
}

async function uploadJsonToS3() {
    const params = {
        Bucket: bucketName,
        Key: objectKey,
        Body: JSON.stringify(jsonData),
        ContentType: "application/json"
    };

    try {
        await s3.putObject(params).promise();
    } catch (err) {
        throw err
    }
}

module.exports = router;
