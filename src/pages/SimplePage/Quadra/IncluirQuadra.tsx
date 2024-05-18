import React, { FormEvent, useState } from 'react';
import TextInput from '@components/TextInput';
import { SimplePage } from '../SimplePage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function IncluirQuadraPage() {
  const navigate = useNavigate();

  const [courtName, setCourtName] = useState('');
  const [courtImageUrl, setCourtImageUrl] = useState('');
  const [courtPrice, setCourtPrice] = useState('');
  const [courtDescription, setCourtDescription] = useState('');
  const [companyId] = useState(1); // Assuming a default company ID
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCourtSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://54.209.227.225:8080/courts', {
        nome: courtName,
        imagemUrl: courtImageUrl,
        preco: courtPrice,
        descricao: courtDescription,
        idEmpresa: companyId,
      });

      console.log(response.data);
      window.alert('QUADRA CADASTRADA COM SUCESSO!');
      navigate('/empresa/' + 1);

      if (response.status === 200) {
        console.log('Court created successfully!');
        // Handle any other logic here (e.g., redirect, display a success message)
      }
    } catch (error) {
      console.error('Error creating court:', error);
      setError('ERRO AO CADASTRAR QUADRA, TENTE NOVAMENTE EM INSTANTES! ERRO:' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SimplePage>
      <div className="flex-center bg-green-300">
        <div className="p-6 bg-white shadow-md rounded-lg mb-3">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Incluir Nova Quadra
          </h2>
          <form onSubmit={handleCourtSubmit}>
            Nome da Quadra:
            <TextInput
              type="text"
              placeholder="Nome da Quadra"
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
            />
            Insira uma imagem:
            <TextInput
              type="text"
              placeholder="Image URL"
              value={courtImageUrl}
              onChange={(e) => setCourtImageUrl(e.target.value)}
            />
            Preco por periodo
            <TextInput
              type="text"
              placeholder="Valor em R$ "
              value={courtPrice}
              onChange={(e) => setCourtPrice(e.target.value)}
            />
            Descricao:
            <TextInput
              placeholder="Descricao"
              value={courtDescription}
              onChange={(e) => setCourtDescription(e.target.value)}
            />
            <div className="rounded-lg border border-gray-400 p-2 mb-4">
              Modalidade:
              <select name="modalidade">
                <option value="futebol">Futebol</option>
                <option value="tenis">Tênis</option>
                <option value="volei">Vôlei</option>
              </select>
            </div>
            {isLoading ? (
              <p>Enviando dados...</p>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md mx-auto hover:bg-blue-600"
              >
                CADASTRAR
              </button>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </SimplePage>
  );
}

export default IncluirQuadraPage;
