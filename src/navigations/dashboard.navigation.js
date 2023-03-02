import {
  ClockIcon,
  FavoriteIcon,
  LockIcon,
  MarkerIcon,
  PersonIcon,
} from "../assets";

const navigation = [
  {
    name: "my orders",
    url: "/dashboard/my-orders",
    icon: ClockIcon,
  },
  {
    name: "favorites",
    url: "/dashboard/favorites",
    icon: FavoriteIcon,
  },
  {
    name: "delivery address",
    url: "/dashboard/delivery-address",
    icon: MarkerIcon,
  },

  {
    name: "personal info",
    url: "/dashboard/personal-info",
    icon: PersonIcon,
  },
  {
    name: "update password",
    url: "/dashboard/update-password",
    icon: LockIcon,
  },
];
export default navigation;
