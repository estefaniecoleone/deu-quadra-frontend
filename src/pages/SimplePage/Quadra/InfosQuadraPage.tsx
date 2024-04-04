import React, { useState, useEffect } from 'react';
import { SimplePage } from '../SimplePage';
import Navbar from '../../../components/Navbar/Navbar';
import { CardQuadra } from '../Locador/Card/CardQuadra';
import { CardEmpresa } from '../Locador/Card/CardEmpresa';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

export function InfosQuadraPage() {

  const [courtsData, setCourtsData] = useState([]);
  const [empresaData, setEmpresa] = useState([]);

  const idQuadra = 1;
  const idEmpresa = 1;

  let nomeEmpresa = [];


  useEffect(() => {
    // Faz a requisição para o endpoint
    axios.get('http://localhost:8080/companies/' + idEmpresa)
        .then((response) => {
        // Atualiza o estado com os dados recebidos
        //setCourtsData(response.data.courtsModelList);
        nomeEmpresa = response.data.nome;
        setEmpresa(response.data);
        setEmpresa(response.data);
        console.log(response.data);  
        console.log("oie");
        })
        .catch((error) => {
        console.error('Erro ao buscar dados das quadras:', error);
        });
    }, []);

    useEffect(() => {
        // Faz a requisição para o endpoint
        axios.get('http://localhost:8080/courts/' + idQuadra)
            .then((response) => {
            // Atualiza o estado com os dados recebidos
            //setCourtsData(response.data.courtsModelList);
            nomeEmpresa = response.data.nome;
            setEmpresa(response.data.nome);
            setEmpresa(response.data.rua);
            console.log(response.data);   
            setCourtsData(response.data);
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
          <div className=" rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ">
            {/* {courtsData.map((data, idEmpresa) => {
              return <CardEmpresa key={idEmpresa} props={data}></CardEmpresa>;
            })} */}
            
          </div>
          <CardEmpresa props={empresaData}></CardEmpresa>;

            <h2>Informacoes da Quadra selecionada: </h2>
            <CardQuadra props={courtsData}></CardQuadra>;
            {/* //{courtsData.map((data, idQuadra) => {
              return <CardQuadra props={data}></CardQuadra>;
            })} */}
    
</div>
    

      
    </SimplePage>
  );
}
