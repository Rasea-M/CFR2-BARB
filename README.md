# Cloudflare R2 Upload

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

    - name: Setup node with cache
      uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: 'npm'
        cache-dependency-path: ./package-lock.json
    
    - run: npm ci
    
    - name: Run script
      run: | 
        git diff --name-status HEAD~1 > FILES_CHANGED.txt
        node src/app.js
      env: 
        FILES_CHANGED: $FILES_CHANGED
        CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        CLOUDFLARE_R2_ACCESS_KEY_ID: ${{ secrets.CLOUDFLARE_R2_ACCESS_KEY_ID }}
        CLOUDFLARE_R2_SECRET_ACCESS_KEY: ${{ secrets.CLOUDFLARE_R2_SECRET_ACCESS_KEY }}
        CLOUDFLARE_R2_BUCKET_NAME: ${{ secrets.CLOUDFLARE_R2_BUCKET_NAME }}
```
