# IDE BOOTCAMP 2026 — live demo checklist

Before presenting:

- Use only fictional account, prescription and wellness data. `demo-assets/sample-prescription.png` is safe synthetic text.
- Run `npm test`. Check live `/api/health` and patient sign-in.
- Open the site shortly before the demo. Free Render instances can sleep; saved records can reset without a persistent disk.
- Test your actual phone, permissions and internet. Keep upload/manual entry ready if camera or OCR is unavailable.
- Optional AI: configure a private server key, verify API billing/access and make a real medicine-only request beforehand. A configured key is not proof of a working API connection.
- Do not redeploy during judging. Accounts persist across redeploy only with correctly configured persistent storage; sessions require sign-in again.

Suggested 4-minute demonstration:

1. **Problem:** first-time visitors can find hospital processes, visit preparation and prescription organisation confusing.
2. **Find:** search a sourced Bengaluru hospital; show official address/contact/source dates and the lack of live availability.
3. **Prepare:** sign in, save a checklist and check two items. Explain that requirements need hospital confirmation.
4. **Navigate:** show actual live camera/GPS on a tested phone. If compass is unavailable, show bearing and Maps honestly. This is approximate outdoor guidance.
5. **After a visit:** scan synthetic printed text, compare with the image and correct it. Missing dose/strength stays unclear. Optional AI explains only approved text if connected.
6. **Organise:** enter remaining 12, dose units 1, frequency 2. Show mathematical estimate of 6 days and save a wellness check-in without a recovery score.

Closing explanation: RAHAT combines sourced discovery, visit guidance and patient organisation in a single prototype. It is not a diagnosis/treatment system and has not demonstrated improved patient outcomes. Future work includes verified hospital integration, transactional storage and stronger privacy, usability/language testing, and hospital-approved indoor positioning/maps.
