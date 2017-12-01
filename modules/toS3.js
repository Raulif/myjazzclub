const knox = require('knox');

/*
This module allows uploading pictures onto AWS-S3 for online storage.
*/

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('../config/secrets.json'); // secrets.json is in .gitignore
}
const client = knox.createClient({
    key: secrets.awsKey,
    secret: secrets.awsSecret,
    bucket: 'myjazzclubbucket'
});

//IAM user: raulsbucketuser
//group: raulsgroup

function sendToS3(fileObj) {
    return new Promise((resolve, reject) => {
        const s3Request = client.put(fileObj.filename, {
            'Content-Type': fileObj.mimetype,
            'Content-Length': fileObj.size,
            'x-amz-acl': 'public-read'
        });
        const fs = require('fs');
        const readStream = fs.createReadStream(fileObj.path);
        readStream.pipe(s3Request);

        s3Request.on('response', s3Response => {
            console.log('tos3 response: ',s3Response.statusCode);
            const wasSuccessful = s3Response.statusCode == 200;
            if (wasSuccessful) {
                resolve()
            } else {
                reject()
            }
        });
    });
}

module.exports.toS3 = sendToS3;
