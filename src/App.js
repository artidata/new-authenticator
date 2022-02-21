import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export default function App() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  if (user) {
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
        <button style={{ width: "50px" }} onClick={signOut}>
          Sign Out
        </button>
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
        <Authenticator />
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
