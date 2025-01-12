import React from "react";
import ReportDetailIndex from "./ReportDetailIndex";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <div>
      <ReportDetailIndex id={id} />
    </div>
  );
};

export default page;
