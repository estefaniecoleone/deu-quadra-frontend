import React, { useEffect, useState, useRef, useMemo, useCallback} from 'react';
import TextInput from '@components/TextInput';
import 'leaflet/dist/leaflet.css';
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMapEvent} from 'react-leaflet';
import { marker } from 'leaflet';

const center = {
  lat: -23.523746369760715,
  lng: -46.62233282888823,
}

var coordenadas;
var lat;
var long;

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)


  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          console.log(marker.dragging._marker._latlng);
          coordenadas=marker.dragging._marker._latlng;
          console.log(marker);
          lat=marker.dragging._marker._latlng.lat;
          long=marker.dragging._marker._latlng.lng;
          console.log(lat);
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
    console.log(marker)
  }, [])


  return (
<div className="h-100% w-100%">
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} 
        style={{
        height: "60%",
        width: "100%",
      }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={center}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Arraste para selecionar localizacao'
            : 'Clique para selecionar localizacao'}
        </span>
      </Popup>
    </Marker>
      )
  </MapContainer>


  <div className="w-full px-2 sm:w-1/2">
            <TextInput
              label="Latitude"
              type="text"
              id="Lat"
              value={lat}
              onChange={(e) => setLatLng(e.dragging.marker.latlng)}
              placeholder="LAT LONG"
            />
          </div>
          <div className="w-full px-2 sm:w-1/2">
            <TextInput
              label="Longitude"
              type="text"
              id="Long"
              value={long}
              onChange={(e) => setLatLng(e.dragging.marker.latlng)}
              placeholder="LAT LONG"
            />
          </div>


</div>
)
}

export default DraggableMarker;