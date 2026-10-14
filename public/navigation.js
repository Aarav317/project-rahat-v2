let navHospital = null;
let navStream = null;
let navWatch = null;
let navHeading = null;
let navPosition = null;
let navEpoch = 0;
let navActive = false;
let orientationListening = false;
let headingAt = 0;
let navTimer = null;

function openNavigation(id) {
    const hospital = hospitals.find(item => item.id === id);

    if (!hospital) return;

    navHospital = hospital;

    openModal("navigationModal");

    $("#navigationDestination").textContent = hospital.name;
    $("#navMaps").href = mapUrl(hospital);

    $("#navStart").disabled = !hospital.coordinates;
    $("#navStop").disabled = true;

    $("#navStatus").textContent = hospital.coordinates
        ? "Tap Start Navigation to request location and camera permission."
        : hospital.coordinateNote;

    $("#navDistance").textContent = "Waiting for location";
    $("#navBearing").textContent = "Geographic bearing unavailable";
    $("#navAccuracy").textContent = "";

    $("#navCameraState").textContent =
        "Live camera starts after permission.";

    $("#navCameraState").hidden = false;

    $("#navCompass").textContent =
        "Start navigation to request compass permission.";

    $("#navCompassRetry").hidden = !hospital.coordinates;
    $("#navArrow").hidden = true;
}

function renderNavigation() {
    if (
        !navActive ||
        !navPosition ||
        !navHospital?.coordinates
    ) {
        return;
    }

    const result = RahatGeo.distanceBearing(
        navPosition,
        navHospital.coordinates
    );

    const distance = result.distance;
    const bearing = result.bearing;

    $("#navDistance").textContent =
        distance >= 1000
            ? (distance / 1000).toFixed(2) + " km straight-line"
            : Math.round(distance) + " m straight-line";

    $("#navBearing").textContent =
        "Geographic bearing: " +
        Math.round(bearing) +
        "° from true north";

    const locationAge = Date.now() - navPosition.time;
    const locationStale = locationAge > 20000;

    $("#navAccuracy").textContent =
        (
            locationStale
                ? "Location stale — waiting for a fresh GPS fix. "
                : "GPS accuracy reported: ±" +
                  Math.round(navPosition.accuracy) +
                  " m. "
        ) +
        (
            distance < Math.max(50, navPosition.accuracy)
                ? "Near the approximate destination; confirm the entrance."
                : ""
        );

    const headingFresh =
        navHeading !== null &&
        Date.now() - headingAt < 5000;

    /*
     * Real MediaStream objects expose getVideoTracks().
     * Some automated tests use mock streams without that method.
     */
    const cameraReady =
        !!navStream &&
        (
            typeof navStream.getVideoTracks !== "function" ||
            navStream.getVideoTracks().some(
                track => track.readyState === "live"
            )
        );

    const showArrow =
        headingFresh &&
        !locationStale &&
        cameraReady;

    $("#navArrow").hidden = !showArrow;

    if (showArrow) {
        const relativeAngle = RahatGeo.relativeAngle(
            bearing,
            navHeading
        );

        $("#navArrow").style.transform =
            "rotate(" + relativeAngle + "deg)";

        $("#navCompass").textContent =
            "Compass heading received. Hold the phone upright in portrait. " +
            "Magnetic interference can affect accuracy.";

    } else if (!headingFresh) {
        $("#navCompass").textContent =
            "No current absolute compass heading. Arrow hidden. " +
            "Use the geographic bearing above or Maps road directions.";

    } else if (locationStale) {
        $("#navCompass").textContent =
            "Location is stale. Waiting for a fresh GPS position.";

    } else if (!cameraReady) {
        $("#navCompass").textContent =
            "Camera denied or unavailable. Use the geographic bearing above " +
            "or Maps road directions.";
    }
}

function orientationHandler(event) {
    if (!navActive) return;

    let heading = null;

    // iOS Safari may provide a direct compass heading.
    if (
        typeof event.webkitCompassHeading === "number" &&
        Number.isFinite(event.webkitCompassHeading) &&
        (
            event.webkitCompassAccuracy == null ||
            (
                event.webkitCompassAccuracy >= 0 &&
                event.webkitCompassAccuracy <= 45
            )
        )
    ) {
        heading = event.webkitCompassHeading;
    }

    // Other browsers may provide absolute orientation using alpha.
    else if (
        event.absolute === true &&
        typeof event.alpha === "number" &&
        Number.isFinite(event.alpha)
    ) {
        heading = 360 - event.alpha;
    }

    // Do not invent a heading when the sensor provides no valid value.
    if (heading === null) return;

    const screenAngle =
        screen.orientation?.angle ??
        window.orientation ??
        0;

    if (screenAngle !== 0) {
        navHeading = null;
        $("#navArrow").hidden = true;

        $("#navCompass").textContent =
            "Rotate the phone to portrait orientation for compass guidance.";

        return;
    }

    navHeading = RahatGeo.normal(heading);
    headingAt = Date.now();

    renderNavigation();
}

async function enableCompass() {
    if (!navActive) return;

    const epoch = navEpoch;

    try {
        if (!window.isSecureContext) {
            throw new Error(
                "Compass requires HTTPS or localhost."
            );
        }

        if (typeof DeviceOrientationEvent === "undefined") {
            throw new Error(
                "This browser does not support device orientation."
            );
        }

        // Some browsers require an explicit permission request.
        if (
            typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            let permission;

            try {
                permission =
                    await DeviceOrientationEvent.requestPermission(true);
            } catch (error) {
                console.error(
                    "Compass permission request failed:",
                    error
                );

                throw new Error(
                    "Compass permission request failed. Try again."
                );
            }

            if (permission !== "granted") {
                throw new Error("Compass permission denied.");
            }
        }

        if (epoch !== navEpoch || !navActive) return;

        if (!orientationListening) {
            window.addEventListener(
                "deviceorientation",
                orientationHandler
            );

            window.addEventListener(
                "deviceorientationabsolute",
                orientationHandler
            );

            orientationListening = true;
        }

        $("#navCompass").textContent =
            "Permission accepted. Waiting for compass sensor readings...";

        console.log("Compass listeners registered.");

    } catch (error) {
        console.error("Compass setup error:", error);

        if (epoch === navEpoch) {
            $("#navCompass").textContent =
                error.message;
        }
    }
}

async function startNavigation() {
    if (!navHospital?.coordinates) return;

    stopNavigation(false);

    navActive = true;

    const epoch = navEpoch;

    $("#navStart").disabled = true;
    $("#navStop").disabled = false;

    $("#navStatus").textContent =
        "Requesting location and camera permission...";

    $("#navCameraState").textContent =
        "Requesting live camera...";

    $("#navCameraState").hidden = false;

    if (!window.isSecureContext) {
        $("#navStatus").textContent =
            "Camera and GPS require HTTPS or localhost. Use Maps directions.";

        stopNavigation(false);
        return;
    }

    // Request compass permission directly from the user's button action.
    const compassTask = enableCompass();

    if (!navigator.geolocation) {
        $("#navStatus").textContent =
            "Location is unsupported. Use Maps road directions.";

        stopNavigation(false);
        return;
    }

    navWatch = navigator.geolocation.watchPosition(
        position => {
            if (epoch !== navEpoch || !navActive) return;

            navPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
                time: position.timestamp
            };

            $("#navStatus").textContent =
                "Location received. Approximate outdoor direction only.";

            renderNavigation();
        },

        error => {
            if (epoch !== navEpoch || !navActive) return;

            if (error.code === 1) {
                $("#navStatus").textContent =
                    "Location permission denied. Enable location in browser settings, or use Maps.";
            } else if (error.code === 2) {
                $("#navStatus").textContent =
                    "GPS position unavailable. Check location services or use Maps.";
            } else {
                $("#navStatus").textContent =
                    "Location timed out. Retry when GPS reception improves.";
            }

            console.error("Geolocation error:", error);

            stopNavigation(false);
        },

        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        }
    );

    navTimer = setInterval(renderNavigation, 1000);

    try {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error("Camera unavailable.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    ideal: "environment"
                }
            },
            audio: false
        });

        if (epoch !== navEpoch || !navActive) {
            stream.getTracks().forEach(track => track.stop());
            return;
        }

        navStream = stream;

        const video = $("#navVideo");

        video.srcObject = stream;
        video.hidden = false;

        await video.play();

        if (epoch !== navEpoch || !navActive) return;

        $("#navCameraState").hidden = true;

        renderNavigation();

    } catch (error) {
        console.error("Camera error:", error);

        if (epoch === navEpoch && navActive) {
            navStream?.getTracks?.().forEach(
                track => track.stop()
            );

            navStream = null;

            $("#navVideo").srcObject = null;
            $("#navVideo").hidden = true;

            $("#navCameraState").hidden = false;

            $("#navCameraState").textContent =
                "Camera denied or unavailable. GPS bearing remains available when location is permitted.";

            renderNavigation();
        }
    }

    await compassTask;
}

function stopNavigation(report = true) {
    const wasActive = navActive;

    navEpoch++;
    navActive = false;

    navStream?.getTracks?.().forEach(
        track => track.stop()
    );

    navStream = null;

    const video = $("#navVideo");

    video.srcObject = null;
    video.hidden = true;

    if (navWatch !== null) {
        navigator.geolocation?.clearWatch(navWatch);
    }

    navWatch = null;

    window.removeEventListener(
        "deviceorientation",
        orientationHandler
    );

    window.removeEventListener(
        "deviceorientationabsolute",
        orientationHandler
    );

    orientationListening = false;

    clearInterval(navTimer);
    navTimer = null;

    navHeading = null;
    navPosition = null;
    headingAt = 0;

    $("#navArrow").hidden = true;

    $("#navCameraState").hidden = false;
    $("#navCameraState").textContent = "Camera stopped.";

    $("#navStart").disabled = !navHospital?.coordinates;
    $("#navStop").disabled = true;

    if (report && wasActive) {
        $("#navStatus").textContent =
            "Navigation stopped. Camera, GPS watcher and compass listeners released.";

        $("#navDistance").textContent = "Navigation stopped";
        $("#navAccuracy").textContent = "";
        $("#navBearing").textContent = "No active location";
    }
}

$("#navStart").onclick = startNavigation;
$("#navStop").onclick = () => stopNavigation();
$("#navCompassRetry").onclick = enableCompass;