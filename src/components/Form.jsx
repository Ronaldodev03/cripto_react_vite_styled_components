/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
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

const Form = ({ setMonedas, error, setError }) => {
  const [criptos, setCriptos] = useState([]);

  const [moneda, SelectMoneda] = useSelectMonedas("Elige tu Moneda", monedas);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige Criptomoneda",
    criptos
  );
  console.log(moneda);
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
