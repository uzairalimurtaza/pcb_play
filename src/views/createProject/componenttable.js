import { Empty } from "antd";
import { memo } from "react";
import { Row, Spinner } from "react-bootstrap";
import ComponentRow from "./componentRow";
import Item from "./item";
function Index({ components, loader }) {
  return (
    <>
      <table
        data-tut="tour-step-2"
        className={` table-fixed d-none d-md-table d-lg-table  w-100 `}
      >
        <thead className="component-table-thead ">
          <tr
            style={{
              zIndex: 99,

              position: "relative",
            }}
          >
            <th>part number</th>

            <th>sub category</th>
            <th className="description">description</th>
            <th>manufacturer</th>
            <th>price</th>
            <th>add to cart</th>
          </tr>
        </thead>
        {!loader && (
          <>
            {components?.length > 0 && (
              <tbody className="component-table-tbody">
                {components
                  ?.sort((a, b) => Number(b.createdAt) > Number(a.createdAt))
                  .map((component, index) => (
                    <ComponentRow component={component} key={index} />
                  ))}
              </tbody>
            )}
          </>
        )}
      </table>

      {components?.length <= 0 && (
        <div className="h-75 mx-auto d-flex">
          <Empty className="m-auto" description="components not found" />
        </div>
      )}
      {loader && (
        <div className="mx-auto d-flex  h-50">
          <Spinner className="m-auto" animation="grow" variant="danger" />
        </div>
      )}

      <Row
        className="d-block d-md-none d-lg-none"
        style={{
          overflow: "hidden !important",
        }}
      >
        {components.map((component, index) => (
          <Item component={component} />
        ))}
      </Row>
    </>
  );
}

export default memo(Index);
