import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { Login } from './Actions/Login';
import DraggableMarker from './MapLocationSelection2';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';

enum Actions {
  LOGIN,
  REGISTER,
}

export function SignupPageTeste() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
      </div>
      <DraggableMarker /> 


    </SimplePage>
  );
}
