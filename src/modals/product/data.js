export const dynamicData = (type, product) => {
  const componentBlocks = [
    {
      name: "componentInterfaceOne",
      label: "component interface-1",
      options: [
        {
          label: "spi",
          value: "spi",
        },
        {
          label: "i2c",
          value: "i2c",
        },
        {
          label: "uart",
          value: "uart",
        },
        {
          label: "ethernet",
          value: "ethernet",
        },
        {
          label: "can-bus",
          value: "canBus",
        },
        {
          label: "disc.i/o",
          value: "discIO",
        },
        {
          label: "analog input",
          value: "analogInput",
        },
        {
          label: "usb",
          value: "usb",
        },
      ],
    },

    {
      name: "componentInterfaceTwo",
      label: "component interface-2",
      options: [
        {
          label: "spi",
          value: "spi",
        },
        {
          label: "i2c",
          value: "i2c",
        },
        {
          label: "uart",
          value: "uart",
        },
        {
          label: "ethernet",
          value: "ethernet",
        },
        {
          label: "can-bus",
          value: "canBus",
        },
        {
          label: "disc.i/o",
          value: "discIO",
        },
        {
          label: "analog input",
          value: "analogInput",
        },
        {
          label: "usb",
          value: "usb",
        },
      ],
    },
    {
      name: "componentInterfaceThree",
      label: "component interface-3",
      options: [
        {
          label: "spi",
          value: "spi",
        },
        {
          label: "i2c",
          value: "i2c",
        },
        {
          label: "uart",
          value: "uart",
        },
        {
          label: "ethernet",
          value: "ethernet",
        },
        {
          label: "can-bus",
          value: "canBus",
        },
        {
          label: "disc.i/o",
          value: "discIO",
        },
        {
          label: "analog input",
          value: "analogInput",
        },
        {
          label: "usb",
          value: "usb",
        },
      ],
    },
    {
      name: "componentInterfaceFour",
      label: "component interface-4",
      options: [
        {
          label: "spi",
          value: "spi",
        },
        {
          label: "i2c",
          value: "i2c",
        },
        {
          label: "uart",
          value: "uart",
        },
        {
          label: "ethernet",
          value: "ethernet",
        },
        {
          label: "can-bus",
          value: "canBus",
        },
        {
          label: "disc.i/o",
          value: "discIO",
        },
        {
          label: "analog input",
          value: "analogInput",
        },
        {
          label: "usb",
          value: "usb",
        },
      ],
    },
  ];
  const selectOptions = [
    {
      name: "blockType",
      label: "Block Type",
      disabled: product ? true : false,
      options: [
        {
          label: "mcu",
          value: "mcu",
        },
        {
          label: "component",
          value: "component",
        },
      ],
    },
    {
      name: "category",
      label: "category",

      options: [
        {
          label: "mcu",
          value: "mcu",
        },
        {
          label: "wireless",
          value: "wireless",
        },
        {
          label: "sensor",
          value: "sensor",
        },
        {
          label: "interface",
          value: "interface",
        },

        {
          label: "misc",
          value: "misc",
        },
        {
          label: "mixed signal",
          value: "mixed-signal",
        },
        {
          label: "memory",
          value: "memory",
        },
        {
          label: "motor drivers",
          value: "motor-drivers",
        },
        {
          label: "audio voice",
          value: "audio-voice",
        },
        {
          label: "data acq",
          value: "data-acq",
        },
        {
          label: "clock timing",
          value: "clock-timing",
        },
        {
          label: "power management",
          value: "power-management",
        },
      ],
    },
    {
      name: "externalConnectorPin",
      label: "external connector allocated pin no",

      options: [...Array(3).keys()].map((i) => {
        return {
          label: i + 1,
          value: i + 1,
        };
      }),
    },
    {
      name: "supplyVoltageOne",
      label: "supply voltage-1",

      options: [
        {
          label: "1.2",
          value: "1.2",
        },
        {
          label: "1.8",
          value: "1.8",
        },
        {
          label: "3.3",
          value: "3.3",
        },
        {
          label: "5.0",
          value: "5.0",
        },
      ],
    },
    {
      name: "supplyVoltageTwo",
      label: "supply voltage-2",

      options: [
        {
          label: "1.2",
          value: "1.2",
        },
        {
          label: "1.8",
          value: "1.8",
        },
        {
          label: "3.3",
          value: "3.3",
        },
        {
          label: "5.0",
          value: "5.0",
        },
      ],
    },
    {
      name: "supplyVoltageThree",
      label: "supply voltage-3",

      options: [
        {
          label: "1.2",
          value: "1.2",
        },
        {
          label: "1.8",
          value: "1.8",
        },
        {
          label: "3.3",
          value: "3.3",
        },
        {
          label: "5.0",
          value: "5.0",
        },
      ],
    },
  ];

  const componentValues = [
    {
      name: "partNumber",
      label: "part number",
      type: "text",
      min: 0,

      maxLength: 20,
    },
    {
      name: "subCategory",
      label: "sub category",
      type: "text",
      min: 0,
      maxLength: 15,
      as: "textarea",
      row: 2,
    },
    {
      name: "description",
      label: "description",
      type: "text",
      as: "textarea",
      min: 0,
      max: 20,
      row: 2,
      maxLength: 100,
    },
    {
      name: "manufacturer",
      label: "manufacturer",
      max: 18,
      maxLength: 18,
    },
    {
      name: "price",
      label: "price",
      type: "number",
      min: 0,
    },
    {
      name: "datasheetLink",
      label: "datasheet link",
    },

    {
      name: "powerDissipation",
      label: "power dissipation (mW)",
      type: "number",
      max: 5,
      maxLength: 5,
    },
  ];

  const mcuValues = [
    {
      name: "partNumber",
      label: "part number",
      type: "text",
      min: 0,

      maxLength: 20,
    },
    {
      name: "subCategory",
      label: "sub category",
      type: "text",
      min: 0,
      max: 15,
      as: "textarea",
      row: 2,

      maxLength: 15,
    },
    {
      name: "description",
      label: "description",
      type: "text",
      as: "textarea",
      min: 0,
      max: 100,
      row: 2,
      maxLength: 100,
    },
    {
      name: "manufacturer",
      label: "manufacturer",
      type: "text",
      min: 0,
      max: 18,
      maxLength: 18,
    },
    {
      name: "price",
      label: "price",
      type: "number",
      min: 0,
    },
    {
      name: "spi",
      label: "spi",
      type: "number",
      min: 0,
      max: 2,
      maxLength: 2,
    },
    {
      name: "i2c",
      label: "i2c",
      type: "number",
      max: 2,
      min: 0,

      maxLength: 2,
    },
    {
      name: "uart",
      label: "uart",
      type: "number",
      max: 2,
      min: 0,

      maxLength: 2,
    },
    {
      name: "canBus",
      label: "can-bus",
      type: "number",
      max: 2,
      min: 0,

      maxLength: 2,
    },
    {
      name: "discreteIO",
      label: "discrete i/o",
      type: "number",
      max: 2,
      min: 0,

      maxLength: 2,
    },
    {
      name: "analogInput",
      label: "analog input",
      type: "number",
      max: 2,
      min: 0,

      maxLength: 2,
    },
    {
      name: "ethernet",
      label: "ethernet",
      type: "number",
      max: 2,
      min: 0,

      maxLength: 2,
    },
    {
      name: "datasheetLink",
      label: "datasheet link",
      type: "text",
    },
    {
      name: "powerDissipation",
      label: "power dissipation (mW)",
      type: "number",
      max: 5,
      min: 0,

      maxLength: 5,
    },
  ];
  const selectdata =
    type === "component"
      ? selectOptions.concat(componentBlocks)
      : selectOptions;
  const inputData = type === "component" ? componentValues : mcuValues;

  return { selectdata, inputData };
};
