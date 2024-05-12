import React, { useEffect } from "react";

function GoogleMap({ lat, lon }) {
    useEffect(() => {
        const iframeData = document.getElementById("iframeId");
        iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
    }, [lat, lon]); // Add lat and lon to the dependency array to re-render when they change

    return (
        <div>
            <iframe id="iframeId" height="500px" width="100%"></iframe>
        </div>
    );
}

export default GoogleMap;
