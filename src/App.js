import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react-v1";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react-v1";
import { Auth } from "aws-amplify";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export default function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  if (authState === AuthState.SignedIn && user) {
    return (
      <div>
        <h1>Basic Example</h1>
        <h1>Hello {user.attributes.email}</h1>
        <div style={{ width: "50px" }}>
          <AmplifySignOut />
        </div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <div>
                  <h2>Home</h2>
                </div>
              }
            />
            <Route
              path="about"
              element={
                <div>
                  <h2>About</h2>
                </div>
              }
            />
            <Route
              path="dashboard"
              element={
                <div>
                  <h2>Dashboard</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </div>
    );
  } else {
    return <AmplifyAuthenticator />;
  }
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
