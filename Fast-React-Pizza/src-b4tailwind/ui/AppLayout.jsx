import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "../ui/Header.jsx";
import Loader from "../ui/loader.jsx";

function AppLayout() {
  const navigation = useNavigation();

  console.log(navigation);

  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <Outlet />
      <CartOverview />
    </div>
  );
}

export default AppLayout;
