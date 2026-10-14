# PROJECT RAHAT by Aranica Labs

**Your Hospital Journey, Made Simple.** Updated existing Express + HTML/CSS/vanilla JavaScript prototype for IDE BOOTCAMP 2026.

## Start in VS Code (Hinglish)

1. ZIP extract karo; VS Code mein actual `PROJECT_RAHAT` folder kholo, jahan `package.json` hai.
2. Node.js 24.21.0 recommended; Node 22–24 supported. Terminal → New Terminal.
3. Commands ek-ek karke run karo:

```powershell
npm.cmd ci
Copy-Item .env.example .env
npm.cmd test
npm.cmd start
```

4. `http://localhost:4173` kholo. `.env` example port 4173 use karta hai. Without `.env`, server default is port 3000. Stop with Ctrl+C.
5. Fictional account register karo. Password: 12–128 characters with a letter and number. Real patient details use mat karo.

## Deploy

Complete VS Code → GitHub → Render instructions: [docs/RENDER_DEPLOY.md](docs/RENDER_DEPLOY.md).

Render **Web Service**, Build `npm ci && npm test`, Start `npm start`, Health `/api/health`. `render.yaml` is an optional Free demo Blueprint; `.node-version` pins the tested runtime. Server honours Render PORT and binds to 0.0.0.0. Production uses HTTPS-only cookies and Render's external URL as the allowed origin; set APP_ORIGIN for a custom domain.

**Storage decision:** Free Render resets local files on restarts/redeploys/sleep. Accounts and records can disappear. To retain records, use one paid service with a persistent disk mounted at `/var/data` and `DATA_DIR=/var/data/rahat`. Sessions end on server restart; sign in again. File storage is a fictional-data, single-process prototype, not a production patient database. See the deployment guide before publishing.

## Included features

- Patient registration, sign-in/out, dashboard and account-isolated records.
- Four sourced Bengaluru hospital entries, checked 13 October 2026; unavailable phone/coordinates explicitly marked. Sources in `data/hospitals.json` and visit details.
- Live outdoor camera/GPS navigation for Manipal Old Airport Road and Bangalore Baptist Hospital; absolute compass arrow where supported. Maps for road directions; no indoor navigation.
- Prescription upload and live camera capture, browser OCR, editable text and manual detail-review fields. No guessed prescription fields.
- Optional server-side OpenAI Responses explanation, explicit review/consent, identifier guard, timeout and error handling. Browser photos are not uploaded to the backend.
- Medicine arithmetic estimates, editable remaining units, saved history and removal. No automatic dose or refill decisions; snapshots do not auto-decrement.
- Wellness timeline, persistent checked visit checklist, record clearing, journey guidance, sign scanner, rule-based guide and optional browser voice input.
- Responsive blue interface, keyboard dialog handling, focus states and partial Hinglish homepage support. Optional AI can request Hindi; interface is not fully translated.

## Optional AI setup

Local `.env` is a private file created from `.env.example`. Put your own `OPENAI_API_KEY` there, then restart. On Render add it privately in environment settings. Do not put keys in frontend files, GitHub or screenshots. `.gitignore` excludes `.env`, runtime records and node_modules.

No key: safe demo mode, with other features available. A configured key does not prove connectivity; test a real fictional medicine-only request after deployment. Provider billing, account/model access and internet apply. API charges are separate from a ChatGPT subscription.

Only reviewed medicine text may be sent after consent. Remove all patient identifiers yourself; the server's pattern guard cannot detect every identifier. `store:false` is used for Responses; this is not a guarantee of zero provider retention. Original prescription remains authoritative. Documentation: [OpenAI text generation](https://developers.openai.com/api/docs/guides/text), [data controls](https://developers.openai.com/api/docs/guides/your-data).

## Security and honest limits

Passwords are salted scrypt hashes. Random sessions are server-side, expire after 8 hours, rotate on login/logout, and use HttpOnly/SameSite cookies (Secure in production). Mutations require a CSRF token and matching origin when supplied. Server validates patient fields; record access is tied to the authenticated account. Basic IP throttles protect auth/AI endpoints. Private inputs and upstream error details are not logged.

Records are JSON on the server and are not application-encrypted; do not use real medical data. No verified email ownership, password reset, MFA, external security audit, multi-server database or production privacy programme is implemented. Shared IP rate limits can affect a classroom demo. Prescription images/text and manual review details stay in the page and are cleared on logout; browser OCR can cache language assets. Legacy shared localStorage data is not imported or read.

OCR may misread handwriting, medicine names, strengths, doses and timings. AI may also be wrong. Do not start, stop or change medicines based on output. Discuss unclear instructions/refills with a clinician or pharmacist. Wellness is a self-reported log, not a recovery score. Hospital data is static: appointments, bed/doctor availability and room routes are not connected.

Camera/GPS/compass need permissions and generally HTTPS or localhost. Two hospital coordinates are approximate official-site campus points, not validated entrances. True/magnetic north, tilt and sensor interference can affect heading. No road-route or indoor accuracy claim is made.

## Guides and verification

- [Original implementation audit](docs/AUDIT.md)
- [Deployment guide](docs/RENDER_DEPLOY.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Phone testing and indoor roadmap](docs/MOBILE_TESTING.md)
- [Judges live-demo checklist](docs/JUDGES_DEMO.md)
- [Verification report](docs/VERIFICATION.md)
- Synthetic OCR sample: `demo-assets/sample-prescription.png`

Automated backend and simulated navigation checks run with `npm test`. Browser checks include registration, supply arithmetic, wellness history, AI demo fallback and actual OCR on a synthetic printed image. Physical camera/GPS/compass and a credentialed live AI request still require testing on your device/account. Deployment is prepared but not performed. No package can guarantee zero external hosting or device failures.

## Files

`server.js` starts Express; `backend.js` handles API/auth/storage; `lib/medicine.js` validates arithmetic; `data/hospitals.json` contains directory sources. `public/index.html`, `style.css` and `enhancements.css` retain and improve the existing interface. `app.js` holds journey/sign/checklist behaviour; `patient.js` handles accounts/tools; `navigation.js` and `geo.js` handle live sensors and geography. `tests/` contains automated checks. Runtime data is generated only after running and is excluded from Git/ZIP.
