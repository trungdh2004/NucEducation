import FinishIndex from "./_component/FinishIndex";

const page = async ({
  params,
}: {
  params: {
    id: string;
    playerId: string;
  };
}) => {
  const { playerId } = params;

  return (
    <div className="w-full min-h-screen  px-4">
      <FinishIndex id={playerId} />
    </div>
  );
};

export default page;
