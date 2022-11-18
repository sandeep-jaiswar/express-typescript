import { S3Client } from '@aws-sdk/client-s3';
// Set the AWS Region.
const REGION = 'ap-south-1'; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3Client;
