import React, { useState } from 'react';
import { SimplePage } from '../SimplePage';
import { Login } from './Actions/Login';
import Reset from './Actions/Reset';

enum Actions {
  LOGIN,
  REGISTER,
}

export function ResetPasswordPage() {
  const [action, setAction] = useState();

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <Reset></Reset>
      </div>
    </SimplePage>
  );
}
