# Domain Setup Guide: findyourniche.shop

## Complete Step-by-Step Guide to Connect Your Domain

---

## PART 1: Connect Domain in Vercel

### Step 1: Login to Vercel
1. Go to https://vercel.com
2. Login to your account
3. Find your project: **niche-app**

### Step 2: Add Custom Domain
1. Click on your **niche-app** project
2. Go to **Settings** tab
3. Click on **Domains** in the left sidebar
4. Click **Add** or **Add Domain**
5. Enter: `findyourniche.shop`
6. Click **Add**

### Step 3: Get DNS Records from Vercel
After adding the domain, Vercel will show you DNS records. You'll see something like:

**For Root Domain (findyourniche.shop):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For www subdomain (www.findyourniche.shop):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

**IMPORTANT:** Keep this Vercel page open! You'll need these values for GoDaddy.

---

## PART 2: Configure DNS in GoDaddy

### Step 1: Login to GoDaddy
1. Go to https://www.godaddy.com
2. Login to your account
3. Click on your **Profile Icon** (top right)
4. Select **My Products**

### Step 2: Access DNS Management
1. Find **findyourniche.shop** in your domain list
2. Click the **DNS** button next to it
3. You'll see the DNS Management page

### Step 3: Configure DNS Records

#### Option A: Using A Record (Recommended for Vercel)

1. **Delete existing A records** (if any):
   - Click the pencil/edit icon next to any existing A record
   - Click **Delete** or the trash icon
   - Confirm deletion

2. **Add new A record**:
   - Click **Add** button
   - Select type: **A**
   - Name: `@` (this means root domain)
   - Value: `76.76.21.21` (or the IP Vercel showed you)
   - TTL: `600 seconds` (or leave default)
   - Click **Save**

3. **Add CNAME for www**:
   - Click **Add** again
   - Select type: **CNAME**
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `1 Hour`
   - Click **Save**

#### Option B: Using Nameservers (Alternative, more advanced)

If Vercel gives you nameservers instead:
1. Click **Nameservers** section in GoDaddy
2. Click **Change**
3. Select **Custom nameservers**
4. Enter the nameservers Vercel provided
5. Click **Save**

### Step 4: Wait for DNS Propagation
- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually works within **10-30 minutes**
- You can check status at: https://www.whatsmydns.net

---

## PART 3: Verify Domain in Vercel

### Step 1: Check Domain Status
1. Go back to Vercel
2. Go to your project → **Settings** → **Domains**
3. You should see `findyourniche.shop` listed
4. Status should change from "Invalid Configuration" to "Valid Configuration"
5. Wait for the status to show a **green checkmark** ✓

### Step 2: Set as Primary Domain (Optional)
1. In the Domains list, find `findyourniche.shop`
2. Click the **three dots** menu
3. Select **Set as Primary Domain**
4. This makes it the default domain for your app

---

## PART 4: Update Environment Variables (If Needed)

If your app uses environment variables for the domain:

1. In Vercel, go to **Settings** → **Environment Variables**
2. Look for variables like:
   - `NEXT_PUBLIC_URL`
   - `NEXT_PUBLIC_BASE_URL`
   - Or similar
3. Update them to: `https://findyourniche.shop`
4. Click **Save**
5. **Redeploy** your app:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Click **Redeploy**

---

## PART 5: Test Your Domain

### After DNS Propagates (10-30 minutes):

1. **Visit your domain**: https://findyourniche.shop
2. **Check HTTPS**: Make sure the padlock icon shows (Vercel auto-configures SSL)
3. **Test Farcaster manifest**: https://findyourniche.shop/.well-known/farcaster.json
4. **Test metadata**: https://findyourniche.shop/niche-metadata.json

All should work! 🎉

---

## TROUBLESHOOTING

### Domain not working after 30 minutes?

**Check DNS Records in GoDaddy:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel's IP)
TTL: 600 or default
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 Hour or default
```

### Still showing Vercel default domain?

1. Make sure you set `findyourniche.shop` as **Primary Domain** in Vercel
2. Clear your browser cache
3. Try incognito/private mode
4. Try a different browser

### SSL/HTTPS not working?

- Vercel automatically provisions SSL certificates
- Can take 5-10 minutes after domain verification
- If still not working after 1 hour, contact Vercel support

### "Invalid Configuration" in Vercel?

1. Double-check DNS records in GoDaddy
2. Make sure you used `@` for the A record (not blank)
3. Make sure CNAME points to `cname.vercel-dns.com`
4. Wait 10-30 minutes for DNS to propagate

---

## QUICK REFERENCE

### GoDaddy DNS Settings
```
Record 1:
Type: A
Name: @
Value: 76.76.21.21

Record 2:
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Vercel Domain Settings
```
Domain: findyourniche.shop
Primary: Yes (recommended)
Redirect www to root: Yes (recommended)
```

---

## BONUS: Redirect www to non-www (or vice versa)

In Vercel Domains settings:
1. You'll see both `findyourniche.shop` and `www.findyourniche.shop`
2. Click on the one you DON'T want as primary
3. Select "Redirect to findyourniche.shop" (or www version)
4. This ensures visitors always see your preferred domain

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
- **GoDaddy DNS Help**: https://www.godaddy.com/help/manage-dns-records-680
- **Check DNS Propagation**: https://www.whatsmydns.net

---

## Summary

✅ Code updated to use `findyourniche.shop`
✅ Farcaster manifest updated
✅ Metadata files updated
⏳ Waiting for you to configure Vercel + GoDaddy DNS

Once DNS is configured, your app will be live at: **https://findyourniche.shop** 🚀
