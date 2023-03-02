import React, { memo } from "react";
import { FaStar } from "react-icons/fa";
import { BlubIcon } from "../../assets";

function Index() {
  return (
    <div>
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
                In order to start the design, a controller must be selected at
                first.
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
                Then any product from different categories can be added to the
                cart.
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(Index);
