import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react-v1";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react-v1";

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
        <h1>Post Login</h1>
        <Routes>
          <Route path="/" element={<LayoutPost />}>
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
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
        <h1>Hello {user.attributes.email}</h1>
        <div style={{ width: "50px" }}>
          <AmplifySignOut />
        </div>
        
      </div>
    );
  } else {
    return (
      <div>
        <h1>Pre Login</h1>
        <Routes>
          <Route path="/" element={<LayoutPre />}>
            <Route
              index
              element={
                <div>
                  <h2>Home</h2>
                </div>
              }
            />
            <Route
              path="faq"
              element={
                <div>
                  <h2>FAQ</h2>
                </div>
              }
            />
            <Route
              path="contact-us"
              element={
                <div>
                  <h2>Contact Us</h2>
                </div>
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
        <AmplifyAuthenticator />
      </div>
    );
  }
}

function LayoutPost() {
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

function LayoutPre() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
