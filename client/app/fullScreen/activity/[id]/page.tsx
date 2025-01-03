import React from "react";
import ActivityIndex from "./_component/ActivityIndex";

const PageJoinAdmin = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <div className=" w-full">
      <div className="fixed inset-0 min-h-screen bg-no-repeat bg-cover bg-center bg-[url(/summer_theme_bg1.png)] z-[-1]"></div>
      <ActivityIndex id={id} />
    </div>
  );
};

export default PageJoinAdmin;
