import React, { memo } from "react";
import { FaStar } from "react-icons/fa";
import { BlubIcon } from "../../assets";

function Index() {
  return (
    <div
      style={{
        height: 150,
        overflowY: "auto",
      }}
    >
      <BlubIcon />

      <div className="my-3">
        <ul className="pcb-tour-list">
          <li>
            <p className="gap-2">
              <div>
                <FaStar
                  style={{
                    color: "#E11045",
                  }}
                />
              </div>
              <span>
                By clicking on the component row, you may get the extra features
                and datasheet.
              </span>
            </p>
          </li>
          <li>
            <p className="gap-2">
              <div>
                <FaStar
                  style={{
                    color: "#E11045",
                  }}
                />
              </div>
              <span>
                Some components may have quantity limitations while adding the
                cart.
              </span>
            </p>
          </li>
          <li>
            <p className="gap-2">
              <div>
                <FaStar
                  style={{
                    color: "#E11045",
                  }}
                />
              </div>
              <span>Warnings should be followed</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(Index);
