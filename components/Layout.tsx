import React, { PropsWithChildren } from "react";
import TopBar from "./TopBar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TopBar></TopBar>
      {children}
    </>
  );
};

export default Layout;
