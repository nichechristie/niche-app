# Vercel Environment Variables Setup

After connecting your domain to Vercel, set these environment variables:

## How to Add Environment Variables in Vercel

1. Go to https://vercel.com
2. Select your **niche-app** project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. Add each variable below

---

## Required Environment Variables

### 1. NEXT_PUBLIC_URL
```
Key: NEXT_PUBLIC_URL
Value: https://findyourniche.shop
Environment: Production, Preview, Development
```
**What it does:** Sets the base URL for your app, used in Farcaster manifest and metadata

---

### 2. NEXT_PUBLIC_BASE_OWNER_ADDRESS
```
Key: NEXT_PUBLIC_BASE_OWNER_ADDRESS
Value: 0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf
Environment: Production, Preview, Development
```
**What it does:** Your wallet address for Base Builder integration

---

### 3. ACCOUNT_ASSOCIATION_HEADER
```
Key: ACCOUNT_ASSOCIATION_HEADER
Value: eyJmaWQiOjE0Mzg3MjMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhCZTNDMTZFMDkxMGVhRTI4ZDBhYzFDQzM1NDdiMDA3OUI4MjMwODljIn0=
Environment: Production, Preview, Development
```
**What it does:** Farcaster account association header for FID 1438723

---

### 4. ACCOUNT_ASSOCIATION_PAYLOAD
```
Key: ACCOUNT_ASSOCIATION_PAYLOAD
Value: eyJkb21haW4iOiJodHRwczovL2ZpbmR5b3VybmljaGUuc2hvcCJ9
Environment: Production, Preview, Development
```
**What it does:** Farcaster account association payload with your domain

---

### 5. ACCOUNT_ASSOCIATION_SIGNATURE
```
Key: ACCOUNT_ASSOCIATION_SIGNATURE
Value: 0xc91978f02741bc2f6981ddf5ec15f7a4af929f89f0c99ce76b2d8a61cb0a804f4d711a1caa9f0e69b2a246e89cef930e6cd6ddf67ee467e119d662f3c862359f1b
Environment: Production, Preview, Development
```
**What it does:** Cryptographic signature for Farcaster account association

---

## Optional Environment Variables (if using these features)

### 6. OPENAI_API_KEY (for AI features)
```
Key: OPENAI_API_KEY
Value: sk-proj-...your_key_here...
Environment: Production, Preview, Development
```
**What it does:** Enables AI image generation (DALL-E) and chatbot features

---

### 7. BLOB_READ_WRITE_TOKEN (for image uploads)
```
Key: BLOB_READ_WRITE_TOKEN
Value: vercel_blob_...your_token_here...
Environment: Production, Preview, Development
```
**What it does:** Enables image uploads to Vercel Blob storage

---

## After Adding Variables

### Redeploy Your App
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### Verify It Works
1. Visit: https://findyourniche.shop/api/manifest
2. Check that all URLs show `findyourniche.shop` (not the Vercel URL)
3. Test Farcaster manifest: https://findyourniche.shop/.well-known/farcaster.json

---

## Quick Copy-Paste Format

For quick setup, copy this and fill in the values:

```env
NEXT_PUBLIC_URL=https://findyourniche.shop
NEXT_PUBLIC_BASE_OWNER_ADDRESS=0x5ab1A8dBB78c272540D3652dAc9c46d9CBFcECBf
ACCOUNT_ASSOCIATION_HEADER=eyJmaWQiOjE0Mzg3MjMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhCZTNDMTZFMDkxMGVhRTI4ZDBhYzFDQzM1NDdiMDA3OUI4MjMwODljIn0=
ACCOUNT_ASSOCIATION_PAYLOAD=eyJkb21haW4iOiJodHRwczovL2ZpbmR5b3VybmljaGUuc2hvcCJ9
ACCOUNT_ASSOCIATION_SIGNATURE=0xc91978f02741bc2f6981ddf5ec15f7a4af929f89f0c99ce76b2d8a61cb0a804f4d711a1caa9f0e69b2a246e89cef930e6cd6ddf67ee467e119d662f3c862359f1b
OPENAI_API_KEY=your_openai_key_here
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
```

---

## Important Notes

⚠️ **Never commit `.env` files to GitHub** - they contain secrets!

✅ The `.env.example` file is safe to commit - it shows what variables are needed without exposing secrets

✅ After setting variables in Vercel, you must **redeploy** for changes to take effect

✅ Environment variables set in Vercel override the defaults in your code

---

## Troubleshooting

### Manifest still shows old domain?
- Make sure you set `NEXT_PUBLIC_URL` correctly
- Make sure you redeployed after adding variables
- Clear your browser cache

### Account association not working?
- You may need to regenerate the signature for the new domain
- Use Farcaster's account association tool
- Update all three variables (header, payload, signature)

---

That's it! Your app will now use `findyourniche.shop` everywhere. 🚀
