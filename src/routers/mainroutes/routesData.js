import { CheckOutProvider } from "../../context/CheckoutContext";
import { EmailProtection, LoginGuard, LoginProtection } from "../../guard";
import UserLoginCheck from "../../guard/UserLoginCheck";
import { DashboardLayout, GerenalLayout, MainLayout } from "../../layouts";
import {
  Checkout,
  Contactus,
  CreateProject,
  Faqs,
  ForgotPassword,
  Home,
  Howitsworks,
  Login,
  Page404,
  PolicyServices,
  Signup,
  ThankYou,
  VerifyEmail,
} from "../../views";
import DashboardRoutes from "../dashboardRoutes";

const routes = [
  {
    path: "/",
    check: UserLoginCheck,
    layout: MainLayout,

    component: Home,
  },
  {
    path: "/how-it-works",
    check: UserLoginCheck,
    layout: MainLayout,

    component: Howitsworks,
  },
  {
    path: "/login",
    check: UserLoginCheck,
    protection: LoginGuard,

    layout: GerenalLayout,
    component: Login,
  },
  {
    path: "/register",
    check: UserLoginCheck,
    protection: LoginGuard,
    layout: GerenalLayout,
    component: Signup,
  },
  {
    path: "/dashboard/*",
    check: UserLoginCheck,
    protection: LoginProtection,
    layout: DashboardLayout,
    component: DashboardRoutes,
  },

  {
    path: "/forgot-password",
    check: UserLoginCheck,
    protection: LoginGuard,
    layout: GerenalLayout,
    component: ForgotPassword,
  },
  {
    path: "/faqs",
    check: UserLoginCheck,
    layout: MainLayout,

    component: Faqs,
  },
  {
    path: "/create-an-project",
    check: UserLoginCheck,
    layout: MainLayout,

    component: CreateProject,
  },
  {
    path: "/policy-services",
    check: UserLoginCheck,
    layout: MainLayout,

    component: PolicyServices,
  },
  {
    path: "/contact-us",
    check: UserLoginCheck,
    layout: MainLayout,

    component: Contactus,
  },
  {
    path: "/verify-email",
    check: UserLoginCheck,
    protection: EmailProtection,
    layout: GerenalLayout,

    component: VerifyEmail,
  },
  {
    path: "/thank-you/:orderId",
    check: UserLoginCheck,
    protection: LoginProtection,
    layout: MainLayout,

    component: ThankYou,
  },
  {
    path: "/checkout",
    check: UserLoginCheck,
    protection: LoginProtection,
    layout: MainLayout,
    context: CheckOutProvider,
    component: Checkout,
  },
  {
    path: "*",
    check: UserLoginCheck,
    layout: MainLayout,
    component: Page404,
  },
];
export default routes;
