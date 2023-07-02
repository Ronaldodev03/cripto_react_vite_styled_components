/* eslint-disable react/prop-types */
import styled from "@emotion/styled";

const Texto = styled.div`
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-family: "lato", "sans-serif";
  font-weight: 700;
  background-color: #b7322c;
  border-radius: 0.5rem;
`;

const Error = ({ children }) => {
  return <Texto>{children}</Texto>;
};

export default Error;
