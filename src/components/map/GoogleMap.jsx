import React, { useState, useEffect, useRef } from 'react';

const GOOGLE_MAP_API_KEY = 'AIzaSyA0NEvf7q6Y_-b--NuVx-xrUytrfkj8Lo4';
const mapStyles = { width: '100%', height: '400px' };
const sfLocation = { lat: 37.773972, lng: -122.431297 };

const createGoogleMap = ({ userLocation }) =>
  new window.google.maps.Map(document.getElementById('google-map'), {
    center: { lat: userLocation.lat, lng: userLocation.lng },
    zoom: 14,
  });

const createMarker = ({ userLocation, googleMapRef }) =>
  new window.google.maps.Marker({
    position: { lat: userLocation.lat, lng: userLocation.lng },
    map: googleMapRef.current,
  });

const GoogleMaps = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos =>
        setUserLocation({
          lat: pos.coords.latitude || sfLocation.lat,
          lng: pos.coords.longitude || sfLocation.lng,
        }),
      err => console.error(`ERROR ${err.code}: ${err.message}`),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, []);

  useEffect(() => {
    let googleMapScript;
    let setGoogleMapWithMarker;
    const { lat, lng } = userLocation;

    if (!document.getElementById('google-map-script') && lat && lng) {
      googleMapScript = document.createElement('script');
      googleMapScript.id = 'google-map-script';
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;

      window.document.body.appendChild(googleMapScript);
      setGoogleMapWithMarker = () => {
        googleMapRef.current = createGoogleMap({ userLocation });
        markerRef.current = createMarker({ userLocation, googleMapRef });
      };
      googleMapScript.addEventListener('load', setGoogleMapWithMarker);
    }
  }, [userLocation]);

  return <div id="google-map" style={mapStyles} />;
};

export default GoogleMaps;
