import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../contexts/Auth';

// Importe a imagem de fundo
import backgroundImage from '@src/assets/ballin.jpg';

export function Presignup() {
  const auth = useContext(AuthenticationContext);
  const navigate = useNavigate();

  return (
    // Use inline style para definir a imagem de fundo e o tamanho da tela
    <div className="flex justify-center items-center w-screen h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Bem Vindo!</h2>
        <div className="mb-6">
          <div className="mb-4">
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
              onClick={() => navigate('/signuplocatario')}
            >
              Quero Alugar uma Quadra
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
              onClick={() => navigate('/signuplocador')}
            >
              Quero anunciar minha Quadra
            </button>
          </div>
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded-md mx-auto hover:bg-blue-600"
            onClick={() => navigate('/')}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Presignup;
