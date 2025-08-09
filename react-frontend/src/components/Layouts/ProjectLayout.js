import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import VouchersPage from "../VouchersPage/VouchersPage";
import CategoryPage from "../CategoryPage/CategoryPage";
import CartItemsPage from "../CartItemsPage/CartItemsPage";
import CartItemHistoryPage from "../CartItemHistoryPage/CartItemHistoryPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "vouchers":
                return <VouchersPage />;
case "category":
                return <CategoryPage />;
case "cartItems":
                return <CartItemsPage />;
case "cartItemHistory":
                return <CartItemHistoryPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] mt-16 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
