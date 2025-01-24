import * as Styled from "./Devices_style";
import PlugCard from "../../../components/PlugCard/PlugCard";
import PresenceSensorCard from "../../../components/PresenceSensorCard/PresenceSensorCard";
import PolarCard from "../../../components/PolarCard/PolarCard";
import SPOTMiniCard from "../../../components/SPOTMiniCard/SPOTMiniCard";
import EnvironmentalSensorCard from "../../../components/EnvironmentalSensorCard/EnvironmentalSensorCard";

export default function Devices({ devices }) {
  // 컴포넌트 매칭
  const componentInfo = {
    SL_SC_BE: EnvironmentalSensorCard,
    "ZG#TS06012": PresenceSensorCard,
    SL_OE_DE: PlugCard,
    SL_SW_ND1: PolarCard,
    SL_SW_ND2: PolarCard,
    SL_P_IR: SPOTMiniCard,
    V_SI_V1: null,
  };

  return (
    <Styled.Wrapper>
      {/* devices 돌면서 렌더링 */}
      {devices.map((device, deviceidx) => {
        // device.type에 따라 다른 컴포넌트 렌더링
        const Component = componentInfo[device.devtype];

        // 없는 장비는 렌더링 안함
        if (!Component) return null;

        return (
          <Component
            key={deviceidx}
            name={device.name}
            agt={device.agt}
            data={device.data}
            me={device.me}
          />
        );
      })}
    </Styled.Wrapper>
  );
}
