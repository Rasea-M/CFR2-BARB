const {
    INPUT_CLOUDFLARE_ACCOUNT_ID,
    INPUT_CLOUDFLARE_R2_ACCESS_KEY_ID,
    INPUT_CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    INPUT_CLOUDFLARE_R2_BUCKET_NAME,
} = process.env

if (
    !INPUT_CLOUDFLARE_ACCOUNT_ID ||
    !INPUT_CLOUDFLARE_R2_ACCESS_KEY_ID ||
    !INPUT_CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
    !INPUT_CLOUDFLARE_R2_BUCKET_NAME
) {
    console.log(process.env)
    throw new Error('Missing environment variables.')
}

const cloudflareAccountId = INPUT_CLOUDFLARE_ACCOUNT_ID
const cloudflareR2AccessKeyId = INPUT_CLOUDFLARE_R2_ACCESS_KEY_ID
const cloudflareR2SecretAccessKey = INPUT_CLOUDFLARE_R2_SECRET_ACCESS_KEY
const cloudflareR2BucketName = INPUT_CLOUDFLARE_R2_BUCKET_NAME

export {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2BucketName
}
