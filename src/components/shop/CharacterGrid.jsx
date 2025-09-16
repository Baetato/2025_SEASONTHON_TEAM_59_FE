import React from "react";
import styled from "styled-components";

export default function CharacterGrid({ children }) {
  return <Grid>{children}</Grid>;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-content: center; /* 가운데 정렬 */
  gap: 14px; 
`;


