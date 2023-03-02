import {
  DeliveryAddress,
  Favorites,
  Orders,
  PersonalInfo,
  UpdatePassword,
} from "../../views";

const routes = [
  {
    path: "/delivery-address",

    component: DeliveryAddress,
  },
  {
    path: "/my-orders",

    component: Orders,
  },

  {
    path: "/favorites",

    component: Favorites,
  },
  {
    path: "/personal-info",

    component: PersonalInfo,
  },
  {
    path: "/update-password",

    component: UpdatePassword,
  },
];
export default routes;
