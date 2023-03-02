import React, { Fragment, memo } from "react";
import {
  AllegroMicroSystemslogo,
  AnalogDevicesIcon,
  DiodesIcon,
  InfineonIcon,
  MaximIntegratedIcon,
  MicroChipIcon,
  NXPSemiconductorsIcon,
  STMicroelectronicsIcon,
  TdkCorporationIcon,
  TEConnectivityIcon,
  TexasInstruments,
} from "../../assets";
import "./index.css";
const LogoSliders = [
  {
    icon: AllegroMicroSystemslogo,
  },
  {
    icon: AnalogDevicesIcon,
  },
  {
    icon: InfineonIcon,
  },
  {
    icon: MaximIntegratedIcon,
  },
  {
    icon: DiodesIcon,
  },
  {
    icon: NXPSemiconductorsIcon,
  },
  {
    icon: STMicroelectronicsIcon,
  },
  {
    icon: TdkCorporationIcon,
  },
  {
    icon: TEConnectivityIcon,
  },
  {
    icon: MicroChipIcon,
  },
  {
    icon: TexasInstruments,
  },
];
function Index() {
  return (
    <div class="slider">
      <div class="slide-track gap-5 ">
        {LogoSliders.map((item, index) => {
          const Icon = item.icon || Fragment;
          return (
            <div class="slide">
              <Icon width={150} fill="#979797" height={150} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Index);
