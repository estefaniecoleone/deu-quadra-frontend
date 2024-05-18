import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { Login } from './Actions/Login';
import { Signuplocador } from './Actions/Signuplocador.tsx';
import { Signuplocatario } from './Actions/Signuplocatario'; // Corrigido a sintaxe da importação

enum Actions {
  LOGIN,
  REGISTER,
}

export function Signuplocadorpage() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <Signuplocador></Signuplocador>
      </div>
    </SimplePage>
  );
}
