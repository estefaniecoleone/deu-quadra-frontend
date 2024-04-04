import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardLocador } from '../Locador/Card/CardLocador';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';

import axios from 'axios';

export function LocadorPage() {

  const [courtsData, setCourtsData] = useState([]);
  const [testeData, setTeste] = useState([]);


  const idEmpresa = 1;

  let nomeEmpresa = [];

  const [empresaData, setEmpresa] = useState([]);

  useEffect(() => {
    // Faz a requisição para o endpoint
    axios.get('http://localhost:8080/companies/' + idEmpresa)
        .then((response) => {
        // Atualiza o estado com os dados recebidos
        //setCourtsData(response.data.courtsModelList);
        nomeEmpresa = response.data.nome;
        setEmpresa(response.data.nome[1]);
        setEmpresa(response.data.rua);

        setCourtsData(response.data.courtsModelList);
        console.log("oie");
        console.log(setEmpresa.toString);
        console.log(setEmpresa);

        })
        .catch((error) => {
        console.error('Erro ao buscar dados das quadras:', error);
        });
    }, []);

  return (
    <SimplePage>
        <div>

          <Navbar className="fade-in"></Navbar>



          Quadras da empresa: 
          <div className=" rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ">
            HELLO WORDL nomeEmpresa
            {courtsData.map((data, idEmpresa) => {
              return <CardEmpresa key={idEmpresa} props={data}></CardEmpresa>;
            })}
          </div>

          <div className="flex flex-col gap-5 col-span-2"></div>
            <div className="flex flex-row gap-1 items-center">
              <span className="text-xl font-light">
              </span>
            </div>
            {courtsData.map((data, idEmpresa) => {
              return <CardLocador key={idEmpresa} props={data}></CardLocador>;
            })}
          </div>
      
    </SimplePage>
  );
}
