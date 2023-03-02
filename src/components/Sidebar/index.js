import { Fragment, memo } from "react";
import { NavLink } from "react-router-dom";
import { dashboardNavigation } from "../../navigations";
import "./index.css";
import NotifiDot from "./notifiDot";
const Index = () => {
  return (
    <div className="pcb-sidebar">
      <div className="pcb-sider-logo w-full text-center py-4">
        <ul className="pcb-menu">
          {dashboardNavigation?.map((nav, index) => {
            const Icon = nav.icon || Fragment;
            const RightIcon = nav.rightIcon || Fragment;

            return (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  `pcb-menu-item ${isActive ? "active" : ""}`
                }
                to={nav.url}
              >
                {({ isActive }) => {
                  return (
                    <>
                      <Icon fill={isActive ? "#ff2e63" : "#343A40"} />
                      <span className=" nav-text text-start">{nav.name}</span>
                      {nav.name === "notifications" && <NotifiDot />}
                      <RightIcon
                        className="rightIcon"
                        fill={isActive ? "#ff2e63" : "#343A40"}
                      />
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default memo(Index);
