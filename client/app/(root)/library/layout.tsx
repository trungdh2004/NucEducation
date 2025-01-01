import React from "react";
import LibrarySidebar from "./_component/LibrarySidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="max-w-5xl mx-auto  grid grid-cols-12 gap-4 relative py-4">
        <LibrarySidebar />
        <div className="col-span-12 sm:col-span-9">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
