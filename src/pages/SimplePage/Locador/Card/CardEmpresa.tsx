import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../../../contexts/Language';
import imagem_quadra from '@src/assets/imagem_quadra.jpg';

export interface CardProps {
  props: {
      nome: string;
      idEmpresa: number;
      rua: string;
      bairro: string;
      numero: string;
      courtsModelList: {
        nome: string;
        preco: number;
        descricao: string;
        idQuadra: number;
        imagemUrl: string;
      }
    };
};


function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });
}

export function CardEmpresa({ props }: CardProps) {
  const languageContext = useContext(LanguageContext)!;

  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = new Image();
    image.src = imagem_quadra;

  });

  return (
    <div className=" rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ">
      <div className="h-[200px] aspect-square">
        <img src={imagem_quadra} className="object-cover w-full h-full" />
      </div>
      <div className="flex p-5 flex-col justify-between items-between w-[600px]">
        <div>
          <div className="flex flex-col">
            <span className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">
              {props.nome} 
            </span>
            <span className="text-xs text-discreet font-bold">
            {props.bairro}, {props.rua}, {props.numero}{' '}
            </span>
            <Link to={'/search/'}>
            <span className="text-sm text-green-800">VER LOCALIZACAO NO MAPA</span>
            </Link>
          </div>

          <div className="mt-3"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-center flex-row  gap-1">
            <span className="text-sm font-light">A partir de R$</span>
            <span className="bold text-xl">{formatPrice(Number(props.idEmpresa))}</span>
          </div>
          <Link
            to={'/allocate/' + props.idQuadra}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            {languageContext.language.cardButtonAction}
          </Link>

          <Link
            to={'/empresa/' + 1}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            VER TODAS AS QUADRAS
          </Link>
        </div>
      </div>
    </div>
  );
}

