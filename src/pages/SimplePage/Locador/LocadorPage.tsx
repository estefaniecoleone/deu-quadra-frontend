import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardLocador } from '../Locador/Card/CardLocador';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

export function LocadorPage() {

  const [courtsData, setCourtsData] = useState([]);
  const [testeData, setTeste] = useState([]);


  const idEmpresa = 4;

  let nomeEmpresa = [];

  const [empresaData, setEmpresa] = useState([]);

  useEffect(() => {
    // Faz a requisição para o endpoint
    axios.get('http://localhost:8080/companies/' + idEmpresa)
        .then((response) => {
        // Atualiza o estado com os dados recebidos
        //setCourtsData(response.data.courtsModelList);
        nomeEmpresa = response.data.nome;
        setEmpresa(response.data.nome);
        setEmpresa(response.data.rua);

        setCourtsData(response.data.courtsModelList);
        console.log("oie");
        })
        .catch((error) => {
        console.error('Erro ao buscar dados das quadras:', error);
        });
    }, []);

  return (
    <SimplePage>
        <div>

          <Navbar className="fade-in"></Navbar>
          <div className="mt-8 flex flex-col items-center border bg-white space-y-4">
            <h2>Quadras da empresa: </h2>
            {courtsData.map((data, idEmpresa) => {
              return <CardLocador key={idEmpresa} props={data}></CardLocador>;
            })}
            </div>
    
</div>

            
<div className="mt-28 flex flex-col items-center border bg-white space-y-4">

          <h2>ACESSO RAPIDO: </h2>
          <div className="flex items-center">
          <Link
            to={'/company'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Cadastrar Empresa
          </Link>
          </div>
          <div className="flex items-center">
          <Link
            to={'/empresa/1'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Minhas Quadras
          </Link>
          </div>
          <div className="flex items-center">
            <Link
            to={'/allocate/'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Editar Cadastro
          </Link>
          </div>
          <Link
            to={'/novaQuadra/'}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            Incluir Quadra
          </Link>
          
</div>

      
    </SimplePage>
  );
}
