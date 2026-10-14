# VS Code → GitHub → Render (Hinglish guide)

Ye Node.js + Express full-stack project hai. Render par **Web Service** choose karna hai. Source files `public/` ke andar hain, lekin repository ka root wahi folder hoga jahan `package.json`, `server.js` aur `render.yaml` hain.

## Stage 1 — ZIP extract karke local run

1. ZIP ko extract karo. VS Code → File → Open Folder → extracted `PROJECT_RAHAT` folder select karo.
2. Node.js install hona chahiye. Project tested with Node **24.21.0**; Node 22–24 supported. Terminal → New Terminal kholo.
3. Check karo ki terminal ke current folder mein `package.json` hai. Phir commands ek-ek karke run karo:

```powershell
npm.cmd ci
Copy-Item .env.example .env
npm.cmd test
npm.cmd start
```

4. Browser mein `http://localhost:4173` kholo. `.env.example` ka port 4173 hai; agar `.env` copy nahi ki, default port 3000 hoga.
5. Fictional account banao. Medicine fields: total 30, units/dose 1, doses/day 2, units left 12. Result approximately 6 days aana chahiye.
6. Local server band karne ke liye terminal mein Ctrl+C.

`npm.ps1 cannot be loaded` aaye to `npm.cmd` use karo, PowerShell execution policy change ki zaroorat nahi hai.

## Stage 2 — GitHub par source upload

1. Git install karo agar VS Code Source Control Git unavailable bolta hai.
2. VS Code ke left sidebar mein Source Control → Initialize Repository.
3. `.gitignore` already included hai. Source Control list mein `.env`, `runtime/` aur `node_modules/` **nahi** aane chahiye. Agar dikhte hain to push rok kar ignore configuration check karo.
4. Commit message likho: `Prepare PROJECT RAHAT demo` → Commit.
5. Publish Branch / Publish to GitHub choose karo. GitHub login complete karo. Private repository bhi Render se connect ho sakti hai.
6. GitHub repository khol kar confirm karo ki **root par** `package.json`, `server.js`, `.node-version`, `render.yaml`, `public/`, `data/`, `tests/` hain. Sirf ZIP upload mat karo.

Command-line alternative, jab root folder mein ho:

```powershell
git init
git add .
git commit -m "Prepare PROJECT RAHAT demo"
git branch -M main
```

Uske baad GitHub ka exact new-repository remote command use karo. Apna URL hi paste karo; kisi example URL ko unchanged mat use karo. API keys kabhi repository mein commit mat karo. Agar key accidentally commit ho gayi ho, provider dashboard mein revoke/rotate karo; sirf file delete karna enough nahi hai.

## Stage 3 — Render Web Service

Render Dashboard → New → **Web Service** → GitHub connect → apni repository select karo.

| Setting | Value |
| --- | --- |
| Language / Runtime | Node |
| Branch | `main` (ya tumhari actual branch) |
| Root Directory | Blank, when `package.json` is at repository root |
| Build Command | `npm ci && npm test` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |
| Instance count | One; this prototype uses one process and a file store |

Environment variables add karo:

| Key | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `HOST` | `0.0.0.0` |
| `TRUST_PROXY` | `1` (Render reverse proxy) |
| `OPENAI_MODEL` | `gpt-4o-mini` |
| `OPENAI_API_KEY` | Optional private API key; blank / absent disables AI |

Render `PORT` aur `RENDER_EXTERNAL_URL` khud deta hai. Unhe manually set karne ki zaroorat nahi. App Render URL ko allowed origin banata hai aur HTTPS-only session cookies use karta hai. Custom domain use karoge to `APP_ORIGIN=https://your-exact-domain` set karo, bina path ke. Local `.env` ko Render par upload mat karo.

Create Web Service click karo; build mein tests pass hone ke baad service start hogi. Render ka generated HTTPS URL open karo. `/api/health` should show `ok: true`; this checks server readiness, not the external AI connection.

Optional: repository root ka `render.yaml` **Free demo** Blueprint hai. New → Blueprint → repository choose karke usse bhi create kar sakte ho. Manual Web Service flow beginner ke liye simpler hai. Blueprint does not purchase a paid disk.

## Stage 4 — Saved accounts/records ko restart ke baad preserve karna

Is version mein patient records `patients.json` mein store hote hain. **Free Render service ka filesystem ephemeral hai:** sleep, restart ya redeploy ke baad accounts aur records reset ho sakte hain. Free plan par persistent disks available nahi hain. Ye disposable fake-data demonstration option hai; UI bhi reset possibility batata hai. [Render Free documentation](https://render.com/docs/free)

Records bachane ke liye:

1. Pricing dekh kar paid Web Service plan select karo.
2. Service → Disks → Add Disk. Mount path `/var/data`; size 1 GB prototype ke liye kaafi hai.
3. Environment variable `DATA_DIR=/var/data/rahat` add karo.
4. Redeploy karo. Sirf mount ke andar likhi files preserve hongi. Existing ephemeral records automatically migrate nahi honge; fresh demo accounts banao. [Render persistent disks](https://render.com/docs/disks)

Sessions memory mein hain: restart/redeploy ke baad **dobara sign in** karna normal hai. Disk ke saath account aur saved records rehne chahiye. One instance rakho; file storage multiple servers ke liye suitable nahi hai. Production patient platform ke liye transactional database, email verification/reset, stronger abuse controls, privacy review and managed session storage chahiye.

Free service idle hone par spin down hoti hai; next request par startup delay aa sakta hai. Demo se pehle website open karo aur login test karo. Disk plan mein deploy downtime ho sakta hai; live presentation ke beech redeploy mat karo. [Render deployment behaviour](https://render.com/docs/deploys)

## Stage 5 — Live URL acceptance checks

- Home page and four hospital listings load.
- Fictional account register → sign out → sign in works.
- Save 6-day medicine estimate, wellness entry and checked checklist; refresh and verify.
- Restart/redeploy: sign in again; with a paid disk, verify saved records remain.
- Android/iPhone: open HTTPS URL, allow camera/GPS when requested, test Stop and closing navigation. This needs physical testing.
- Upload `demo-assets/sample-prescription.png`; review OCR result against the image. Missing/unclear details must stay unguessed.
- Without AI key: safe demo message appears. With your configured key: use fictional medicine-only text and verify an actual explanation. Account access, billing, model availability and internet affect this.
- Deny a permission once and verify fallback instructions and Maps link. Never use the overlay as a road route or indoor route.

If a step fails, use `TROUBLESHOOTING.md`. No ZIP can guarantee zero hosting/device/service failures. This package includes automated checks and graceful fallbacks; your live URL still needs these acceptance checks.

Official host/port guidance: [Render Web Services](https://render.com/docs/web-services). Runtime pinning: [Render Node version guide](https://render.com/docs/node-version). Checked 13 October 2026.
