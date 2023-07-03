/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

// |Start of Styled Components

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: backgroun-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;
// ||End of Styled Components

const Form = ({ setMonedas }) => {
  // | START STATES:

  const [criptos, setCriptos] = useState([]);
  // The array that is passed as parameter to the useSelectMonedas hook is in the file 'data', that's gonna create a select which options will be the elements in the array.
  // SelectMoneda will be called in the return for the 'Form' component, it's gonna be the selector.
  const [moneda, SelectMoneda] = useSelectMonedas("Elige tu Moneda", monedas);
  // The array that is passed as parameter to the useSelectMonedas hook comes from info taken in the useEffect logic below.
  // SelectCritomoneda will be called in the return for the 'Form' component, it's gonna be the selector.
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige Criptomoneda",
    criptos
  );
  //State for the error (used for showing data in the UI conditionally).
  const [error, setError] = useState(false);

  // | END STATES:

  //useEffect for taking the data from the API, the data is the 20 most used cryptocurrencies, it will be saved in the 'criptos' variable.
  useEffect(() => {
    const consultarAPI = async () => {
      const URL =
        " https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(URL);
      const resultado = await respuesta.json();

      // Creamos un nuevo array con los datos que necesitamos de la API, tal que sea igual a la estructura que está en "moneda.jsx"
      const arrayCriptos = resultado.Data.map((data) => {
        const obj = {
          id: data.CoinInfo.Name,
          nombre: data.CoinInfo.FullName,
        };
        return obj;
      });
      setCriptos(arrayCriptos);
    };

    consultarAPI();
  }, []);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      criptomoneda,
    });
  };

  return (
    <>
      {error && <Error>TODOS LOS CAMPOS SON OBLIGATORIOS</Error>}
      <form onSubmit={handlerSubmit}>
        <SelectMoneda />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Form;
