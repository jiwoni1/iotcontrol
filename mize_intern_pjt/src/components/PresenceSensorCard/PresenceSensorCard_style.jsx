import styled from "styled-components";
import { Noto_Sans_KR } from "../../styles/fonts";
import { PALETTE } from "../../styles/colors";

export const Top = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled.img`
  width: 45px;
  height: 45px;
`;

export const Button = styled.div`
  width: 70px;
  height: 100%;
  background-color: ${({ $isPresenece }) =>
    $isPresenece ? PALETTE.MAIN_YELLOW : PALETTE.SUB_BLACK};
  border-radius: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
