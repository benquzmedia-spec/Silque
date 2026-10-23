# Silque Tours and Travel — Website

**Live:** https://silquetours.co.ke  
**Storage:** Google Drive folder `1p4diwcZYfPMblG1smUOFQrY9Q0qCzguB`  
**Admin:** Click "Silque" in footer → password `1Ningulu20Muno@%`

## 🚀 Deploy to GitHub Pages

1. Create repo → push all files → **Settings → Pages → Branch: main / root**
2. Add **Custom domain** → `silquetours.co.ke`
3. Wait for DNS + HTTPS (Let's Encrypt auto-enabled)
4. GitHub Pages serves over **HTTPS only**

## 🖥️ Deploy to Apache hosting

1. Upload all files to `public_html/` preserving structure
2. Enable **AutoSSL** (cPanel → SSL/TLS Status)
3. Upload `.htaccess` — forces HTTPS, HSTS, secure cookies
4. Test at `https://yourdomain.com` (no HTTP allowed)

## 🔒 Security (all enforced via .htaccess + CSP)

| Layer | Enforcement |
|-------|-------------|
| **HTTPS redirect** | Apache RewriteEngine + HSTS preload |
| **Secure cookies** | `Secure; HttpOnly; SameSite=Strict` |
| **Content Security Policy** | Drive + Unsplash + self only |
| **Frame embedding blocked** | `X-Frame-Options: SAMEORIGIN` |
| **MIME sniffing blocked** | `X-Content-Type-Options: nosniff` |
| **Referrer trimmed** | `strict-origin-when-cross-origin` |
| **Permissions blocked** | geolocation, mic, camera, payment |

## 📁 File structure
