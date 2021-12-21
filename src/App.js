import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

export default function App() {
  const { user, signOut } = useAuthenticator();

  if (user) {
    return (
      <div>
        <h1>Basic Example</h1>
        <h1>Hello {user.attributes.email}</h1>
        <button style={{ width: "50px" }} onClick={signOut}>
          Sign Out
        </button>
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
    return <Authenticator variation="modal" />;
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
