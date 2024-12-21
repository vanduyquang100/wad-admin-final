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
const ProductListPage = lazy(
  () => import("@/components/pages/ProductListPage")
);
const OrderListPage = lazy(() => import("@/components/pages/OrderListPage"));
const ReportListPage = lazy(() => import("@/components/pages/ReportPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={PrivateWrapper}>
          <Route path={NAVIGATION_ROUTES.DASHBOARD} Component={DashboardLayout}>
            <Route
              path={NAVIGATION_ROUTES.DASHBOARD}
              element={<Navigate to={NAVIGATION_ROUTES.USERS} />}
            />
            <Route path={NAVIGATION_ROUTES.USERS} Component={UserListPage} />
            <Route
              path={NAVIGATION_ROUTES.PRODUCTS}
              Component={ProductListPage}
            />
            <Route path={NAVIGATION_ROUTES.ORDERS} Component={OrderListPage} />
            <Route
              path={NAVIGATION_ROUTES.REPORTS}
              Component={ReportListPage}
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
