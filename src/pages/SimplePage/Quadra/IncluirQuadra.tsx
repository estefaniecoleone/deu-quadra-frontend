import React, { FormEvent, useContext, useEffect, useState } from 'react';
import TextInput from '@components/TextInput';
import { useModal } from '@src/hooks/Modal';
import { useApi } from '@src/api/api';
import { redirect, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../contexts/Auth';
import { LanguageContext } from '../../../../contexts/Language';
import { SimplePage } from '../SimplePage';
import { MainTitle } from '../Landing/MainTitle';
import { SearchButton } from '../Landing/SearchButton';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Logo } from '../../../components/Logo';
import { Link } from 'react-router-dom';

import axios from 'axios';

export function IncluirQuadraPage() {
  const navigate = useNavigate();


  const [isCourtCreated, setCourtCreated] = useState(false);
    const [courtName, setCourtName] = useState('');
    const [courtImageUrl, setCourtImageUrl] = useState('');
    const [courtPrice, setCourtPrice] = useState('');
    const [courtDescription, setCourtDescription] = useState('');
    const [companyId, setCompanyId] = useState(4); // Assuming a default company ID
  
    const handleCourtSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8080/courts', {
          nome: courtName,
          imagemUrl: courtImageUrl,
          preco: courtPrice,
          descricao: courtDescription,
          idEmpresa: companyId,
        });


        console.log(response.data)
        window.alert("QUADRA CADASTRADA COM SUCESSO!"); 
        console.log("banana")
        navigate('/empresa/' + 1);
        console.log("banana")

        if (response.status === 200) {
          console.log('Court created successfully!');
          
          // Handle any other logic here (e.g., redirect, display a success message)
        }
      } catch (error) {
        console.error('Error creating court:', error);
        window.alert("ERRO AO CADASTRAR QUADRA, TENTE NOVAMENTE EM INSTANTES! ERRO:" + error); 

        // Handle error cases (e.g., display an error message)
      }
    };
  
      
 
  return (

    
    <SimplePage>
      <div className="flex-center bg-green-300">

    <div className="p-6 bg-white shadow-md rounded-lg mb-3">
      <h2 className="text-2xl font-semibold mb-4 text-center">Incluir Nova Quadra</h2>
      <div>
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
          <button type="submit" 
                 className="bg-green-500 text-white p-2 rounded-md mt-3 mx-auto hover:bg-green-600">CRIAR QUADRA</button>
        </form>
      </div>
        MODALIDADE: 
        {/* <select name="select"> 
            <option value="futebol"selected>Futebol</option>
            <option value="tenis" > Tenis</option>
            <option value="volei">Voltei</option>
        </select> */}
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md mt-3 mx-auto hover:bg-green-600"
          > CADASTRAR
          </button>
          </div>
    </div>

    </SimplePage>

    
  );
}

export default IncluirQuadraPage;
