var state=["run","stop"],speed=100,markerstate=state[0],myreg;
function run(length){
    marker = L.marker(markersList[length-1].getLatLng(), {icon: carIcon}).setRotationOrigin('center center').bindPopup(markersList[0]._popup._content).openPopup().addTo(map);
    markEnd = L.marker(markersList[0].getLatLng(), {icon: carIcon}).setRotationOrigin('center center').bindPopup(markersList[0]._popup._content).addTo(map);
    var j = length-2;
    markerstate=state[0];
    myreg =window.requestAnimationFrame(jump);
    function jump() {
        if (j <0||markerstate==="stop") {
            marker.openPopup();
            window.cancelAnimationFrame(myreg);
        }
        else {
            marker.setLatLng(markersList[j].getLatLng()).setPopupContent(markersList[j]._popup._content).setRotationAngle(markersList[j].properties.carHeading).update();
            var mapbound = map.getBounds();
            var inbound = mapbound.contains(marker.getLatLng());
            if (!inbound) map.setView(marker.getLatLng());
            window.cancelAnimationFrame(myreg);
            if (markersList[j].properties.type==="stop") {
                setTimeout(function () {
                    j--;
                    myreg=window.requestAnimationFrame(jump);
                },1000)}
                else {
                    setTimeout(function () {
                        j--;
                        myreg=window.requestAnimationFrame(jump);
                    },1000/speed)
                }}}
    marker.on('click', function () {
        if (markerstate==="stop") {
            markerstate = state[0];
            myreg=window.requestAnimationFrame(jump);
        }
        else markerstate=state[1];
    });}