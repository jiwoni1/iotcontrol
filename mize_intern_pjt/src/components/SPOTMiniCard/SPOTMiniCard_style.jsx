import styled from "styled-components";
import { Noto_Sans_KR } from "../../styles/fonts";
import { PALETTE } from "../../styles/colors";

export const Top = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 7%;
`;

export const Icon = styled.img`
  width: 50%;
  object-fit: scale-down;
`;

export const IconText = styled.div`
  font-weight: ${Noto_Sans_KR.regular.weight};
  font-size: 0.7rem;
  color: ${PALETTE.MAIN_BLACK};
`;

export const Button = styled.div`
  width: 100%;
  height: 60%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.SUB_BLACK};

  &:active {
    background-color: ${PALETTE.MAIN_BLUE}; /* 클릭 시 색상 */
  }
`;

export const ButtonContainer = styled.div`
  width: 35%;
  align-items: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5%;
  padding-left: 7%;
`;
