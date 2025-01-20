import * as Styled from "./PolarCard_style";
import Card from "../Card/Card";
import lightbulb from "../../assets/lightbulb.png";
import { useState } from "react";
import axios from "axios";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

export default function PolarCard({ data, name, agt, me }) {
  // P3가 있으면 2구, 없으면 1구구
  const isDual = data.P3 !== undefined;
  // 1구 2구에 따라 분리
  const initalState = isDual
    ? [
        { subName: "스위치1", state: data.P1?.val === 1 },
        { subName: "스위치2", state: data.P3?.val === 1 },
      ]
    : [{ subName: "스위치1", state: data.P1?.val === 1 }];

  const [isOn, setIsOn] = useState(initalState);
  const [showPopup, setShowPopup] = useState(false); // 에러 팝업 표시 여부
  const [errorMessage, setErrorMessage] = useState(""); // API 연결 안됳 시 에러메시지

  // // status 관리
  // // 해당 번호의 status를 바꿈
  // const handleButton = (index) => {
  //   setIsOn((prevState) => {
  //     const updatedStates = [...prevState];
  //     updatedStates[index] = {
  //       ...updatedStates[index],
  //       state: !updatedStates[index].state,
  //     };
  //     return updatedStates;
  //   });
  // };

  // API 연결
  //   const handleToggle = async (index) => {
  //     const targetSwitch = index === 0 ? "P1" : "P2"; // 대상 스위치 결정

  //     try {
  //       // API 호출
  //       // API 주소 뒤에 P1, P2 붙이는 걸로로
  //       const response = await fetch(`/api/device/${me}/polar`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({}),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to toggle switch");
  //       }

  //       // 상태 업데이트
  //       handleButton(index);
  //     } catch (error) {
  //       console.error("Error toggling switch:", error);
  //     }
  //   };

  // 상태 업데이트
  const updateSwitchState = (index, newState) => {
    setIsOn((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = {
        ...updatedStates[index],
        state: newState,
      };
      return updatedStates;
    });
  };

  // Polar on/off API
  const sendPolarControl = async (index) => {
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
        console.log("전등 POST API 테스트 성공", response.data);

        // 상태 업데이트 5초마다 + 즉각 반영
        updateSwitchState(index, newState);
      } else {
        console.error("전등 POST API 호출 실패", response.data);
        setErrorMessage("전등이 작동하지 않습니다.");
        setShowPopup(true);
      }
    } catch (error) {
      console.log("전등 POST API 에러", error);
      setErrorMessage("전등이 작동하지 않습니다.");
      setShowPopup(true);
    }
  };

  // 켜진 버튼 수 계산
  const countActivePolar = isOn.filter((polar) => polar.state).length;

  return (
    <Card
      placeText={name}
      firstStateText={countActivePolar}
      secondStateText={countActivePolar > 0 ? "켜짐" : "꺼짐"}
    >
      <Styled.Top>
        {isOn.map((polar, idx) => (
          <Styled.ButtonContainer key={idx}>
            <Styled.Button
              onClick={() => sendPolarControl(idx)}
              $isOn={polar.state}
            >
              {/* {showPopup && (
                <ErrorPopup
                  message={errorMessage}
                  onClose={() => setShowPopup(false)} // 팝업 닫기
                />
              )} */}
              <Styled.Icon src={lightbulb} alt={polar.subName} />
            </Styled.Button>
            <Styled.IconText>{polar.subName}</Styled.IconText>
          </Styled.ButtonContainer>
        ))}
      </Styled.Top>
    </Card>
  );
}
