import React, { FormEvent, useContext, useEffect, useState } from 'react';
import TextInput from '@components/TextInput';
import { useModal } from '@src/hooks/Modal';
import { useApi } from '@src/hooks/hooks'; // Importando o hook recém-criado
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../../../contexts/Auth';
import { LanguageContext } from '../../../../contexts/Language';

export function Signuplocatario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const auth = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate('/');
    }
  }, []);

  const { signup } = useApi();
  const { openModal } = useModal();
  const { language } = useContext(LanguageContext)!;

  function handleSignup(event: FormEvent) {
    event.preventDefault();

    signup(nome, email, password, identificador)
      .then(() => {
        setSuccessMessage('Cadastro finalizado com sucesso!');
      })
      .catch((error: any) => {
        openModal('Erro', error.response.data.message);
      });
  }

  function handleOkClick() {
    setSuccessMessage('');
    navigate('/');
  }

  return (
    <>
      {!successMessage && (
        <div className="flex justify-center items-center h-screen">
          <div className="p-6 bg-white shadow-md rounded-lg mb-3 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Cadastre-se</h2>
            <h2 className="text-1xl font-semibold mb-4 text-center">Para alugar uma quadra</h2>
            <form onSubmit={handleSignup} className="flex flex-wrap">
              <div className="w-full px-2">
                <TextInput
                  label="Nome"
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder={language.nameButtonPlaceholder}
                />
              </div>
              <div className="w-full px-2">
                <TextInput
                  label="Identificador"
                  type="text"
                  id="identificador"
                  value={identificador}
                  onChange={(e) => setIdentificador(e.target.value)}
                  placeholder="Informe o CPF ou CNPJ"
                />
              </div>
              <div className="w-full px-2">
                <TextInput
                  label="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language.emailButtonPlaceholder}
                />
              </div>
              <div className="w-full px-2">
                <TextInput
                  label={language.passwordLabel}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language.passwordButtonPlaceholder}
                />
              </div>
              <div className="w-full px-2 mt-3">
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
                    onClick={() => navigate('/presignup')}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    {language.LoginPageButton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="flex justify-center items-center h-screen">
          <div className="p-6 bg-white shadow-md rounded-lg mb-3 w-full sm:w-4/4 md:w-3/2 lg:w-3/3 xl:w-5/4 text-center">
            <p className="text-green-800 text-xl mb-4" style={{ whiteSpace: "nowrap" }}>{successMessage}</p>
            <button className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={handleOkClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Signuplocatario;
