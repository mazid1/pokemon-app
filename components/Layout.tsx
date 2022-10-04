import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav>Navbar</nav>
      {children}
    </>
  );
};

export default Layout;
