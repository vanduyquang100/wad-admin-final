import { lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { NAVIGATION_ROUTES } from "@/constants/apis";
import { PrivateWrapper } from "./components/pages/PrivateWrapper";
import { DashboardLayout } from "@/components/ui";

const LogInPage = lazy(() => import("@/components/pages/LogInPage"));
const UserListPage = lazy(() => import("@/components/pages/UserListPage"));
const UserDetailPage = lazy(() => import("@/components/pages/UserDetailPage"));
const ProductListPage = lazy(
  () => import("@/components/pages/ProductListPage")
);
const OrderListPage = lazy(() => import("@/components/pages/OrderListPage"));
const ReportListPage = lazy(() => import("@/components/pages/ReportPage"));
const CreateProductPage = lazy(
  () => import("@/components/pages/CreateProductPage")
);
const UpdateProductPage = lazy(
  () => import("@/components/pages/UpdateProductPage")
);
const OrderDetailPage = lazy(
  () => import("@/components/pages/OrderDetailPage")
);
const MyInfoPage = lazy(() => import("@/components/pages/MyInfoPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={PrivateWrapper}>
          <Route
            path="/"
            element={<Navigate to={NAVIGATION_ROUTES.DASHBOARD} />}
          />
          <Route path={NAVIGATION_ROUTES.ME} Component={MyInfoPage} />
          <Route path={NAVIGATION_ROUTES.DASHBOARD} Component={DashboardLayout}>
            <Route
              path={NAVIGATION_ROUTES.DASHBOARD}
              element={<Navigate to={NAVIGATION_ROUTES.USERS} />}
            />
            <Route path={NAVIGATION_ROUTES.USERS} Component={UserListPage} />
            <Route
              path={NAVIGATION_ROUTES.USER_DETAIL}
              Component={UserDetailPage}
            />
            <Route
              path={NAVIGATION_ROUTES.PRODUCTS}
              Component={ProductListPage}
            />
            <Route path={NAVIGATION_ROUTES.ORDERS} Component={OrderListPage} />
            <Route
              path={NAVIGATION_ROUTES.REPORTS}
              Component={ReportListPage}
            />
            <Route
              path={NAVIGATION_ROUTES.CREATE_PRODUCT}
              Component={CreateProductPage}
            />
            <Route
              path={NAVIGATION_ROUTES.EDIT_PRODUCT}
              Component={UpdateProductPage}
            />
            <Route
              path={NAVIGATION_ROUTES.ORDER_DETAIL}
              Component={OrderDetailPage}
            />
          </Route>
        </Route>
        <Route path="/" Component={LogInPage} />
        <Route path={NAVIGATION_ROUTES.LOGIN} Component={LogInPage} />
      </Routes>
    </Router>
  );
}

export default App;
