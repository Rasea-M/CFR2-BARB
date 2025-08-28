const {
    cloudflare_account_id,
    cloudflare_r2_access_key_id,
    cloudflare_r2_secret_access_key,
    cloudflare_r2_bucket_name,
} = process.env

if (
    !cloudflare_account_id ||
    !cloudflare_r2_access_key_id ||
    !cloudflare_r2_secret_access_key ||
    !cloudflare_r2_bucket_name
) {
    console.log(process.env)
    throw new Error('Missing environment variables.')
}

const cloudflareAccountId = cloudflare_account_id
const cloudflareR2AccessKeyId = cloudflare_r2_access_key_id
const cloudflareR2SecretAccessKey = cloudflare_r2_secret_access_key
const cloudflareR2BucketName = cloudflare_r2_bucket_name

export {
    cloudflareAccountId,
    cloudflareR2AccessKeyId,
    cloudflareR2SecretAccessKey,
    cloudflareR2BucketName
}
