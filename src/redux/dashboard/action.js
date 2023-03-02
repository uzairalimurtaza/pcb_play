import * as constants from "./constants";
import * as cartConstants from "../cart/constants";

import { DashboardApi } from "./dashboardApi";
import CryptoJS from "crypto-js";

const dashboardApi = new DashboardApi();

export const saveNewProduct = (product, cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.addNewProduct(product);

    dispatch({
      type: constants.ADD_NEW_PRODUCT,
      payload: data.data,
    });
    cb(data);
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const getAllCountries = (codeApi, cb) => async (dispatch) => {
  try {
    const data = await dashboardApi.getAllCountries(codeApi);

    cb(data);
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const saveNewCategory = (category, cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.saveNewCategory(category);

    dispatch({
      type: constants.ADD_NEW_CAEGORY,
      payload: data.data,
    });
    cb(data);
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const updateNewProductById = (product, id, cb) => async (dispatch) => {
  delete product._id;

  try {
    const { data } = await dashboardApi.updateNewProductById(product, id);

    dispatch({
      type: constants.UPDATE_PRODUCT,
      payload: {
        ...product,
        _id: id,
      },
    });
    cb(data);
  } catch (error) {
    console.log(error);
    cb();
  }
};
export const updateCategoryById = (category, id, cb) => async (dispatch) => {
  delete category._id;

  try {
    const { data } = await dashboardApi.updateCategoryById(category, id);

    dispatch({
      type: constants.UPDATE_CATEGORY,
      payload: {
        ...category,
        _id: id,
      },
    });
    cb(data);
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const getAllProducts = (cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllProducts();
    dispatch({
      type: constants.GET_ALL_PRODUCTS,
      payload: data?.data?.foundProducts,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const getAllProductsByCateId =
  (selectedCategory, cb) => async (dispatch) => {
    try {
      const { data } = await dashboardApi.getAllProductsByCateId(
        selectedCategory?._id
      );

      cb(data.data);
    } catch (error) {
      console.log(error);
      cb();
    }
  };

export const getAllCategorys = (cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllCategorys();

    cb?.(data?.data);
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const getCartByUserId = (id) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getCartByUserId(id);

    dispatch({
      type: constants.GET_CART,
      payload: data?.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNewProject = (project, cb) => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    // create cart
    const { cart } = getState().dashboard;
    const cartData = {
      cartStatus: "favoriteCart",
    };
    await dashboardApi.updateCartStatus(cartData, cart?._id);

    // create project

    const projectData = {
      userId: project.customerId,
      componentCost: project.componentCost,
      projectName: project.projectName,
      componentPlacement: project.componentPlacement,
      designFee: project.designFee,
      identicalComponents: project.identicalComponents,
      pcbBoardDimensions: project.pcbBoardDimensions,
      pcbBoardQty: project.pcbBoardQty,
      pcbStandoffHoles: project.pcbStandoffHoles,
      img: project.img,
    };
    const projectresponse = await dashboardApi.createNewProject(projectData);

    // // create favorite

    const favoriteData = {
      user: project.customerId,
      project: projectresponse.data.data._id,

      cart: cart._id,
    };
    const { data } = await dashboardApi.createNewFavorite(favoriteData);

    // create notification
    const notifData = {
      type: "favorite",
      type_id: projectresponse.data.data.projectId,
      createdBy: user._id,
      color: "#3DB2FF",
    };
    const notifResponse = await dashboardApi.createNewNotification(notifData);

    dispatch({
      type: constants.CREATE_NEW_CART,
      payload: null,
    });

    dispatch({
      type: constants.CREATE_NEW_NOTIFICATION,
      payload: { ...notifResponse.data.data, createdBy: user },
    });
    cb?.(data.data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const getAllOrders = (cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllOrders();

    dispatch({
      type: constants.GET_ALL_ORDERS,
      payload: data?.data,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};
export const getAllFavorites = (cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllFavorites();

    dispatch({
      type: constants.GET_ALL_FAVORITES,
      payload: data?.data,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const addNewItemToCart =
  (item, data, inter, cb) => async (dispatch, getState) => {
    console.log("item", item);
    try {
      const cart = getState().dashboard.cart;
      const cartItems = cart?.items || [];
      const findItem = cartItems.find((w) => w.productId === item.productId);
      let finalData = [];
      if (findItem) {
        finalData = cartItems.map((item2) => {
          if (item2.blockType === "mcu") {
            return {
              ...item2,
              [inter]: item2[inter] - item.quantity,
            };
          }
          if (item2.productId === item.productId) {
            return {
              ...item2,
              ...item,
              quantity: item2.quantity + item.quantity,
            };
          }
          return item2;
        });
      } else {
        const newCartItems = [...cartItems, item];

        finalData = newCartItems.map((item2) => {
          if (item2.blockType === "mcu") {
            return {
              ...item2,
              [inter]: item2[inter] - item.quantity,
            };
          }

          return item2;
        });
      }

      let newCart = {
        ...cart,
        ...data,
        items: finalData,
        subTotal: finalData.reduce(
          (acc, cur) => acc + parseFloat(cur.total),
          0
        ),
      };

      const or = CryptoJS.AES.encrypt(
        JSON.stringify(newCart),
        "hdfsur13413--32847djfh38--5^%#*%#fh3963"
      ).toString();

      dispatch({
        type: cartConstants.CREATE_NEW_CART_CODE,
        payload: or,
      });

      dispatch({
        type: constants.ADD_ITEM_CART,
        payload: newCart,
      });
      cb();
    } catch (error) {
      console.log(error);
      cb();
    }
  };
export const removeMcuFromCart =
  (product, cb) => async (dispatch, getState) => {
    try {
      const cart = getState().dashboard.cart;

      const newCartItems = [];
      const finalItems = newCartItems?.concat(product);
      let newCart = {
        ...cart,
        items: finalItems,
        subTotal: finalItems.reduce(
          (acc, cur) => acc + parseFloat(cur.total),
          0
        ),
      };

      const or = CryptoJS.AES.encrypt(
        JSON.stringify(newCart),
        "hdfsur13413--32847djfh38--5^%#*%#fh3963"
      ).toString();

      dispatch({
        type: cartConstants.CREATE_NEW_CART_CODE,
        payload: or,
      });

      dispatch({
        type: constants.ADD_ITEM_CART,
        payload: newCart,
      });
      cb();
    } catch (error) {
      console.log(error);
      cb();
    }
  };
export const removeItemFromCart = (id, inter) => async (dispatch, getState) => {
  try {
    const cart = getState().dashboard.cart;
    const cartItems = cart?.items || [];
    const component = cartItems.find((item) => item.productId === id);
    const updateMcu = cartItems.map((item) => {
      if (item.blockType === "mcu") {
        return {
          ...item,
          [inter]: item[inter] + component.quantity,
        };
      }
      return item;
    });
    const filterItems = updateMcu.filter((item) => item?.productId !== id);

    let newCart = {
      ...cart,
      items: filterItems,
      subTotal: filterItems.reduce(
        (acc, cur) => acc + parseFloat(cur.total),
        0
      ),
    };

    const or = CryptoJS.AES.encrypt(
      JSON.stringify(newCart),
      "hdfsur13413--32847djfh38--5^%#*%#fh3963"
    ).toString();

    dispatch({
      type: cartConstants.CREATE_NEW_CART_CODE,
      payload: or,
    });

    dispatch({
      type: constants.ADD_ITEM_CART,
      payload: newCart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateItemQty =
  (quantity, workingAs, inter, id) => async (dispatch, getState) => {
    try {
      console.log("workingAs", workingAs);
      const cart = getState().dashboard.cart;

      const cartItems = cart?.items || [];
      const filterItems = cartItems.map((item) => {
        if (item?.productId === id) {
          return {
            ...item,
            quantity,
            total: parseFloat(item.price) * quantity,
            [inter]:
              workingAs === "decrease"
                ? item[inter] - 1
                : (item[inter] || 0) + 1,
          };
        }
        if (item.blockType === "mcu") {
          return {
            ...item,
            [inter]:
              workingAs === "decrease" ? item[inter] + 1 : item[inter] - 1,
          };
        }
        return {
          ...item,
        };
      });
      let newCart = {
        ...cart,
        items: filterItems,
        subTotal: filterItems.reduce(
          (acc, cur) => acc + parseFloat(cur.total),
          0
        ),
      };

      const or = CryptoJS.AES.encrypt(
        JSON.stringify(newCart),
        "hdfsur13413--32847djfh38--5^%#*%#fh3963"
      ).toString();

      dispatch({
        type: cartConstants.CREATE_NEW_CART_CODE,
        payload: or,
      });

      dispatch({
        type: constants.ADD_ITEM_CART,
        payload: newCart,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const removeCart = (cb) => async (dispatch, getState) => {
  try {
    dispatch({
      type: cartConstants.CREATE_NEW_CART_CODE,
      payload: null,
    });

    dispatch({
      type: constants.ADD_ITEM_CART,
      payload: null,
    });
    cb();
  } catch (error) {
    cb();
    console.log(error);
  }
};

export const incrementQtyProduct = (item, id) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.incrementQtyProduct(item, id);

    dispatch({
      type: constants.ADD_ITEM_CART,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const decrementQtyProduct = (item, id) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.decrementQtyProduct(item, id);

    dispatch({
      type: constants.ADD_ITEM_CART,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCustomers = (cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllCustomers();

    dispatch({
      type: constants.GET_ALL_USERS,
      payload: data?.data,
    });
    cb(data?.data?.allUsers || []);
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const getAllCategorysOptions = (cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllCategorysOptions();

    dispatch({
      type: constants.GET_ALL_CATEGORYS,
      payload: data?.data,
    });
    cb(data?.data?.foundCategories || []);
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const markasReadNotifications =
  (notifications, cb) => async (dispatch) => {
    try {
      await Promise.all(
        notifications.map(async (notification) => {
          const { data } = await dashboardApi.updateNotification(
            { read: true },
            notification?._id
          );

          dispatch({
            type: constants.UPDATE_NOTIFICATION,
            payload: { _id: notification?._id, read: true },
          });
          return data.data;
        })
      );

      cb();
    } catch (error) {
      console.log(error);
      cb();
    }
  };

export const removeProductById = (id, cb) => async (dispatch) => {
  try {
    await dashboardApi.removeProductById(id);
    dispatch({
      type: constants.DELETE_PRODUCT,
      payload: id,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};
export const removeCategoryById = (id, cb) => async (dispatch) => {
  try {
    await dashboardApi.removeCategoryById(id);
    dispatch({
      type: constants.DELETE_CATEGORY,
      payload: id,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};
export const removeFavoriteById = (id, cb) => async (dispatch) => {
  try {
    await dashboardApi.removeFavoriteById(id);
    dispatch({
      type: constants.DELETE_FAVORITE,
      payload: id,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};
export const removeCustomerById = (id, cb) => async (dispatch) => {
  try {
    await dashboardApi.removeCustomerById(id);
    dispatch({
      type: constants.DELETE_USER,
      payload: id,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const getAllNotifications = (cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllNotifications();
    dispatch({
      type: constants.GET_ALL_NOTIFICATIONS,
      payload: data.data,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const getAllCartsByUserId = (id, cb) => async (dispatch) => {
  try {
    const { data } = await dashboardApi.getAllCartsByUserId(id);

    cb(data.data || []);
  } catch (error) {
    console.log(error);
    cb();
  }
};
