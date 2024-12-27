import React from "react";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) => {
  console.log("params", params);

  return (
    <div>
      <div>Header</div>
      {children}
    </div>
  );
};

export default Layout;
