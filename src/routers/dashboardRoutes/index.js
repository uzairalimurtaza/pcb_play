import { Fragment, memo, Suspense } from "react";
import { Route, Routes } from "react-router";
import routesData from "./routesData";

const FilterRoutes = ({ routes = [] }) => {
  return (
    <Suspense>
      <Routes>
        {routes
          .filter((e) => e)
          .map((route, i) => {
            const Guard = route.guard || Fragment;
            const Layout = route.layout || Fragment;

            const Component = route.component;
            return (
              <Route
                key={i}
                path={route.path}
                exact={route.exact}
                element={
                  <Guard>
                    <Layout>
                      {route?.children ? (
                        <SubRoutes routes={route?.children} />
                      ) : (
                        <Component />
                      )}
                    </Layout>
                  </Guard>
                }
              />
            );
          })}
      </Routes>
    </Suspense>
  );
};

const SubRoutes = ({ routes = [] }) => {
  return (
    <Suspense>
      <Routes>
        {routes
          .filter((e) => e)
          .map((route, i) => {
            const Component = route.component;
            return (
              <Route
                key={i}
                path={route.path}
                exact={route.exact}
                element={<Component />}
              />
            );
          })}
      </Routes>
    </Suspense>
  );
};

const Index = () => {
  return <FilterRoutes routes={routesData} />;
};
export default memo(Index);
