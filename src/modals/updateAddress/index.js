import { City, State } from "country-state-city";
import { Formik } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Select, { components } from "react-select";
import { LinesIcons } from "../../assets";
import { updateAddressById } from "../../redux/auth/action";
import { addAddressValidation } from "../../validations";

function Index({ show, onHide, address }) {
  const handleSubmit = (values, formActions) => {
    dispatch(updateAddressById(values, address._id, stopLoader(formActions)));
  };
  const stopLoader = (formActions) => () => {
    formActions.setSubmitting(false);

    onHide();
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <LinesIcons />
      </components.DropdownIndicator>
    );
  };
  const [countries, setCountries] = React.useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    fetch("/static-data/countries.json").then((res) => {
      res.json().then((data) => {
        let newCountries = data.countries.map((e) => {
          return {
            ...e,
            key: Object.keys(data.codes).find((a) => {
              if (data.codes[a] === e?.name) {
                return a;
              }
              return null;
            }),
          };
        });
        const finalCountries = newCountries.filter((e) => e.key !== undefined);
        setCountries(finalCountries);
      });
    });
  }, []);

  const countriesOptions = useMemo(() => {
    return countries.map((country) => {
      return {
        value: country.name,
        label: country.name,
      };
    });
  }, [countries]);

  const phoneCodeOptions = useMemo(() => {
    return countries.map((country) => {
      return {
        value: country.name,
        label: (
          <div className="phoneNumber-code">
            <img
              src={`https://countryflagsapi.com/png/${country.key}`}
              alt={country.name}
            />
            {country.key} ({country.code})
          </div>
        ),
      };
    });
  }, [countries]);
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const stateOptions = useMemo(() => {
    return State.getStatesOfCountry(
      countries.find((e) => e?.name === selectedCountry)?.key
    ).map((state) => {
      return {
        value: state.name,
        label: state.name,
      };
    });
  }, [selectedCountry, countries]);
  const [phoneCode, setPhoneCode] = React.useState(null);
  const cityOptions = useMemo(() => {
    return City.getCitiesOfState(
      countries.find((e) => e?.name === selectedCountry)?.key,
      selectedState?.isoCode
    ).map((state) => {
      return {
        value: state.name,
        label: state.name,
      };
    });
  }, [selectedCountry, countries, selectedState]);
  useEffect(() => {
    if (address.phoneCode && countries.length > 0) {
      let finded = countries.find((e) => e?.code === address.phoneCode);
      setPhoneCode({
        value: finded?.name,
        label: (
          <div className="phoneNumber-code">
            <img
              src={`https://countryflagsapi.com/png/${finded.key}`}
              alt={finded.name}
            />
            {finded.key} ({finded.code})
          </div>
        ),
      });
    }
    if (address.country) {
      setSelectedCountry(address.country);
    }
    if (address.state) {
      let setState = State.getAllStates();

      setSelectedState(
        setState.find((state) => {
          return state.name === address.state;
        })
      );
    }
  }, [address, countries]);
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          update delivery address
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{
            name: address.name || "",
            phone: address.phone || "",
            addressOne: address.addressOne || "",
            addressTwo: address.addressTwo || "",
            city: address.city || "",
            state: address.state || "",
            country: address.country || "",
            phoneCode: address.phoneCode || "",
            zipCode: address.zipCode || "",
          }}
          validationSchema={addAddressValidation}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="login-form gap-4 d-flex flex-column "
            >
              <Form.Group>
                <Form.Label className="m-0 address-lable ">
                  full name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="bg-transparent"
                  placeholder="enter your name"
                />

                <Form.Text className="text-danger text-lowercase check error">
                  {errors.name && touched.name && errors.name}
                </Form.Text>
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label className="m-0 address-lable ">
                  phone number<span className="text-danger">*</span>
                </Form.Label>
                <div className="d-flex gap-3 ">
                  <div
                    style={{
                      width: "300px",
                    }}
                  >
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
                      value={phoneCode}
                      onChange={(e) => {
                        console.log(e);
                        setFieldValue(
                          "phoneCode",
                          countries.find((a) => a.name === e.value).code
                        );
                        setPhoneCode(e);
                        setFieldValue("phone", "");
                      }}
                      options={phoneCodeOptions}
                    />
                  </div>

                  <Form.Control
                    type="number"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    className="bg-transparent "
                    placeholder="enter your number"
                  />
                </div>
                <Form.Text className="text-danger text-lowercase check error">
                  {(errors.phoneCode &&
                    touched.phoneCode &&
                    errors.phoneCode) ||
                    (errors.phone && touched.phone && errors.phone)}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label className="m-0 address-lable ">
                  address line 1<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="addressOne"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.addressOne}
                  className="bg-transparent"
                  placeholder="enter your address"
                />

                <Form.Text className="text-danger text-lowercase check error">
                  {errors.addressOne && touched.addressOne && errors.addressOne}
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label className="m-0 address-lable ">
                  address line 2
                </Form.Label>
                <Form.Control
                  type="text"
                  name="addressTwo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.addressTwo}
                  className="bg-transparent"
                  placeholder="enter your address"
                />

                <Form.Text className="text-danger text-lowercase check error">
                  {errors.addressTwo && touched.addressTwo && errors.addressTwo}
                </Form.Text>
              </Form.Group>
              <div className="d-flex gap-4 ">
                <Form.Group className="w-50">
                  <Form.Label className="m-0 address-lable ">
                    country<span className="text-danger">*</span>
                  </Form.Label>
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
                    value={countriesOptions.find(
                      (a) => a.value === values.country
                    )}
                    onChange={(e) => {
                      setFieldValue("country", e.value);
                      setFieldValue("state", "");
                      setSelectedCountry(e.value);
                    }}
                    options={countriesOptions}
                  />
                  <Form.Text className="text-danger text-lowercase check error">
                    {errors.country && touched.country && errors.country}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="w-50">
                  <Form.Label className="m-0 address-lable ">
                    state/province/region
                    <span className="text-danger">*</span>
                  </Form.Label>
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
                    value={stateOptions.find((state) => {
                      return state.value === values.state;
                    })}
                    onChange={(e) => {
                      let setState = State.getAllStates();
                      setFieldValue("state", e.value);
                      setFieldValue("city", "");
                      setSelectedState(
                        setState.find((state) => {
                          return state.name === e.value;
                        })
                      );
                    }}
                    options={stateOptions}
                  />

                  <Form.Text className="text-danger text-lowercase check error">
                    {errors.state && touched.state && errors.state}
                  </Form.Text>
                </Form.Group>
              </div>
              <div className="d-flex gap-4 ">
                <Form.Group className="w-50">
                  <Form.Label className="m-0 address-lable ">
                    city<span className="text-danger">*</span>
                  </Form.Label>
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
                    value={cityOptions.find((city) => {
                      return city.value === values.city;
                    })}
                    onChange={(e) => {
                      setFieldValue("city", e.value);
                    }}
                    options={cityOptions}
                  />

                  <Form.Text className="text-danger text-lowercase check error">
                    {errors.city && touched.city && errors.city}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="w-50">
                  <Form.Label className="m-0 address-lable ">
                    zipcode
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zipCode}
                    className="bg-transparent"
                    placeholder="enter your zipcode"
                  />

                  <Form.Text className="text-danger text-lowercase check error">
                    {errors.zipCode && touched.zipCode && errors.zipCode}
                  </Form.Text>
                </Form.Group>
              </div>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-100 rounded-3 buttons"
                variant="danger"
              >
                {isSubmitting ? (
                  <div className=" d-flex justify-content-center  align-items-center ">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span>please wait...</span>
                  </div>
                ) : (
                  "use this address"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default memo(Index);
