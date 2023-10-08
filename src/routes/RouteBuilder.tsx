import React from 'react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  RouterProvider,
  useRouteError,
  Outlet,
  Route
} from 'react-router-dom';
import UnlockScreen from "../screens/UnlockScreen";
import ProfilesScreen from "../screens/ProfilesScreen";
import AssetsScreen from "../screens/AssetsScreen";
//import {useReadLocalStorage} from "usehooks-ts";

//const ASSETS_STORAGE_KEY = 'ENKI_ASSETS';

/**
 * Assets Loader - load from local storage or default skeleton
 */
export const AssetsLocalLoader = (params : any) => {
  //return useReadLocalStorage(ASSETS_STORAGE_KEY) || [];
}

const Root = () => {
  return (
      <>
        <Outlet/>
      </>
  )
}

const Error = (e: any, b: any) => {
  let error: any = useRouteError();
  return (
    <>
      <pre className="error">{error.toString()}</pre>
    </>
  )
}

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route path="/" element={<UnlockScreen/>} />
      <Route path="/assets" element={<AssetsScreen/>} />
      <Route path="/profiles" element={<ProfilesScreen/>} />
    </Route>
  )
);


const RouteBuilder = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};
export default RouteBuilder;
