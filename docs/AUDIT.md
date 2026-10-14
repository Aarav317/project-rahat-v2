# Original project audit — 13 October 2026

Inspected all seven files in the supplied PROJECT_RAHATf.zip before editing. Status here describes the original code, based on tracing it; it is not a claim of physical-device testing.

| Feature | Original state | Action |
| --- | --- | --- |
| Express + vanilla HTML/CSS/JS | Implemented; no build step | Retain stack and existing filenames |
| Hospital journey / registration guidance | Implemented general guidance | Preserve, keep hospital confirmation visible |
| Hospital search and details | Functional code using two fictional hospitals | Replace with sourced Bengaluru directory |
| Sign camera, capture, upload, OCR | Implemented; browser/CDN/device dependent | Preserve; add busy state, cleanup, failure handling |
| Prescription upload + OCR | Implemented; no busy progress or separate live camera | Add live capture, progress and review flow |
| Optional AI | Backend endpoint exists; credentials required; unavailable when unconfigured | Add authentication, consent, Responses API, timeout, safe errors |
| Medicine tracker | Arithmetic implemented; truncates days; saves to shared localStorage; saved list not rendered | Exact decimal estimate, server validation, per-account list |
| Wellness | Form and four-entry display; shared localStorage | Account-isolated history and deletion |
| Checklist | Hospital label stored locally; ticks are not persisted | Account-specific saved ticks |
| Patient authentication / dashboard | Not implemented | Add registration, sign-in/out, server sessions and dashboard |
| Outdoor camera/GPS/orientation navigation | Not implemented | Implement real browser sensor workflow and Maps fallback |
| Indoor positioning | Not implemented | Explicit future roadmap only |
| Hindi / voice | Selected Hinglish text and optional browser speech implemented | Preserve partial support; label it accurately |
| UI | Blue variables but many leftover green styles; small labels | Preserve layout and illustration, improve blue palette, legibility and focus |
| Setup / secrets | README exists; no .env.example or .gitignore | Add setup, troubleshooting, demo and mobile guides |

## Implementation plan

Retain the homepage illustration, journey, rule-based guide, sign scanner, forms and Express architecture. Add modules where needed, update broken/shared storage paths, and keep all credentials on the server. Use a single-process JSON store appropriate only to fake-data demos; production requires a transactional database and a further security/privacy review. Validate account isolation and sensor lifecycle with automated tests, then record physical phone and live API checks separately.
