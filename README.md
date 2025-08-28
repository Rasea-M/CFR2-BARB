# Cloudflare R2 Bucket Automatic Repository Backup (BARB)

## Introduction

This is an edited fork of [Karburst's Cloudflare R2 Upload](https://github.com/Karbust/Cloudflare_R2_Upload) Configured so it uploads a backup in the form of differential upgrades to a remote Cloudflare R2 bucket, meant to be used through Github Actions.

It supports file additions, modifications (The same as additions) and deletions.

Below is a sample .yml with the environment necessary.
Realistically you could run the git diff inside the same .js file, but I didn't.

```yml
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout project
      uses: actions/checkout@v4
      with:
        fetch-depth: 2

    - name: Get files difference
      run: | 
        git diff --name-status HEAD~1 > FILES_CHANGED.txt

    -name: Upload differential upgrade
        uses: Rasea-M/CFR2-BARB@latest
      env: 
        cloudflare-account-id: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        cloudflare-r2-access-key-id: ${{ secrets.CLOUDFLARE_R2_ACCESS_KEY_ID }}
        cloudflare-r2-secret-access-key: ${{ secrets.CLOUDFLARE_R2_SECRET_ACCESS_KEY }}
        cloudflare-r2-bucket-name: ${{ secrets.CLOUDFLARE_R2_BUCKET_NAME }}
```
