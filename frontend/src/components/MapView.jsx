import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";

/* =====================
   UTILS
   ===================== */
const getZoneColor = (risk) => {
  if (risk === "HIGH") return "#dc2626";
  if (risk === "MEDIUM") return "#facc15";
  return "#16a34a";
};

const getZoneRadius = (risk) => {
  if (risk === "HIGH") return 120;
  if (risk === "MEDIUM") return 80;
  return 50;
};

const getScoreColor = (score) => {
  if (score >= 70) return "#dc2626";
  if (score >= 40) return "#facc15";
  return "#16a34a";
};

const MapView = ({ onMapClick, userLocation, riskZone }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const globalMarkersRef = useRef([]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [simulateGlobal, setSimulateGlobal] = useState(false);
  const [loadingSim, setLoadingSim] = useState(false);

  /* =====================
     MAP INIT (ONCE)
     ===================== */
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [88.36, 22.57],
      zoom: 2.3,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("click", (e) => {
      onMapClick(e.lngLat.lat, e.lngLat.lng);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  /* =====================
     USER LOCATION
     ===================== */
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    const map = mapInstanceRef.current;

    map.flyTo({
      center: userLocation,
      zoom: 14,
      speed: 1.2,
      curve: 1.4,
      essential: true,
    });

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    userMarkerRef.current = new maplibregl.Marker({ color: "#e70707ff" })
      .setLngLat(userLocation)
      .addTo(map);
  }, [userLocation]);

  /* =====================
     LOCAL RISK ZONE
     ===================== */
  useEffect(() => {
    if (!mapInstanceRef.current || !riskZone || !userLocation) return;

    const map = mapInstanceRef.current;
    const [lng, lat] = userLocation;

    if (map.getLayer("risk-zone-layer")) map.removeLayer("risk-zone-layer");
    if (map.getSource("risk-zone")) map.removeSource("risk-zone");

    map.addSource("risk-zone", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
    });

    map.addLayer({
      id: "risk-zone-layer",
      type: "circle",
      source: "risk-zone",
      paint: {
        "circle-radius": getZoneRadius(riskZone.overallRisk),
        "circle-color": getZoneColor(riskZone.overallRisk),
        "circle-opacity": 0.35,
      },
    });
  }, [riskZone]);

  /* =====================
     GLOBAL SIMULATION
     ===================== */
  const toggleGlobalSimulation = async () => {
    if (!mapInstanceRef.current) return;

    // TURN OFF
    if (simulateGlobal) {
      globalMarkersRef.current.forEach((m) => m.remove());
      globalMarkersRef.current = [];
      setSimulateGlobal(false);
      return;
    }

    // TURN ON
    try {
      setLoadingSim(true);
      const res = await axios.get(
        "http://localhost:5000/api/global-risk/simulate"
      );

      const map = mapInstanceRef.current;
      const allZones = [
        ...res.data.highRisk,
        ...res.data.mediumRisk,
        ...res.data.safeZones,
      ];

      allZones.forEach((loc) => {
        const el = document.createElement("div");
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = getScoreColor(loc.score);
        el.style.boxShadow = "0 0 8px rgba(0, 0, 0, 0.3)";

        const marker = new maplibregl.Marker(el)
          .setLngLat([loc.lon, loc.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 12 }).setHTML(
              `<strong>${loc.name}</strong><br/>Risk Score: ${loc.score}`
            )
          )
          .addTo(map);

        globalMarkersRef.current.push(marker);
      });

      setSimulateGlobal(true);
    } catch (err) {
      alert("Global risk simulation failed");
    } finally {
      setLoadingSim(false);
    }
  };

  /* =====================
     RESIZE ON FULLSCREEN
     ===================== */
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.resize();
      }, 300);
    }
  }, [isFullscreen]);

  return (
    <div
      className={`
        fixed z-60 bg-white overflow-hidden transition-all duration-500 ease-in-out
        ${
          isFullscreen
            ? "top-0 left-0 w-screen h-screen rounded-none"
            : `
              bottom-4 right-4
              w-[92vw] h-[30vh]
              sm:w-[420px] sm:h-[260px]
              rounded-2xl shadow-2xl
            `
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between bg-green-600 text-white px-4 py-2 z-100">
        <span className="font-semibold text-sm">Live Risk Map</span>

        <div className="flex gap-2">
          <button
            onClick={toggleGlobalSimulation}
            className={`text-xs px-3 py-1 rounded-md transition ${
              simulateGlobal
                ? "bg-red-100 text-red-700"
                : "bg-white text-green-700"
            }`}
          >
            {loadingSim
              ? "Simulating..."
              : simulateGlobal
              ? "Stop Simulation"
              : "Simulate Global Risk"}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-xs bg-white text-green-700  px-3 py-1 rounded-md"
          >
            {isFullscreen ? "Minimize" : "Expand"}
          </button>
        </div>
      </div>

      {/* MAP */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default MapView;
