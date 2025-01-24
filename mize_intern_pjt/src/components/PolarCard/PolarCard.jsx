import * as Styled from "./PolarCard_style";
import Card from "../Card/Card";
import lightbulb from "../../assets/lightbulb.png";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

export default function PolarCard({ data, name, agt, me }) {
  // P3가 있으면 2구, 없으면 1구
  const isDual = data.P3 !== undefined;

  // 얕은 비교 떄문에 새로 배열 생성
  const [isOn, setIsOn] = useState(
    isDual
      ? [
          { subName: "스위치1", state: data.P1?.val === 1 },
          { subName: "스위치2", state: data.P2?.val === 1 },
        ]
      : [{ subName: "스위치1", state: data.P1?.val === 1 }]
  );
  const [showPopup, setShowPopup] = useState(false); // 에러 팝업 표시 여부
  const [errorMessage, setErrorMessage] = useState(""); // API 연결 안됳 시 에러메시지

  // data가 변경될 때(사용자가 직접 끄고 킬 떄) isOn 업데이트
  // React가 참조 변경을 감지하도록
  useEffect(() => {
    const updatedState = isDual
      ? [
          { subName: "스위치1", state: data.P1?.val === 1 },
          { subName: "스위치2", state: data.P2?.val === 1 },
        ]
      : [{ subName: "스위치1", state: data.P1?.val === 1 }];
    setIsOn(updatedState);
  }, [data, isDual]);

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
    const url = import.meta.env.VITE_API_POST_PLUG_POLAR;
    const targetSwitch = index === 0 ? "P1" : "P2"; // 대상 스위치 결정
    const newState = !isOn[index].state; // 현재 상태의 반대로
    const type = newState ? "0x81" : "0x80";
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

        updateSwitchState(index, newState);
      } else {
        console.error("전등 POST API 호출 실패", response.data);
        setErrorMessage(`${name}이 작동하지 않습니다.`);
        setShowPopup(true);
      }
    } catch (error) {
      console.log("전등 POST API 에러", error);
      setErrorMessage(`${name}이 작동하지 않습니다.`);
      setShowPopup(true);
    }
  };

  // 팝업 닫기
  const handlePopupClose = useCallback(() => {
    setShowPopup(false);
    setErrorMessage("");
  }, []);

  // 켜진 버튼 수 계산
  const countActivePolar = isOn.filter((polar) => polar.state).length;

  return (
    <>
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
                <Styled.Icon src={lightbulb} alt={polar.subName} />
              </Styled.Button>
              <Styled.IconText>{polar.subName}</Styled.IconText>
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
