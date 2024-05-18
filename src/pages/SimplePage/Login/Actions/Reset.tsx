import React, { FormEvent, useContext, useState } from 'react';
import TextInput from '@components/TextInput';
import { useModal } from '@src/hooks/Modal';
import { useApi } from '@src/api/api';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../contexts/Auth';
import { LanguageContext } from '../../../../contexts/Language';

export function Reset() {
  const [email, setEmail] = useState('');
  const auth = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { language } = useContext(LanguageContext)!;

  async function handleReset(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        openModal('Success', 'Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.');
      } else {
        const data = await response.json();
        openModal('Erro', data.message);
      }
    } catch (error) {
      openModal('Erro', 'Ocorreu um erro ao processar sua solicitação.');
    }
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-3">
      <h2 className="text-2xl font-semibold mb-4 text-center">Esqueci a minha senha</h2>
      <form onSubmit={handleReset}>
        <TextInput
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language.emailButtonPlaceholder}
        />
        <div className="flex w-full justify-between px-2 mt-3">
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded-md mt-3 mx-auto hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Voltar
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md mt-3 mx-auto hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reset;
