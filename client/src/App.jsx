import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ListPage from './pages/listpage/ListPage'
import Restaurant from './pages/restaurantpage/Restaurant';
import './App.css'
import HomePage from "./pages/homepage/HomePage";
import Layout from "./pages/layoutpage/Layout";
import ReviewPage from "./pages/reviewpage/ReviewPage";
import Profile from "./pages/profilepage/Profile";
import VerifyUser from "./components/verifyuser/VerifyUser";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import NotFound from "./components/notfound/NotFound";
import AuthDebugger from "./components/authDebugger/AuthDebugger";


const requestedScopes = ["profile", "email"];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  //TODO: Send data caputured to backend. i.e. create API request

  // If the user is not authenticated, redirect to the home page
  if (!isLoading)
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
      return null;
    }

  // Otherwise, display the children (the protected page)
  return children;
}


// Defined the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: '/list', element: <ListPage /> },
      { path: '/restaurant', element: <Restaurant /> },
      { path: '/writeareview', element: <RequireAuth><ReviewPage /></RequireAuth> },
      { path: '/profile', element: <RequireAuth><Profile /></RequireAuth> },
      { path: '*', element: <NotFound /> },
      { path: '/debugger', element: <AuthDebugger /> },
      { path: "/verify-user", element: <VerifyUser /> }
    ]
  }
]);


function App() {
  return (
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirectUri: `${window.location.origin}/verify-user`,
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: requestedScopes.join(" "),
        }
        }
      >
        <AuthTokenProvider>
          <RouterProvider router={router} />
        </AuthTokenProvider>
      </Auth0Provider>
    </React.StrictMode>
  );
}

export default App; 