import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { Login } from './Actions/Login';
import { Signuplocatario } from './Actions/Signuplocatario'; // Corrigido o nome do componente
import { Signuplocador } from './Actions/Signuplocador'; // Corrigido o nome do componente

enum Actions {
  LOGIN,
  REGISTER,
}

export function Signuplocatariopage() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <Signuplocatario /> {/* Corrigido o nome do componente */}
      </div>
    </SimplePage>
  );
}
