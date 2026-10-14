# PROJECT RAHAT — FINAL INTEGRATED BUILD

**Your Hospital Journey, Made Simple.**  
A hackathon/demo prototype by Aranica Labs.

## Run locally (Windows / VS Code)

1. Extract the ZIP.
2. Open the `PROJECT_RAHAT_FINAL` folder in VS Code (the folder containing `package.json`).
3. Open **Terminal → New Terminal** and run:

```powershell
npm.cmd ci
Copy-Item .env.example .env
npm.cmd test
npm.cmd start
```

4. Open **http://localhost:4173**.
5. Register and sign in using fictional demo details only.

If PowerShell says `.env` already exists, do not overwrite it; keep your existing private settings and start the server.

## Demo dashboard roles

The `.env.example` includes demo addresses:
- `doctor-demo@example.com` → Doctor
- `staff-demo@example.com` → Hospital Staff
- Other addresses → Patient

After copying `.env.example` to `.env`, you can use these addresses when registering the corresponding demo accounts. Set a password meeting the registration rules (at least 12 characters, with a letter and a number). These are demo role allowlists, not real identity verification. Never use real patient data.

If you already created `.env`, ensure `DOCTOR_EMAILS` and `STAFF_EMAILS` are set to the demo email addresses you intend to use. Restart the server after changing `.env`. Sign in on the homepage before opening the matching dashboard. Dashboard pages redirect to the homepage if you are signed out and reject accounts with the wrong role.

## Included features

- Refreshed original homepage, dashboard cards, and visible camera-navigation entry point.
- Patient registration/sign-in, sign-out, and account-specific records.
- Hospital directory/search and sourced static listings.
- Camera/GPS/compass-based approximate outdoor direction and distance where browser/device support allows it.
- Prescription upload/camera capture and browser OCR; reviewed text can optionally be explained by server-side AI.
- Medicine estimate tools, wellness history, and patient visit checklist.
- Patient dashboard, doctor queue view, and hospital staff demo queue.
- Hindi/English assistance elements, sign scanner, and journey guidance.
- Express backend, role-protected demo APIs, tests, deployment notes, and synthetic prescription sample.

## Safety and honest limitations

This is a prototype, not a hospital system. Hospital data is static; queues are fictional and local to this demo. It does not connect to live appointments, beds, clinicians, medical records, or indoor routing. GPS/compass readings are approximate; use Maps for road directions. Prescription OCR/AI may be wrong; confirm medicine instructions with a doctor or pharmacist. Use fictional data only.

Local file storage is not a production database and may not be suitable for multiple server instances. Free hosting may reset local data. The OpenAI API key is optional; if used, keep it only in the private `.env` or private hosting environment settings, never in frontend code or GitHub.

## Deploy

See `docs/RENDER_DEPLOY.md` for GitHub/Render setup, and `docs/TROUBLESHOOTING.md` for common issues. Review `docs/AUDIT.md`, `docs/MOBILE_TESTING.md`, and `docs/JUDGES_DEMO.md` before presenting.

## Test

Run:

```powershell
npm.cmd test
```

The included automated tests cover basic medicine validation and hospital data. Passing these tests does not mean every physical camera/compass device or live AI request has been tested.


## Judge demo accounts (local only)

With `DEMO_SEED=1` in `.env`, the local prototype seeds these fictional accounts and sample queue entries. They are disabled in production and must never be used for real patient information.

| Role | Email | Password |
|---|---|---|
| Patient | `patient-demo@example.com` | `RAHATpatient2026!` |
| Doctor | `doctor-demo@example.com` | `RAHATdoctor2026!` |
| Hospital staff | `staff-demo@example.com` | `RAHATstaff2026!` |

If the app already created `runtime/patients.json` before enabling the demo seed, stop the server and rename that file to `patients.backup.json` (do not delete it), then restart. The local seed creates fictional patient wellness history and a three-item queue. The queue is a demo, not a live hospital system.

## Patient token and doctor consultation demo

For local judge demonstrations, `.env.example` sets `DEMO_SEED=1` and configures the doctor/staff demo email roles. Use fictional accounts only:

- Patient: `patient-demo@example.com` / `RAHATpatient2026!`
- Doctor: `doctor-demo@example.com` / `RAHATdoctor2026!`
- Hospital Staff: `staff-demo@example.com` / `RAHATstaff2026!`

The patient dashboard can register a fictional department token (Cardiology, Physiotherapy, General Medicine, Orthopaedics, Paediatrics or Dermatology), show people ahead and an estimated wait (15 minutes per person), and display notes/medicine instructions saved by the doctor against that same token. The doctor can save a consultation note and one demonstration medicine row including dose, timing and duration. Hospital staff can update queue status. Queue data is local prototype data and is not connected to real hospital registration, doctor availability, or pharmacy systems. Wait times are estimates only. Do not enter real patient data or treat demo medicine instructions as medical advice.
