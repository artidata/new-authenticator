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
      <>
        <h1>Post Login</h1>
        <Routes>
          <Route path="/" element={<LayoutPost />}>
            <Route index element={<h2>Home</h2>} />
            <Route path="about" element={<h2>About</h2>} />
            <Route path="dashboard" element={<h2>Dashboard</h2>} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
        <div>Hello {user.attributes.email}</div>
        <div style={{ width: "50px" }}>
          <AmplifySignOut />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Pre Login</h1>
        <Routes>
          <Route path="/" element={<LayoutPre />}>
            <Route index element={<h2>Home</h2>} />
            <Route path="faq" element={<h2>FAQ</h2>} />
            <Route path="contact-us" element={<h2>Contact Us</h2>} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
        <AmplifyAuthenticator />
      </>
    );
  }
}

function LayoutPost() {
  return (
    <>
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
      <hr />
      <Outlet />
    </>
  );
}

function LayoutPre() {
  return (
    <>
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
      <hr />
      <Outlet />
    </>
  );
}
