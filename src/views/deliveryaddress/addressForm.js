import { Formik } from "formik";
import React, { memo, useEffect, useMemo } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { addAddressValidation } from "../../validations";
import Select, { components } from "react-select";
import { LinesIcons } from "../../assets";
import { City, State } from "country-state-city";
import { useDispatch } from "react-redux";
import { addUserAddress } from "../../redux/auth/action";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <LinesIcons />
    </components.DropdownIndicator>
  );
};
function Index({
  onSubmitCallBack,
  severity,
  setSeverity,
  showSnackBar,
  setSnackBar,
  message,
  setMessage,
}) {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("");

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
            {country.name} ({country.code})
          </div>
        ),
      };
    });
  }, [countries]);

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

  const [selectedState, setSelectedState] = React.useState("");

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

  const stopLoader = (formAction) => (response) => {
    console.log(response);
    if (response.success) {
      setSeverity("success");
      setMessage("Delivery address added successfully!");
      setSnackBar(!showSnackBar);
    } else {
      setSeverity("error");
      setMessage(
        response.errors
          ? response.errors[0].title
          : "Something went wrong while adding delivery address!"
      );
      setSnackBar(!showSnackBar);
    }
    formAction.setSubmitting(false);
    formAction.resetForm();
    onSubmitCallBack?.();
  };
  const dispatch = useDispatch();
  const loginHandler = (values, formAction) => {
    dispatch(addUserAddress(values, stopLoader(formAction)));
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          addressOne: "",
          addressTwo: "",
          city: "",
          state: "",
          country: "",
          phoneCode: "",
          zipCode: "",
        }}
        onSubmit={loginHandler}
        validationSchema={addAddressValidation}
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
                    return state.name === values.state;
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
            <Form.Group className="my-2">
              <Form.Label className="m-0 address-lable ">
                phone number
              </Form.Label>
              <div className="d-flex gap-3 ">
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
                    onChange={(e) => {
                      setFieldValue(
                        "phoneCode",
                        countries.find((a) => a.name === e.value).code
                      );
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
                {(errors.phoneCode && touched.phoneCode && errors.phoneCode) ||
                  (errors.phone && touched.phone && errors.phone)}
              </Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-end gap-4">
              <Button onClick={onSubmitCallBack} variant="outline-primary">
                cancel
              </Button>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="rounded-3 "
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
                    <span>saving...</span>
                  </div>
                ) : (
                  "save"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default memo(Index);
