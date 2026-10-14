/* Approximate outdoor distance/bearing helpers for RAHAT. */
window.RahatGeo = (() => {
  const normal = angle => ((angle % 360) + 360) % 360;
  function distanceBearing(from, to) {
    const rad = d => d * Math.PI / 180;
    const lat1 = rad(Number(from.latitude ?? from.lat));
    const lon1 = rad(Number(from.longitude ?? from.lon ?? from.lng));
    const lat2 = rad(Number(to.latitude ?? to.lat));
    const lon2 = rad(Number(to.longitude ?? to.lon ?? to.lng));
    const dLat = lat2 - lat1, dLon = lon2 - lon1;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
    const distance = 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1-a)));
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    return { distance, bearing: normal(Math.atan2(y,x)*180/Math.PI) };
  }
  function relativeAngle(bearing, heading) { return ((normal(bearing) - normal(heading) + 540) % 360) - 180; }
  return { normal, distanceBearing, relativeAngle };
})();
