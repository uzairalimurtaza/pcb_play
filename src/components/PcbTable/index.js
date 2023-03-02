import { Empty, Spin } from "antd";
import React, { memo } from "react";
import "./index.css";
function Index({ data, labels = [], dataRender, loader }) {
  return (
    <div className="w-100">
      <table className={` table-fixed w-100  bg-white  `}>
        <thead className="component-table-thead ">
          <tr>
            {labels.map((lable, index) => (
              <th key={index}>{lable}</th>
            ))}
          </tr>
        </thead>
      </table>
      <Spin spinning={loader}>
        <div className="table-scroll ">
          {data?.length > 0 ? (
            <table className={` table-fixed w-100  bg-white  `}>
              <tbody className="component-table-tbody">
                {data.map((item, index) => {
                  return dataRender?.({ item, index });
                })}
              </tbody>
            </table>
          ) : (
            <Empty description="No orders found" />
          )}
        </div>
      </Spin>
    </div>
  );
}

export default memo(Index);
