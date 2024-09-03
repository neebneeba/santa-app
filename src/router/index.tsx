import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "../pages/home";
import RequestSent from "../pages/request_sent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/request-sent",
    element: <RequestSent />,
  },
]);

export default router;
