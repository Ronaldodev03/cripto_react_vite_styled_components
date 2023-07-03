import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagenCripto from "./img/imagen-criptos.png";
import Form from "./components/Form";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

// |Start of Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;
// ||End of Styled Components

function App() {
  // | START STATES:

  // This state takes the data from the 'Form' component, it has been passed as prop to the 'Form' component.
  const [monedas, setMonedas] = useState({});
  // This state takes the data from the API in the useEffect. The useEffect work only if 'monedas' is not an empty object,
  //(it is not empty only after submiting in the form, so the very first time the entire App loads it will get through the useEffect, but not inside the if statement).
  // And this useEffect will also work each time we submit in the form inside the 'Form' component (each time 'monedas' changes).
  // In this state we will have the info regarding to the price of the selected criptocurrency and fiat money in the form located in the 'Form' component.
  const [resultado, setResultado] = useState({});
  //State for the loader (used for showing the loader in the UI conditionally).
  const [cargando, setCargando] = useState(false);

  // | END STATES:

  //useEffect for taking the data from the API (depending on the selected criptocurrency and fiat money) and saving it in the 'resultado' state.
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});
        const { moneda, criptomoneda } = monedas;
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(URL);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Container>
      <Img src={imagenCripto} alt="/" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Container>
  );
}

export default App;
