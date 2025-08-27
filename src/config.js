const {
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_R2_ACCESS_KEY_ID,
    CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    CLOUDFLARE_R2_BUCKET_NAME,
} = process.env

if (
    !CLOUDFLARE_ACCOUNT_ID ||
    !CLOUDFLARE_R2_ACCESS_KEY_ID ||
    !CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
    !CLOUDFLARE_R2_BUCKET_NAME
) {
    throw new Error('Missing environment variables.')
}

const cloudflareAccountId = CLOUDFLARE_ACCOUNT_ID
const cloudflareR2AccessKeyId = CLOUDFLARE_R2_ACCESS_KEY_ID
const cloudflareR2SecretAccessKey = CLOUDFLARE_R2_SECRET_ACCESS_KEY
const cloudflareR2BucketName = CLOUDFLARE_R2_BUCKET_NAME

export {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2BucketName
}
