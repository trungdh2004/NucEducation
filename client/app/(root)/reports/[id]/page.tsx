import ReportDetailIndex from "./ReportDetailIndex";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const id = params.id;
  return (
    <>
      <ReportDetailIndex id={id} />
    </>
  );
};

export default page;
