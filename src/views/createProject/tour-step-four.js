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
                2, 3 or 5 qty boards can be ordered over the dropdown menu.
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
                The design fee varies depending on the following parameters;
                <br />
                pcb board size,
                <br />
                pcb board order quantity
                <br />
                component assembly side(s)
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(Index);
