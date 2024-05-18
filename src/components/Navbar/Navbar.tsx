import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { AuthenticationContext } from '../../contexts/Auth';
import { NavbarLoginButton } from './NavbarLoginButton';
import LanguageSelector from './LanguageSelector';

export interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const auth = useContext(AuthenticationContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={'h-[80px] bg-slate-100 ' + className}>
      <nav
        className={`fixed top-0 left-0 w-full bg-green-500 p-4 h-[80px] transition-transform ${
          isScrolled ? '-translate-y-full' : ''
        }`}
      >
        <div className="container max-w-screen-lg mx-auto px-10 h-full flex items-center justify-between">
          <Link to="/">
            <Logo lightMode={true}></Logo>
          </Link>
          <div className="hidden md:flex items-center"> {/* Ocultar em telas menores que médio */}
            <NavbarLoginButton />
            {!auth.isAuthenticated && (
              <Link to="/presignup" className="text-white ml-4">Cadastre-se</Link>
            )}
          </div>
        </div>
      </nav>
      {/* Adicionando o menu inferior */}
      <BottomMenu />
    </div>
  );
}

// Novo componente BottomMenu
function BottomMenu() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-green-500 p-2 h-[40px]">
      <div className="container max-w-screen-lg mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex"> {/* Adicionando display flex para agrupar os links */}
            <Link to="/" className="text-white mr-4">Home</Link>
            <Link to="/empresa/1" className="text-white mr-4">Minha Área</Link>
            <Link to="/search" className="text-white mr-4">Search</Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex"> {/* Adicionando display flex para agrupar os links */}
            <a href="https://www.youtube.com/@deuQuadra" target="_blank" rel="noopener noreferrer" className="text-white mr-4">
              YouTube
            </a>
            <a href="https://github.com/deuquadra" target="_blank" rel="noopener noreferrer" className="text-white mr-4">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
