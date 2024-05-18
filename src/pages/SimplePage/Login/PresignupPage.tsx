import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { Login } from './Actions/Login';
import Presignup from './Actions/Presignup';

enum Actions {
  LOGIN,
  REGISTER,
}

export function PresignupPage() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <Presignup></Presignup>
      </div>
    </SimplePage>
  );
}
