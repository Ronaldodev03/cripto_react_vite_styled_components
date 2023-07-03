import { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  color: #fff;
  display: block;
  font-family: "lato", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 15px 0;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 14px;
  border-radius: 10px;
`;

// 'label' is a text and 'opciones' is an array of object.
const useSelectMonedas = (label, opciones) => {
  const [state, setState] = useState("");

  const selectMonedas = () => (
    <>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Select</option>
        {opciones.map((data) => (
          <option key={data.id} value={data.id}>
            {data.nombre}
          </option>
        ))}
      </Select>
    </>
  );
  return [state, selectMonedas];
};
// This is returnin the selected opcion in the selector 'state' and a component 'selectMonedas'.
export default useSelectMonedas;
