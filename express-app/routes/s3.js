const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

// set AWS credentials to env variables
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: "ap-southeast-2"
});


const s3 = new AWS.S3();

// initialise bucket and object variables
const bucketName = "11244682-counter";
const objectKey = "counter.json";
const jsonData = {
    counter: 1
}

/* GET and update page visit counter. */
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

// function to create a new bucket
async function createBucket(){

    try {
        await s3.createBucket( { Bucket:bucketName }).promise();
    } catch (err) {
        // if the bucket exists, dont throw an error
        if (err.statusCode !== 409) throw err;
    }
}

// function to get current counter from s3 and update local object
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
        // if the object doesnt exist dont throw an error
        if (err.code !== 'NoSuchKey') throw err;
    }
}

// function to upload the local object to the s3 bucket
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
