import PropTypes from "prop-types";
import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import useAuthMiddleware from "../hooks/useAuthMiddleware";
import useStore from "../store";

function Layout({ children }) {
  let isMenuExpanded = useStore((state) => state.isMenuExpanded);
  useAuthMiddleware();

  let width = isMenuExpanded ? "260px" : "60px";
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `${width} minmax(0, 1fr)` }}
    >
      <Menu></Menu>
      <main id="main" style={{ backgroundColor: "#f0f4f6" }} className="">
        <Header></Header>
        <div>{children}</div>
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
