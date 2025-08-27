import { PutObjectCommand, S3Client, HeadObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import fs  from 'fs'
import md5 from 'md5'
import mime from 'mime-types'
import { readFile } from 'fs/promises';

import {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2BucketName
} from './config.js'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${cloudflareAccountId}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: cloudflareR2AccessKeyId,
        secretAccessKey: cloudflareR2SecretAccessKey,
    },
});

function getMimeType(fileName) {
    return mime.lookup(fileName.substr(fileName.lastIndexOf('.')));
};

async function processFileFetch() {
    //We'll get this through a github actions response
    const response = await readFile("FILES_CHANGED.txt", 'utf8');
    const filesChanged = response.split("\n").filter(Boolean);
    return filesChanged;
}

async function attemptFileUpload(fileName) {
    let filePath = `./${fileName}`;
    const fileStream = fs.createReadStream(filePath);

    let mimeType = getMimeType(fileName);

    const uploadParams = {
        Bucket: cloudflareR2BucketName,
        Key: fileName,
        Body: fileStream,
        ContentLength: fs.statSync(filePath).size,
        ContentType: mimeType
    };

    const cmd = new PutObjectCommand(uploadParams);

    const digest = md5(fileStream);

    cmd.middlewareStack.add((next) => async (args) => {
        args.request.headers['if-none-match'] = `"${digest}"`;
        return await next(args);
    }, {
        step: 'build',
        name: 'addETag'
    })

    const data = await S3.send(cmd);
    console.log(`Uploaded: ${fileName} - Status Code: ${data.$metadata.httpStatusCode}`);
}

async function attemptFileDeletion(fileName) {
    try {
        await S3.send(
            new HeadObjectCommand({
                Bucket: cloudflareR2BucketName,
                Key: fileName,
            })
        )
    
        const command = new DeleteObjectCommand ({
            Bucket: cloudflareR2BucketName,
            Key: fileName,
        });

        await S3.send(command);
    } catch (err) {
        console.warn(`WARNING: Couldn't delete ${fileName} because it was not found in the bucket`, err)
    }

    console.log(`Deleted: ${fileName}`);
}

(async function processFilesChanged() {
    try {
        let files = await processFileFetch()
        let cleanedFiles = files.filter(file => file.trim() !== '');

        for (const file of cleanedFiles) {
            const fileWithAction = file.split('\t');
            if (fileWithAction[0] == 'D') {
                attemptFileDeletion(fileWithAction[1]);
            } else {
                attemptFileUpload(fileWithAction[1]);
            }
            
        }
    } catch (err) {
        if (err.hasOwnProperty('$metadata')) {
            console.warn(`${fileWithAction[1]} was already found in the bucket, skipping`);
        } else {
            console.error('Error', err);
        }
    }
})();

