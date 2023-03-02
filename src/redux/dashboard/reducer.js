import * as constants from "./constants";

let initState = {
  products: [],
  categoryCounts: 0,
  categorys: [],
  orders: [],
  users: [],
  cart: null,
  favorites: [],
  favoritesCounts: 0,
  notifications: [],
};

function authReducer(state = initState, action) {
  let { payload } = action;
  switch (action.type) {
    case constants.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case constants.CREATE_NEW_CART:
      return {
        ...state,
        cart: payload,
      };
    case constants.DELETE_USER:
      const fileredUsers = state.users.filter((user) => user._id !== payload);

      return {
        ...state,
        users: fileredUsers,
      };
    case constants.GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.foundNotifications,
        notificationsCounts: payload.notificationsCounts,
      };

    case constants.CREATE_NEW_NOTIFICATION:
      const addNotifications = state.notifications.concat(payload);
      return {
        ...state,
        notifications: addNotifications,
        notificationsCounts: payload.notificationsCounts,
      };

    case constants.UPDATE_NOTIFICATION:
      const updatednotif = state.notifications.map((notif) => {
        if (notif._id === payload._id) {
          return {
            ...notif,
            ...payload,
          };
        }
        return notif;
      });
      return {
        ...state,
        notifications: updatednotif,
      };
    case constants.GET_ALL_FAVORITES:
      return {
        ...state,
        favorites: payload.foundfavorites,
        favoritesCounts: payload.favoritesCounts,
      };
    case constants.DELETE_FAVORITE:
      const filteredFavs = state.favorites.filter((fav) => fav._id !== payload);
      return {
        ...state,
        favorites: filteredFavs,
        favoritesCounts: state.favoritesCounts - 1,
      };
    case constants.ADD_ITEM_CART:
      return {
        ...state,
        cart: payload,
      };
    case constants.REMOVE_ITEM_CART:
      let filteredCart = state.cart.items.filter(
        (item) => item.productId !== payload.productId
      );
      const subTotal = filteredCart.reduce(
        (a, b) => a + parseFloat(b.total),
        0
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          items: filteredCart,
          subTotal,
        },
      };

    case constants.GET_CART:
      return {
        ...state,
        cart: payload,
      };
    case constants.GET_ALL_CATEGORYS:
      return {
        ...state,
        categorys: payload.foundCategories,
        categoryCounts: payload.categoryCounts,
      };

    case constants.GET_ALL_USERS:
      return {
        ...state,
        users: payload.allUsers,
        userCounts: payload.allUsersCounts,
      };
    case constants.GET_ALL_ORDERS:
      return {
        ...state,
        orders: payload.foundOrders,
        ordersCounts: payload.ordersCounts,
      };
    case constants.ADD_NEW_PRODUCT:
      const newProduuts = state.products.concat(payload);
      return {
        ...state,
        products: newProduuts,
      };
    case constants.ADD_NEW_CAEGORY:
      const newCategorys = state.categorys.concat(payload);

      return {
        ...state,
        categorys: newCategorys,
        categoryCounts: state.categoryCounts + 1,
      };
    case constants.UPDATE_PRODUCT:
      const updatedProducts = state.products.map((product) => {
        if (product._id === payload._id) {
          return payload;
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts,
      };

    case constants.UPDATE_CATEGORY:
      const updatedCategorys = state.categorys.map((category) => {
        if (category._id === payload._id) {
          return payload;
        }
        return category;
      });
      return {
        ...state,
        categorys: updatedCategorys,
      };

    case constants.DELETE_PRODUCT:
      const filteredProducts = state.products.filter(
        (product) => product._id !== payload
      );
      return {
        ...state,
        products: filteredProducts,
      };

    case constants.DELETE_CATEGORY:
      const filteredCategorys = state.categorys.filter(
        (category) => category._id !== payload
      );
      return {
        ...state,
        categorys: filteredCategorys,
        categoryCounts: payload.categoryCounts - 1,
      };
    default:
      return state;
  }
}

export default authReducer;
