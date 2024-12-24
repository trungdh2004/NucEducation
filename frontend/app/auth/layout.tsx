import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[450px] mx-auto h-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;