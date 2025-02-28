import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home";
import Login from "../components/Login.jsx";
import CartPage from "../pages/scrapitem/CartPage.jsx";
import CheckoutPage from "../pages/scrapitem/CheckoutPage.jsx";
import SingleScrapMaterial from "../pages/scrapitem/SingleScrapMaterial.jsx";
import OrderPage from "../pages/scrapitem/OrderPage.jsx";
import Shop from "../pages/shop/Shop.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <OrderPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/scrap/:id",
        element: <SingleScrapMaterial />,
      },
      {
        path: "/shop",
        element: <Shop/>,
      },
    ],
  },
]);

export default router;
