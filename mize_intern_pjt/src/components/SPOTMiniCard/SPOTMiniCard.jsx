import * as Styled from "./SPOTMiniCard_style";
import Card from "../Card/Card";
import tv from "../../assets/tv.png";
import newaircondition from "../../assets/newaircondition.png";
import { useState, useCallback } from "react";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import axios from "axios";

// 200 코드여도 failure면 popup주기

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
  const aiInfo = {
    "86d7": "AI_IR_86d7_1735908317", // 수면/샤워실(여)
    "86d4": "AI_IR_86d4_1735907860", // 수면/샤워실(남)
    "86c9": "AI_IR_86c9_1735904311", // 서버실
    "61b1": "AI_IR_61b1_1735629377", // 대회의실
    "3c98": "AI_IR_3c98_1735904858", // 김혜진이사실
  };

  // SPOTMini on/off API
  const sendSPOTMiniControl = async (index) => {
    const url = import.meta.env.VITE_API_POST_SPOTMINI;
    const isConferenceRoomAirConditioner =
      conferenceRoom && isOn[index].subName === "에어컨";
    const keys = isConferenceRoomAirConditioner ? '["CS_2"]' : '["CS_1"]';
    const dataToSend = {
      agt: agt,
      me: me,
      ai: aiInfo[me],
      category: "custom",
      brand: "custom",
      keys: keys,
    };
    try {
      const response = await axios.post(url, dataToSend);

      if (response.status === 200 && response.data.status === "ok") {
        console.log("Spotmini POST API 테스트 성공", response);
        setIsOn((prevState) => {
          const updatedStatus = [...prevState];
          updatedStatus[index] = {
            ...updatedStatus[index],
            status: !updatedStatus[index].status,
          };
          return updatedStatus;
        });
      } else {
        console.error("Spotmini POST API 호출 실패", response.data);
        setErrorMessage(`${name}가 작동하지 않습니다.`);
        setShowPopup(true);
      }
    } catch (error) {
      console.log("Spotmini POST API 에러", error);
      setErrorMessage(`${name}가 작동하지 않습니다.`);
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
                onClick={() => sendSPOTMiniControl(idx)}
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
