import * as Styled from "./SPOTMiniCard_style";
import Card from "../Card/Card";
import tv from "../../assets/tv.png";
import newaircondition from "../../assets/newaircondition.png";
import { useState, useCallback } from "react";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import axios from "axios";

export default function SPOTMiniCard({ name, agt, data, me }) {
  // 대회의실만 에어컨, tv 모두 다 있음
  const conferenceRoom = name === "대회의실 리모컨 제어";
  const [isOn, setIsOn] = useState(
    conferenceRoom
      ? [
          { subName: "에어컨", status: data.P1.val },
          { subName: "TV", status: data.P2.val },
        ]
      : [{ subName: "에어컨", status: data.P1?.val === 1 }]
  );

  const [showPopup, setShowPopup] = useState(false); // 에러 팝업 표시 여부
  const [errorMessage, setErrorMessage] = useState(""); // API 연결 안됳 시 에러메시지

  // status 관리
  // 해당 번호의 status를 바꿈
  const handleButton = (index) => {
    setIsOn((prevState) => {
      const updatedStatus = [...prevState];
      updatedStatus[index] = {
        ...updatedStatus[index],
        status: !updatedStatus[index].status,
      };
      return updatedStatus;
    });
  };

  // SPOTMini on/off API
  const sendSPOTMiniControl = async (index) => {
    const url = "http://localhost:3005/controller";
    const targetSwitch = index === 0 ? "P1" : "P3"; // 대상 스위치 결정
    const newState = !isOn[index].state; // 현재 상태의 반대로
    const type = newState ? "0x81" : "0x80";
    const newtype = newState ? "129" : "128";
    const val = newState === 1 ? "1" : "0";
    const dataToSend = {
      agt: agt,
      me: me,
      idx: targetSwitch,
      type: type,
      val: val,
    };
    try {
      const response = await axios.post(url, dataToSend);

      if (response.status === 200) {
        console.log("Spotmini POST API 테스트 성공", response.data);

        // 상태 업데이트 5초마다 + 즉각 반영
      } else {
        console.error("Spotmini POST API 호출 실패", response.data);
        setErrorMessage(`${name}이 작동하지 않습니다.`);
        setShowPopup(true);
      }
    } catch (error) {
      console.log("Spotmini POST API 에러", error);
      setErrorMessage(`${name}이 작동하지 않습니다.`);
      setShowPopup(true);
    }
  };

  // 팝업 닫기
  const handlePopupClose = useCallback(() => {
    setShowPopup(false);
    setErrorMessage("");
  }, []);

  return (
    <>
      <Card placeText={name}>
        <Styled.Top>
          {isOn.map((spotmini, idx) => (
            <Styled.ButtonContainer key={idx}>
              <Styled.Button
                onClick={() => handleButton(idx)}
                $isActive={spotmini.status}
              >
                <Styled.Icon
                  src={spotmini.subName === "에어컨" ? newaircondition : tv}
                  alt={spotmini.subName}
                />
              </Styled.Button>
              <Styled.IconText>{spotmini.subName}</Styled.IconText>
            </Styled.ButtonContainer>
          ))}
        </Styled.Top>
      </Card>
      {showPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={handlePopupClose} // 팝업 닫기
        />
      )}
    </>
  );
}
