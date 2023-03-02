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
                You can change the project name. The name will be ‘my project’
                in default.
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
                board dimensions Set the width and length of the pcb board or
                leave it to us to optimize.
                <br />
                <br />
                We recommend setting a custom length and/or width after all your
                components have been chosen since choosing a custom size can
                limit the amount of components that you can add to your board.
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
                Assembly Side(s) Components can be populated either on a single
                side or both sides as per the selection. Select both sides if
                more board space is needed.
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
                Standoff Holes By default, boards are drilled for standard
                mounting "standoff" holes. Deselecting standoff holes enable
                more space to place additional components.
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(Index);
