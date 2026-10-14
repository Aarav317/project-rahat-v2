# Mobile sensor testing

This is browser camera/GPS/orientation guidance. It does not implement a WebXR world anchor, depth detection, road routing or indoor positioning.

1. Deploy on Render and open the **HTTPS** URL in a supported mobile browser. Chrome on Android and Safari on iOS are useful test targets, but actual sensor availability varies. Avoid an embedded social-media browser.
2. If testing on a phone through a laptop's LAN IP, ordinary `http://192.168...` usually fails secure-context requirements. Laptop localhost is not phone localhost. Use the hosted HTTPS URL or a properly trusted HTTPS development setup.
3. Search for Manipal Old Airport Road or Bangalore Baptist Hospital. These two records have sourced campus coordinates. NIMHANS/Bowring provide Maps fallback because precise destinations were not verified sufficiently.
4. Choose Start Navigation on the card, then Start Navigation in its dialog. Allow location and rear-camera access. On supported iOS, permit orientation if prompted from the tap; the Enable compass button can retry while navigation is active.
5. Outdoors, stationary and safe, verify the camera is live. Check straight-line distance, geographic bearing and reported GPS accuracy. A current heading plus camera/location is required before showing the camera-relative arrow. Hold upright in portrait; relative-only sensors do not produce a compass arrow.
6. Rotate the phone safely. Compare broad direction with a trusted map; record any mismatch. Magnetic north vs true north, tilt, buildings and interference can affect the sensor. Do not claim a calibrated compass or centimetre GPS accuracy.
7. Tap Stop, close the dialog, switch browser tabs, and lock the phone in separate trials. Camera access should stop; returning should require starting navigation again. Test stopping while permission is still pending: late camera access must not reactivate the session.
8. Deny camera: GPS distance/bearing can remain available with a clear camera-unavailable message. Deny location: navigation stops and offers Maps. Deny compass: no camera-relative arrow is shown.
9. Use Road directions in Maps and confirm the entrance yourself. The arrow points straight toward a campus coordinate, so it cannot identify crossings, turns, buildings, corridors or rooms. No route has been field-validated by this project.
10. Sign in with a fake account; Open rear camera in prescription tools → Open camera → Capture photo. Compare OCR text to the original. Also test upload and manual text entry.

Record device model, browser/version, permissions, measured behaviour and date in a separate test note. Automated sensor mocks do not substitute for these physical checks.

Indoor roadmap: obtain hospital-approved maps and accurate room/department positions; choose and validate indoor positioning (for example beacons or visual positioning); survey routes and accessibility; obtain hospital permissions; test with participants before making indoor-navigation claims.
