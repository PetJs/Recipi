import { Route, Routes as ReactRoutes, Outlet } from "react-router-dom";
import ProtectedRoute from "./protected-routes";
import { useUserStore } from "@/store/userStore";
import KitchenLayout from "@/components/layouts/kitchen-layout"
type RouteConfig = {
    path: string;
    element: React.ComponentType<any>;
    children?: RouteConfig[]; // Nested routes
}

type LayoutConfig = {
    layout: React.ComponentType<any>;
    children: RouteConfig[];
}

const renderRoutes = (
    routes: RouteConfig[],
    isAuthorized = true,
    parentLayout?: React.ComponentType<any>
) => {
    return routes.map(
        ({element: Element, path, children: nestedRoutes}, index) => 
        {
            if (!Element || !path) return null;

            const needsProtection = parentLayout === KitchenLayout;

            if(nestedRoutes && nestedRoutes.length > 0){
                return (
                    <Route key={`${path}-${index}`} path={path} element={<Element/>}>
                        {renderRoutes(nestedRoutes, isAuthorized, parentLayout)}
                    </Route>
                )
            }

            return (
                <Route 
                    key={`route-${index}`}
                    path={path}
                    element={
                        needsProtection ? (
                            <ProtectedRoute>
                                <Element/>
                            </ProtectedRoute>
                        ) : (
                            <Element/>
                        )
                    }
                >

                </Route>
            )
        }
    )
}


export const generateRoutes = (mainRoutes: LayoutConfig[]) => {
    const Routes = () => {
      const { user, accessHash } = useUserStore();
      console.log(user?.username)
      console.log(accessHash)
  
      return (
        <ReactRoutes>
          {mainRoutes.map(({ layout: OuterLayout, children }, index) => (
            <Route key={`layout-${index}`} element={<OuterLayout />}>
              {children.map(({ path, element: InnerElement, children: innerChildren }, i) => {
                const isKitchen = InnerElement === KitchenLayout;
  
                if (isKitchen) {
                    return (
                      <Route key={`inner-${i}`} path={path} element={<KitchenLayout />}>
                        {renderRoutes(innerChildren || [], !user?.username && !accessHash, KitchenLayout)}
                      </Route>
                    );
                }
  
                return renderRoutes([{
                  path,
                  element: InnerElement,
                  children: innerChildren
                }], true, OuterLayout);
              })}
            </Route>
          ))}
  
          {/* fallback: Any other /kitchen path */}
          <Route
            path="/kitchen/*"
            element={
              <ProtectedRoute >
                <Outlet />
              </ProtectedRoute>
            }
          />
        </ReactRoutes>
      );
    };
  
    return Routes;
  };
  