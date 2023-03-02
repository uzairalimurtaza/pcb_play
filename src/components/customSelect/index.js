import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LinesIcons } from "../../assets";
import { getAllCategorysOptions } from "../../redux/dashboard/action";
import "./index.css";
function Index({
  options,
  onChange,
  value,
  name,
  label,
  disabled,
  active,
  setActive,
}) {
  const [toggle, setToggle] = React.useState(false);
  const [newOptions, seNewOptions] = React.useState([]);
  const toggleDropDown = (e) => {
    if (disabled) {
      return;
    }
    if (toggle) {
      setActive?.(null);
    } else {
      setActive?.(name);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (name === "category") {
      dispatch(
        getAllCategorysOptions((data) => {
          seNewOptions(
            data?.map((e) => {
              return {
                value: e._id,
                label: e.name,
              };
            })
          );
        })
      );
      return;
    }
    seNewOptions(options);
  }, [dispatch, name, options]);

  useEffect(() => {
    if (active === name) {
      setToggle(true);

      return;
    }
    setToggle(false);
  }, [name, active, toggle, setActive]);

  window.addEventListener("click", (e) => {
    if (e.target.className === "custom-select-box") {
      return;
    }

    setActive?.(null);
  });
  return (
    <div>
      <label htmlFor="custom-select-value">{label}</label>
      <button
        className=" p-0 m-0 pcb-select-btn w-100 "
        onClick={toggleDropDown}
      >
        <div
          id={name}
          style={
            disabled
              ? {
                  backgroundColor: "white",
                }
              : {}
          }
          className="custom-select-box"
        >
          <div
            className="custom-select-info me-4"
            style={{
              pointerEvents: "none",
              minWidth: "30px",
            }}
          >
            <span>
              {name === "category"
                ? newOptions?.find((e) => e.value === value)?.label || "N/A"
                : value || "N/A"}
            </span>
          </div>

          {!disabled && (
            <LinesIcons id={`custom-select-${name}`} className=" flex" />
          )}
          {newOptions?.length > 0 && (
            <div className={`pcb-select-dropdown ${toggle ? "show" : ""} `}>
              <div className="pcb-select-dropdown-box">
                {newOptions?.map((option, index) => (
                  <div
                    id={`click-btn-${name}`}
                    onClick={() => {
                      let newValue = {
                        value: option.value,
                        name,
                      };
                      onChange(newValue);
                      setToggle(false);
                    }}
                    className={`pcb-select-dropdown-item ${
                      option?.value === value ? "active" : ""
                    } `}
                    key={index}
                  >
                    {option?.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
export default memo(Index);
