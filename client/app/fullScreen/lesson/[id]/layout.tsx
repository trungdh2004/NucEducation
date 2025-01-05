import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <div className="fixed inset-0 min-h-screen bg-no-repeat bg-cover bg-center bg-[url(/backgroundQuiz.jpg)] z-[-1]"></div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default Layout;
