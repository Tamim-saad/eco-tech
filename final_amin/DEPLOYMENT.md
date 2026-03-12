# NodiWatch Deployment Guide

Complete instructions for deploying NodiWatch to various platforms.

## Table of Contents

1. [Netlify Deployment (Recommended)](#netlify-deployment)
2. [Vercel Deployment](#vercel-deployment)
3. [GitHub Pages](#github-pages)
4. [Manual Deployment](#manual-deployment)
5. [Troubleshooting](#troubleshooting)

---

## Netlify Deployment

### Method 1: Drag & Drop (Fastest - No Git Required)

**Perfect for disk space constraints!**

1. **Build Locally** (if you have space) or **Skip to Step 3** (use pre-built)
   ```bash
   npm install
   npm run build
   ```

2. **Locate Output Folder**
   - The build creates an `out/` directory
   - This contains all static files ready for deployment

3. **Deploy to Netlify**
   - Visit https://app.netlify.com/drop
   - **Drag the entire `out/` folder** onto the upload area
   - Netlify will deploy instantly (no account needed!)
   - You'll get a random URL like `https://random-name-123456.netlify.app`

4. **Custom Domain (Optional)**
   - Sign up for free Netlify account
   - Go to Site Settings → Domain Management
   - Add custom domain (e.g., `nodiwatch.netlify.app`)

**Estimated Time:** 2-5 minutes

---

### Method 2: Git Integration (Best for Updates)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect Netlify**
   - Visit https://app.netlify.com
   - Click "New site from Git"
   - Choose GitHub → Select repository → Authorize

3. **Configure Build**
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: 18 (auto-detected from netlify.toml)

4. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes for build
   - Site will auto-deploy on every `git push`

**Estimated Time:** 10 minutes (first deploy)

---

## Vercel Deployment

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? → No
# - Project name: nodiwatch
# - Directory: ./ (current)
# - Override settings? → No
```

### Method 2: Vercel Dashboard

1. Visit https://vercel.com/new
2. Import Git repository
3. Framework Preset: **Next.js** (auto-detected)
4. Click **Deploy**

**Note:** Vercel has native Next.js support, no `next.config.js` changes needed!

---

## GitHub Pages

### Requirements
- GitHub repository
- GitHub Actions enabled

### Setup

1. **Update `next.config.js`** (for GitHub Pages subdirectory)
   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
     basePath: '/repo-name', // Add your repo name
     assetPrefix: '/repo-name/', // Add your repo name
   }
   
   module.exports = nextConfig
   ```

2. **Create `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / root
   - Save

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add GitHub Actions deployment"
   git push
   ```

**Site will be live at:** `https://username.github.io/repo-name`

---

## Manual Deployment

For custom servers (AWS S3, DigitalOcean, etc.)

### 1. Build Static Site

```bash
npm install
npm run build
```

This creates an `out/` directory with all static files.

### 2. Upload to Server

**AWS S3 + CloudFront:**
```bash
aws s3 sync out/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

**DigitalOcean Spaces:**
```bash
s3cmd sync out/ s3://your-space-name --delete-removed
```

**FTP/SFTP:**
- Use FileZilla or similar
- Upload entire `out/` directory to web root

### 3. Configure Server

**Nginx:**
```nginx
server {
    listen 80;
    server_name nodiwatch.example.com;
    root /var/www/nodiwatch/out;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache data files
    location /data/ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L]

# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# Cache data files
<FilesMatch "\.(json|geojson)$">
    Header set Cache-Control "max-age=3600, public, must-revalidate"
</FilesMatch>
```

---

## Troubleshooting

### Issue: "npm install" fails (disk space)

**Solution:** Use drag-and-drop deployment (Method 1) or deploy from GitHub Codespaces

```bash
# GitHub Codespaces (free tier: 60 hours/month)
1. Open repo in GitHub
2. Click "Code" → "Codespaces" → "Create codespace"
3. Run: npm install && npm run build
4. Download `out/` folder
5. Drag to Netlify Drop
```

### Issue: Images not loading

**Solution:** Ensure images are in `public/` directory, not outside

```bash
# Correct structure
public/
  polluted_river.png
  encroachment_comparison.png
  erosion_comparison.png
  citizen_ground_truth.png
  dashboard_mockup.png
```

### Issue: Map not rendering

**Cause:** Leaflet requires client-side rendering

**Solution:** Already handled with `dynamic import` in components:
```tsx
const RiverMap = dynamic(() => import('@/components/RiverMap'), { ssr: false })
```

### Issue: 404 on page refresh (SPA routing)

**Netlify:** Handled automatically by static export

**Other platforms:** Add rewrite rules:
- **Vercel:** Automatic for Next.js
- **GitHub Pages:** Use `404.html` → copy of `index.html`
- **Custom:** See Nginx/Apache config above

### Issue: Build fails on Netlify

**Check:**
1. Node version (should be 18+)
2. `netlify.toml` present in root
3. Build command: `npm run build`
4. Publish directory: `out`

**Debug:**
```bash
# Test build locally
npm run build

# If successful, check Netlify deploy logs
# Usually indicates missing dependency or env variable
```

### Issue: CSS not loading correctly

**Solution:** Clear browser cache or hard refresh (Ctrl+Shift+R)

Tailwind CSS is bundled in build, should work across all platforms.

---

## Performance Optimization

### Image Optimization

Already configured in `next.config.js`:
```js
images: {
  unoptimized: true, // Static export compatible
}
```

For better performance on platforms supporting it:
```bash
# Install sharp for Next.js image optimization
npm install sharp

# Remove `unoptimized: true` from next.config.js
# Deploy to Vercel/Netlify with image processing
```

### Data Loading

- JSON files served from `/public/data/`
- Client-side fetch with error handling
- Consider implementing:
  - Service Worker for offline support
  - IndexedDB for data caching
  - Compression (gzip/brotli) on server

### Bundle Size

Current build size: ~2-3 MB (uncompressed)
- Next.js: ~500 KB
- Leaflet: ~150 KB
- Recharts: ~400 KB
- Tailwind CSS: ~50 KB (purged)

**Further optimization:**
```bash
# Analyze bundle
npm run build
# Check .next/static/ sizes

# Consider code splitting for large pages
# Already implemented via Next.js App Router
```

---

## Environment Variables

For API keys or sensitive data (if needed in future):

### Netlify
```bash
# netlify.toml
[build.environment]
  NEXT_PUBLIC_API_KEY = "your-key-here"

# Or in Netlify Dashboard:
# Site Settings → Build & Deploy → Environment
```

### Vercel
```bash
# Vercel Dashboard:
# Project Settings → Environment Variables
# Add: NEXT_PUBLIC_API_KEY = your-key-here
```

**Note:** Current version uses static data files, no API keys needed.

---

## Continuous Deployment

### Auto-deploy on Git Push

**Netlify/Vercel:** Already enabled with Git integration

**GitHub Pages:** Automatic via GitHub Actions (see workflow above)

### Preview Deployments

**Netlify:**
- Every PR gets preview URL
- Example: `deploy-preview-123--nodiwatch.netlify.app`

**Vercel:**
- Every branch gets preview URL
- Example: `nodiwatch-git-feature-branch.vercel.app`

---

## Custom Domain Setup

### Netlify

1. **Add Domain**
   - Site Settings → Domain Management → Add custom domain
   - Enter: `nodiwatch.gov.bd` (or your domain)

2. **Configure DNS** (at domain registrar)
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify load balancer)
   ```

3. **Enable HTTPS**
   - Automatic via Let's Encrypt
   - Takes 5-10 minutes

### Vercel

Similar process, DNS values:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.19
```

---

## Monitoring & Analytics

### Add Google Analytics

1. **Get Tracking ID** from analytics.google.com

2. **Add to `app/layout.tsx`**
   ```tsx
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');
     `}
   </Script>
   ```

### Netlify Analytics

- Built-in analytics (paid feature)
- Site Settings → Analytics → Enable

---

## Support

If you encounter issues not covered here:

1. **Check build logs** on your platform
2. **Test locally** with `npm run build && npx serve@latest out`
3. **Review Next.js docs**: https://nextjs.org/docs/app/building-your-application/deploying
4. **Platform-specific docs**:
   - Netlify: https://docs.netlify.com/
   - Vercel: https://vercel.com/docs
   - GitHub Pages: https://docs.github.com/en/pages

---

**NodiWatch Deployment Complete! 🚀**

Your river surveillance platform is now live and protecting Bangladesh's waterways.
