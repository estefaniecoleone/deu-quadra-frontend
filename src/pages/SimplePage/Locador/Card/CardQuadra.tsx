import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../../../contexts/Language';
import imagem_quadra from '@src/assets/imagem_quadra.jpg';

export interface CardProps {
  props: {
        nome: string;
        preco: number;
        descricao: string;
        idQuadra: number;
        imagemUrl: string;
        idEmpresa: number;
    };
};


function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });
}

export function CardQuadra({ props }: CardProps) {

  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = new Image();
    image.src = imagem_quadra;

  });



  const languageContext = useContext(LanguageContext)!;

  return (
    <div>
    <div className=" rounded-sm flex flex-row border bg-white overflow-hidden hover:shadow-xl transition-all duration-300 w-[100%]">
      <div className="h-[300px] aspect-square">
        <img src={imagem_quadra} className="object-cover w-full h-full" />
      </div>
      <div className="flex p-5 flex-col justify-between items-between">
        <div>
          <div className="flex flex-col">
            <span className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">
              {props.nome}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="bold text-x2">Descricao: {props.descricao}</span>
          </div>

          <div className="flex flex-col">
            <span className="bold text-x2">Modalidade: Futebol</span>
          </div>

          <div className="mt-3"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-center flex-row  gap-1">
            <span className="text-sm font-light">Valor por periodo*: R$</span>
            <span className="bold text-xl">{formatPrice(Number(props.preco))}</span>
          </div>
          
        </div>
        <Link
            to={'/allocate/' + props.idQuadra}
            className="px-5 py-2 text-green-600 border rounded-sm border-green-500 hover:bg-green-500 hover:text-white"
          >
            {languageContext.language.cardButtonAction}
          </Link>
      </div>

    </div>
    </div>
  );
}

