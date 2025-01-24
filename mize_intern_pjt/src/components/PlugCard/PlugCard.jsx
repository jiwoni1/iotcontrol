import React, { useState, useCallback } from "react";
import * as Styled from "./PlugCard_style";
import power from "../../assets/power.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import axios from "axios";
import Card from "../Card/Card";

export default function PlugCard({ name, agt, data, me }) {
  const status = data.P1.val;
  const consumption = data.P3.v.toFixed(1); // 소수점 첫째자리까지만 표시
  const formatNumber = (num) => {
    return num.toString().replace(/\.0+$/, "");
  }; //.0 일 때는 소수점 제거
  const [isOn, setIsOn] = useState(status);
  const [showPopup, setShowPopup] = useState(false); // 에러 팝업 표시 여부
  const [errorMessage, setErrorMessage] = useState(""); // API 연결 안됳 시 에러메시지

  // API 연결 전 용도
  const handleButtonChange = (e) => {
    const newState = !isOn;
    setIsOn(newState);
  };

  // Plug on/off API
  const sendPlugControl = async () => {
    const url = import.meta.env.VITE_API_POST_PLUG_POLAR;
    const targetSwitch = "P1";
    const newState = !isOn; // 현재 상태의 반대로
    const type = newState ? "1" : "0";
    const val = newState ? "1" : "0";
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
        console.log("Plug POST API 테스트 성공", response.data);
        setIsOn(newState);
      } else {
        console.error("Plug POST API 호출 실패", response.data);
        setErrorMessage(`${name}이 작동하지 않습니다.`);
        setShowPopup(true);
      }
    } catch (error) {
      console.log("Plug POST API 에러", error);
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
      <Card
        placeText={name}
        firstStateText={isOn ? "켜짐" : "꺼짐"}
        secondStateText={formatNumber(consumption) + "W"}
      >
        <Styled.Top>
          <Styled.Icon src={power} alt="Plug" />

          <Styled.Button onClick={sendPlugControl} $isOn={isOn}>
            <FontAwesomeIcon icon={faPowerOff} size="xl" color="white" />
          </Styled.Button>
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
