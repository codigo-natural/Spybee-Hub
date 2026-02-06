'use client'

import { useEffect, useState, useRef } from "react";
import { useProjectStore } from "@/lib/store";
import { MAP_CONFIG } from "@/lib/constants";
import maplibregl from "maplibre-gl"
import styles from "./ProjectMap.module.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@/app/maplibre-popup.css";
import Image from "next/image";

const SATELLITE_STYLE = {
  version: 8,
  sources: {
    'satellite-source': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      ],
      tileSize: 256
    }
  },
  layers: [
    {
      id: 'satellite-layer',
      type: 'raster',
      source: 'satellite-source',
      minzoom: 0,
      maxzoom: 22
    }
  ]
};

const STANDARD_STYLE = "https://demotiles.maplibre.org/style.json";

const createCustomMarker = (project) => {
  const el = document.createElement("div");
  el.style.width = `${MAP_CONFIG.MARKER_SIZE.DEFAULT}px`;
  el.style.height = `${MAP_CONFIG.MARKER_SIZE.DEFAULT}px`;
  el.style.cursor = "pointer";
  el.style.backgroundImage = "url('/pin.png')";
  el.style.backgroundSize = "contain";
  el.style.backgroundRepeat = "no-repeat";
  el.style.backgroundPosition = "center";
  el.title = project.title;
  return el;
};

export const ProjectMap = () => {
  const { projects, selectedProject, setSelectedProject } = useProjectStore();
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const currentPopupRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isSatellite, setIsSatellite] = useState(true);

  const validProjects = projects.filter(
    p => p.position?.lat != null && p.position?.lng != null
  );

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current && validProjects.length > 0) {
      const avgLat = validProjects.reduce((sum, p) => sum + p.position.lat, 0) / validProjects.length;
      const avgLng = validProjects.reduce((sum, p) => sum + p.position.lng, 0) / validProjects.length;

      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: SATELLITE_STYLE,
        center: [avgLng, avgLat],
        zoom: MAP_CONFIG.DEFAULT_ZOOM,
        attributionControl: false,
      });

      mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      mapRef.current.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );

      mapRef.current.on('load', () => {
        setMapLoaded(true);
      });
    }

    return () => {
      if (mapRef.current) {
        if (currentPopupRef.current) {
          currentPopupRef.current.remove();
          currentPopupRef.current = null;
        }
        markersRef.current.forEach(({ marker }) => marker.remove());
        markersRef.current = [];

        mapRef.current.remove();
        mapRef.current = null;
        setMapLoaded(false);
      }
    };
  }, [validProjects.length]);

  const toggleMapStyle = () => {
    if (mapRef.current) {
      const newStyle = !isSatellite ? SATELLITE_STYLE : STANDARD_STYLE;
      mapRef.current.setStyle(newStyle);
      setIsSatellite(!isSatellite);
    }
  };

  useEffect(() => {
    if (mapRef.current && mapLoaded && markersRef.current.length === 0) {
      validProjects.forEach((project) => {
        const el = createCustomMarker(project);

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([project.position.lng, project.position.lat])
          .addTo(mapRef.current);

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          setSelectedProject(project);
        });

        el.addEventListener("mouseenter", () => {
          el.style.width = `${MAP_CONFIG.MARKER_SIZE.HOVER}px`;
          el.style.height = `${MAP_CONFIG.MARKER_SIZE.HOVER}px`;
        });

        el.addEventListener("mouseleave", () => {
          el.style.width = `${MAP_CONFIG.MARKER_SIZE.DEFAULT}px`;
          el.style.height = `${MAP_CONFIG.MARKER_SIZE.DEFAULT}px`;
        });

        markersRef.current.push({ marker, projectId: project._id, element: el });
      });
    }
  }, [mapLoaded, validProjects, setSelectedProject]);

  useEffect(() => {
    if (!mapRef.current || !selectedProject) {
      if (currentPopupRef.current) {
        currentPopupRef.current.remove();
        currentPopupRef.current = null;
      }
      return;
    }

    if (currentPopupRef.current) {
      currentPopupRef.current.remove();
    }
    const popupContent = `
      <div class="popup-content">
        <h3 class="popup-title">${selectedProject.title}</h3>
      </div>
    `;

    const popup = new maplibregl.Popup({
      offset: MAP_CONFIG.POPUP_OFFSET,
      closeButton: false,
      closeOnClick: true,
      className: styles.popup,
      maxWidth: MAP_CONFIG.POPUP_MAX_WIDTH,
      anchor: 'bottom'
    });

    popup.setLngLat([selectedProject.position.lng, selectedProject.position.lat]);
    popup.setHTML(popupContent);
    popup.addTo(mapRef.current);

    currentPopupRef.current = popup;
  }, [selectedProject]);

  useEffect(() => {
    if (mapRef.current && selectedProject && selectedProject.position) {
      mapRef.current.flyTo({
        center: [selectedProject.position.lng, selectedProject.position.lat],
        zoom: MAP_CONFIG.SELECTED_ZOOM,
        duration: MAP_CONFIG.FLY_DURATION,
        easing: (t) => t * (2 - t),
        essential: true,
      });
    }
  }, [selectedProject]);

  if (validProjects.length === 0) {
    return (
      <div className={styles.emptyMap}>
        <div className={styles.emptyMapContent}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p>No hay proyectos con coordenadas válidas para mostrar en el mapa</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapContainer} ref={mapContainerRef} />

      <button
        className={styles.mapLayerControl}
        onClick={toggleMapStyle}
        aria-label="Cambiar estilo de mapa"
      >
        <div className={styles.layerPreview}>
          <Image
            src="/satelite.png"
            alt="Satelite"
            width={20}
            height={20}
            unoptimized
          />
        </div>
      </button>

      {!mapLoaded && (
        <div className={styles.mapLoading}>
          <div className={styles.spinner}></div>
          <p>Cargando mapa...</p>
        </div>
      )}
    </div>
  );
};
