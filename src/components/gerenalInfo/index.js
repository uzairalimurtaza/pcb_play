import React, { memo, useEffect, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { components } from "react-select";
import { UploadIcon, LinesIcons } from "../../assets";
import { getAllCustomers } from "../../redux/dashboard/action";
import CustomSelect from "../customSelect";
import Select from "react-select";
const componentPlacementOptions = [
  {
    label: "top",
    value: "top",
  },
  {
    label: "both",
    value: "both",
  },
];

const pcbHolesOptions = [
  {
    label: "yes",
    value: "yes",
  },
  {
    label: "no",
    value: "no",
  },
];

const identicalComponentsOptions = [
  {
    label: "yes",
    value: "yes",
  },
  {
    label: "no",
    value: "no",
  },
];
function Index({ newGeneralInfo, onChange }) {
  const [active, setActive] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    onChange({ ...newGeneralInfo, [name]: value });
  };
  const dispatch = useDispatch();
  const [customersOptions, setCustomersOptions] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loader, setLoader] = useState(false);
  const stopLoader = (data) => {
    setLoader(false);
    if (data) {
      setCustomers(data);
      setCustomersOptions(
        data.map((e) => {
          return {
            value: e._id,
            label: e.userId,
          };
        })
      );
    }
  };
  useEffect(() => {
    setLoader(true);
    dispatch(getAllCustomers(stopLoader));
  }, [dispatch]);
  const customer = customers.find((e) => e._id === newGeneralInfo?.customerId);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <LinesIcons />
      </components.DropdownIndicator>
    );
  };
  return (
    <Row className="shadow-sm bg-white pcb-box ">
      <Col lg={12} className="pcb-box-header">
        <h6>general info</h6>
      </Col>
      <Col lg={12} className="pcb-box-body my-4 ">
        <Row>
          <Col
            lg={12}
            className="d-flex justify-content-between align-items-center "
          >
            <div className="w-50">
              <Select
                components={{
                  DropdownIndicator,
                }}
                styles={{
                  container: (base) => ({
                    ...base,
                    border: "none",
                  }),
                  indicatorSeparator: (base) => ({
                    display: "none",
                  }),
                  control: (base) => ({
                    ...base,
                    border: "1px solid #22621a",
                    borderRadius: "8px",
                    background: "#f2fff8",
                    padding: "3px 18px",
                  }),
                }}
                isSearchable
                placeholder="customer Id"
                isLoading={loader}
                onChange={(e) => {
                  onChange({ ...newGeneralInfo, customerId: e.value });
                }}
                value={customersOptions.find(
                  (e) => e.value === newGeneralInfo.customerId
                )}
                options={customersOptions}
              />
            </div>

            <Button
              variant={newGeneralInfo.img ? "danger" : "outline-primary"}
              className="  my-2 d-flex justify-content-center align-items-center p-0 "
            >
              <input
                multiple={false}
                type="file"
                id="file"
                name="img"
                hidden
                onChange={(e) => {
                  onChange({ ...newGeneralInfo, img: e.target.files[0] });
                }}
              />

              {newGeneralInfo.img ? (
                <label className="small-label p-2 w-100 h-100 d-flex justify-content-center align-items-center">
                  <UploadIcon
                    fill={newGeneralInfo.img && "white"}
                    className="me-3 flex"
                  />
                  uploaded
                </label>
              ) : (
                <label
                  style={{
                    cursor: "pointer",
                  }}
                  className="small-label p-2 w-100 h-100 d-flex justify-content-center align-items-center"
                  htmlFor="file"
                >
                  <UploadIcon
                    fill={newGeneralInfo.img && "white"}
                    className="me-3 flex"
                  />
                  upload design overview
                </label>
              )}
            </Button>
          </Col>
          <Col lg={12}>
            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">customer name</FormLabel>
              <div className="w-50">
                <FormControl
                  disabled
                  placeholder="customer name"
                  value={
                    customer
                      ? `${customer?.firstName} ${customer?.lastName}`
                      : ""
                  }
                />
              </div>
            </FormGroup>
            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">project name</FormLabel>
              <FormControl
                placeholder="project name"
                className="w-50"
                value={newGeneralInfo.projectName}
                name="projectName"
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">pcb standoff holes</FormLabel>

              <div className="w-50">
                <CustomSelect
                  value={newGeneralInfo?.pcbStandoffHoles}
                  active={active}
                  setActive={setActive}
                  name="pcbStandoffHoles"
                  onChange={handleChange}
                  options={pcbHolesOptions}
                />
              </div>
            </FormGroup>

            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">
                pcb board dimensions
              </FormLabel>

              <div className="w-50 d-flex gap-2">
                <FormControl
                  placeholder="width"
                  value={newGeneralInfo?.pcbBoardDimensions?.width}
                  name="width"
                  type="number"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    onChange({
                      ...newGeneralInfo,
                      pcbBoardDimensions: {
                        ...newGeneralInfo.pcbBoardDimensions,
                        [name]: value,
                      },
                    });
                  }}
                />
                <FormControl
                  value={newGeneralInfo?.pcbBoardDimensions?.height}
                  name="height"
                  placeholder="height"
                  type="number"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    onChange({
                      ...newGeneralInfo,
                      pcbBoardDimensions: {
                        ...newGeneralInfo.pcbBoardDimensions,
                        [name]: value,
                      },
                    });
                  }}
                />
              </div>
            </FormGroup>
            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">component placement</FormLabel>

              <div className="w-50">
                <CustomSelect
                  value={newGeneralInfo?.componentPlacement}
                  active={active}
                  setActive={setActive}
                  name="componentPlacement"
                  onChange={handleChange}
                  options={componentPlacementOptions}
                />
              </div>
            </FormGroup>
            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">
                identical components
              </FormLabel>

              <div className="w-50">
                <CustomSelect
                  value={newGeneralInfo?.identicalComponents}
                  active={active}
                  setActive={setActive}
                  name="identicalComponents"
                  onChange={handleChange}
                  options={identicalComponentsOptions}
                />
              </div>
            </FormGroup>
            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">component cost ($)</FormLabel>
              <FormControl
                type="number"
                placeholder="enter value"
                value={newGeneralInfo.componentCost}
                name="componentCost"
                onChange={handleChange}
                className="w-50"
              />
            </FormGroup>
            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">design fee ($)</FormLabel>
              <FormControl
                type="number"
                value={newGeneralInfo.designFee}
                name="designFee"
                placeholder="enter value"
                onChange={handleChange}
                className="w-50"
              />
            </FormGroup>
            <FormGroup className="flex justify-content-between align-items-center my-2">
              <FormLabel className="small-label">pcb board qty</FormLabel>

              <FormControl
                placeholder="enter value"
                value={newGeneralInfo.pcbBoardQty}
                name="pcbBoardQty"
                type="number"
                onChange={handleChange}
                className="w-50"
              />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default memo(Index);
