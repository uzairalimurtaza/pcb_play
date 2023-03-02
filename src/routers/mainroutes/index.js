import React, { Fragment, memo, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routeData from "./routesData";

const FilterRoutes = ({ routes = [] }) => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        {routes?.map((route, i) => {
          const Layout = route.layout || Fragment;
          const LoginCheck = route.check || Fragment;
          const Protection = route.protection || Fragment;
          const Verification = route.verify || Fragment;
          const ContextProvider = route.context || Fragment;

          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              element={
                <LoginCheck>
                  <Protection>
                    <Verification>
                      <ContextProvider>
                        <Layout>
                          {route.routes ? (
                            renderSubRoutes(route.routes)
                          ) : (
                            <Component />
                          )}
                        </Layout>
                      </ContextProvider>
                    </Verification>
                  </Protection>
                </LoginCheck>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

const renderSubRoutes = (routes = []) => {
  return (
    <Suspense>
      <Routes>
        {routes.map((route, i) => {
          const Layout = route.layout || Fragment;
          const Component = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

const Index = () => {
  return <FilterRoutes routes={routeData} />;
};

export default memo(Index);
