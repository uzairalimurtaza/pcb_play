import { INSTANCE } from "../../config/axiosInstance";

export class DashboardApi {
  addNewProduct = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/products",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllCountries = async (key) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", key);

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    return new Promise((resolve, reject) => {
      fetch(
        "https://api.apilayer.com/number_verification/countries",
        requestOptions
      )
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });
  };
  saveNewCategory = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/category",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllProducts = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/products",
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllProductsByCateId = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: `/products/${id}/category`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllCategorys = async (params) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/category",
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getCartByUserId = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: `/cart/new/${id}/user`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  createNewCart = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/cart/create-by-admin",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  updateCartStatus = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/cart/${id}/status-update-by-admin`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  createNewProject = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/project",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(resolve)
        .catch(reject);
    });
  };
  createNewFavorite = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/favourite/createFavourite",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllOrders = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/orders",
      })
        .then(resolve)
        .catch(reject);
    });
  };

  getAllFavorites = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/favourite",
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllUsers = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/users/customers",
      })
        .then(resolve)
        .catch(reject);
    });
  };
  addNewItemToCart = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/cart/${id}/add-items`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  removeItemFromCart = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/cart/${id}/remove-item`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  incrementQtyProduct = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/cart/${id}/increment-quantity`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  decrementQtyProduct = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/cart/${id}/decrement-quantity`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllCategorysOptions = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/category",
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllCustomers = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/users/customers",
      })
        .then(resolve)
        .catch(reject);
    });
  };
  updateNewProductById = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/products/${id}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  updateCategoryById = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/category/${id}`,

        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  removeProductById = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "DELETE",
        url: `/products/${id}`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  updateNotification = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/notifications/${id}`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  removeCategoryById = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "DELETE",
        url: `/category/${id}`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  removeFavoriteById = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "DELETE",
        url: `/favourite/${id}`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  removeCustomerById = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "DELETE",
        url: `/users/${id}`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllNotifications = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: `/notifications`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  createNewNotification = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/notifications",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllCartsByUserId = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: `/cart/${id}/user`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
}
