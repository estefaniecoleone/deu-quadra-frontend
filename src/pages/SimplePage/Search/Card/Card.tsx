import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../../../contexts/Language';

export interface CardProps {
  props: {
    nome: string;
    preco: string;
    descricao: string;
    idQuadra: number;
    imagemUrl: string;
    idEmpresa: number;
    Empresa: {
      nome: string;
      idEmpresa: number;
      rua: string;
      bairro: string;
      numero: string;
    };
  };
}

export interface CardPropsEmpresa {
  props: {
      nome: string;
      idEmpresa: number;
      rua: string;
      bairro: string;
      numero: string;
      lat: string;
      long: string;
    };
  };

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });
}

export function Card({ props }: CardProps) {
  const languageContext = useContext(LanguageContext)!;

  return (
    <div className=" rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ">
      <div className="h-[200px] aspect-square">
        <img src={props.imagemUrl} className="object-cover w-full h-full" />
      </div>
      <div className="flex p-5 flex-col justify-between items-between w-[600px]">
        <div>
          <div className="flex flex-col">
            <span className="text-xs text-discreet font-bold">
              {props.bairro}, {props.rua}, {props.numero}{' '}
            </span>
            <span className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">
              {props.nome}
            </span>
            <Link to={'/empresa/' + props.idEmpresa}>
              <span className="text-sm text-green-800">{props.nome}</span>
            </Link>
          </div>

          <div className="mt-3"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-center flex-row  gap-1">
            <span className="text-sm font-light">R$</span>
            <span className="bold text-xl">{formatPrice(Number(props.preco))}</span>
          </div>
          <Link
            to={'/allocate/' + props.idQuadra}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            {languageContext.language.cardButtonAction}
          </Link>

          <Link
            to={'/empresa/' + props.idEmpresa}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            VER TODAS AS QUADRAS
          </Link>

        </div>
      </div>
    </div>
  );
}
