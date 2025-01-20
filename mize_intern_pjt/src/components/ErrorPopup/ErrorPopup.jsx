import { useEffect } from "react";
import * as Styled from "./ErrorPopup_style";

export default function ErrorPopup({ message, onClose }) {
  // 팝업 켜졌을 때는 스크롤 비활성화
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // 팝업 닫힐 때 스크롤 복구
    };
  }, []);

  return (
    <>
      {/* 화면을 어둡게 하는 오버레이 */}
      <Styled.Overlay onClick={onClose} />
      {/* 팝업 컨테이너 */}
      <Styled.PopupContainer>
        <p>{message}</p>
        <Styled.Button onClick={onClose}>
          {/* <Styled.ButtonText>확인</Styled.ButtonText>
           */}
          확인
        </Styled.Button>
      </Styled.PopupContainer>
    </>
  );
}
