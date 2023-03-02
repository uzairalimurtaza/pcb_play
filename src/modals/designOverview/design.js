import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";

function Index() {
  const { cart } = useSelector((state) => state.dashboard);
  const cartItems = useMemo(() => {
    return cart?.items || [];
  }, [cart]);
  const mcu = cartItems.find((item) => item.blockType === "mcu");
  if (!mcu) {
    return null;
  }
  const components =
    cartItems.filter((item) => item.blockType === "component") || [];
  const length = components?.length;

  return (
    <div
      style={{
        minHeight: "300px",
        overflow: "auto",
        height: length * 200 + "px",
      }}
      className="design-overview-container"
    >
      <div className="design-overview-power-io">power input & jtag</div>
      <div className="design-overview-mcu-container">
        <div
          style={{
            minHeight: "80px",
            height: length * 12 + "px",
          }}
          className="design-overview-mcu"
        >
          <p className="m-0">{mcu?.partNumber}</p>
          <span>mcu </span>
          <span>1 qty </span>
        </div>
        {components.map((component, index, arr) => {
          return (
            <>
              <div
                style={{
                  top: index % 2 === 0 && 0,
                  bottom: index % 2 !== 0 && 0,
                  transform: `translateY(${index % 2 === 0 ? "-" : "+"}${
                    (index + 1) * 110 - Math.floor((index + 1) / 2) * 110
                  }%)`,
                }}
                className={`design-overview-component  design-overview-component-${
                  index + 1
                }`}
              >
                <p className="m-0">{component?.partNumber}</p>
                <span>{component?.subCategory}</span>
                <span>{component?.quantity} qty </span>
                {component?.externalConnectorPin && (
                  <div className="pcb-connector" />
                )}
              </div>

              {(index + 1) % 2 !== 0 ? (
                <div
                  className={`component-line ${`interface-${component?.inter}`} `}
                  style={{
                    top: 0,

                    transformOrigin: "bottom",
                    bottom: index * 30,
                    transform: `translate(-${
                      index + 1 === 1 ? (index + 1) * 620 : (index + 1) * 420
                    }% ,${
                      -80 +
                      index * (arr.length > 8 ? (arr.length > 11 ? 5 : 4) : 4)
                    }%) scaleY(${
                      index + 1 - Math.floor((index + 1) / 2) - 0.2
                    })`,
                  }}
                />
              ) : (
                <div
                  className={`component-line ${`interface-${component?.inter}`} `}
                  style={{
                    transformOrigin: "top",
                    bottom: 0,
                    transform: `translate(-${
                      index === 1 ? (index + 1) * 420 : (index + 1) * 420
                    }% ,${
                      80 -
                      index * (arr.length > 8 ? (arr.length > 12 ? 5 : 4) : 3)
                    }%)  scaleY(${
                      index + 1 - Math.floor((index + 1) / 2) - 0.2
                    })`,
                  }}
                />
              )}
            </>
          );
        })}
      </div>
      <div className="design-overview-hc">header connector</div>
    </div>
  );
}

export default memo(Index);
