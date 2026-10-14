# Troubleshooting

| Problem | What to do |
| --- | --- |
| `ENOENT package.json` | VS Code mein actual `PROJECT_RAHAT` folder kholo. `package.json` terminal ke current folder mein hona chahiye. |
| PowerShell blocks npm | `npm.cmd ci`, `npm.cmd test`, `npm.cmd start` use karo. |
| Port already used / permission denied | `.env` mein `PORT=4173` ya another available port set karo; restart. `APP_ORIGIN` blank rakho locally. |
| Website opened by double-clicking HTML; APIs fail | `npm.cmd start` run karke HTTP URL kholo. Backend must run. |
| Render says no open port | Web Service choose karo; `HOST=0.0.0.0`, Start Command `npm start`. Do not override Render's PORT. |
| Render build cannot find package.json | Repository root check karo. If files are inside a nested folder, set that exact Root Directory in Render. |
| Render production origin error | Let `RENDER_EXTERNAL_URL` supply the origin, or set an exact HTTPS `APP_ORIGIN`, without path/query. Remove a localhost value on Render. |
| Security token / session expired | Reload, sign in again. Server restarts invalidate in-memory sessions. The app refreshes its token after a rejected request; resubmit only after checking the form. |
| Login says incorrect after Free service restart | Free storage can reset accounts. Create a fresh fictional account; use paid persistent disk for retained accounts. |
| Saved records vanish after deployment | Check `DATA_DIR=/var/data/rahat` and an actual disk mounted at `/var/data`. Setting an environment variable alone does not create a disk. |
| Server says unable to save | Check disk is writable and not full. Restore a valid private backup if JSON store is corrupt. Do not publish runtime files. |
| Free Render page starts slowly | Wait for startup, then retry. Open and test the site before judging. |
| Camera button fails | HTTPS or localhost required. Allow camera in browser site settings; close another app using it. Upload a JPG/PNG/WebP under 10 MB instead. |
| Photo format unsupported | Convert HEIC to JPG/PNG or use the live camera capture. Scanner validates JPG, PNG and WebP only. |
| OCR does not load or recognise text | Internet must reach jsDelivr and tessdata.projectnaptha.com. Retry with a sharply focused printed image. Type manually if unavailable; do not guess prescription handwriting. |
| GPS denied/unavailable | Enable site location permission; move outdoors safely; retry. Use Maps if location still fails. |
| No arrow / desktop compass | No absolute heading is available. Distance/bearing may still work. Maps supplies road directions. Try supported phone in portrait. |
| iPhone compass denied | Tap Enable compass while navigation is active. Permission needs a user gesture; device/browser support varies. |
| Camera navigation disabled for a hospital | Verified coordinates are unavailable for that record. Use address-based Maps and confirm the entrance. |
| AI not configured | Website is in safe demo mode. Optional key goes in local `.env` or Render's environment settings. Restart/redeploy after setting it. |
| AI credentials rejected | Check private API key and provider access. Never paste the key into the website or browser console. |
| AI quota/rate limit | Check API billing/quota, wait and retry. API charges are separate from ChatGPT subscription. |
| AI incomplete/network/timeout | Retry later or confirm the prescription with a doctor/pharmacist. No fabricated fallback explanation is generated. |
| Too many attempts | Rate limits use a 15-minute window. Shared-network students may share a limit. Wait before testing again. |
| No password recovery email | Email syntax is validated; ownership verification and password reset are not implemented. Use only demo accounts with remembered unique demo passwords. |
| Hindi is partial | Homepage support is selected Hinglish text; optional AI can request Hindi. Full interface translation is future scope. |

When reporting an issue, give the screen, non-sensitive error message, browser/device and whether local or Render. Do not share `.env`, passwords, prescription identifiers or runtime database contents.
