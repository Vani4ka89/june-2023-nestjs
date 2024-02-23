import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';
import { Logger } from '@nestjs/common';

const client = new S3Client({
  credentials: {
    accessKeyId: 's3user',
    secretAccessKey: 's3password',
  },
  region: 'us-east-1',
  endpoint: 'http://localhost:7001',
  forcePathStyle: true,
});

async function foo() {
  try {
    await client.send(
      new CreateBucketCommand({
        Bucket: 'http://localhost:7001/feb2024',
        ACL: 'public-read',
      }),
    );
    Logger.log('Bucket is created');
  } catch (e) {
    Logger.log('Bucket is exist');
  }
}

void foo();
