import { createBrowserRouter } from "react-router";
import { Splash } from "./screens/Splash";
import { Onboarding1 } from "./screens/Onboarding1";
import { Onboarding2 } from "./screens/Onboarding2";
import { Onboarding3 } from "./screens/Onboarding3";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { Home } from "./screens/Home";
import { Services } from "./screens/Services";
import { MyBookings } from "./screens/MyBookings";
import { Account } from "./screens/Account";
import { BookingFlow } from "./screens/BookingFlow";
import { BookingStatus } from "./screens/BookingStatus";
import { JoinAndEarn } from "./screens/JoinAndEarn";
import { Contact } from "./screens/Contact";
import { SocialRedirect } from "./screens/SocialRedirect";
import { Pricing } from "./screens/Pricing";
import { PrivacyPolicy } from "./screens/PrivacyPolicy";
import { TermsAndConditions } from "./screens/TermsAndConditions";
import { MainLayout } from "./components/MainLayout";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/onboarding-1",
    element: <Onboarding1 />,
  },
  {
    path: "/onboarding-2",
    element: <Onboarding2 />,
  },
  {
    path: "/onboarding-3",
    element: <Onboarding3 />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/booking",
    element: <BookingFlow />,
  },
  {
    path: "/booking-status/:status",
    element: <BookingStatus />,
  },
  {
    path: "/join-and-earn",
    element: <JoinAndEarn />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/socials",
    element: <SocialRedirect />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms",
    element: <TermsAndConditions />,
  },
]);