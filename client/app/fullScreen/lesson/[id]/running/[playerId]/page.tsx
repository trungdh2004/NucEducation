import dynamic from "next/dynamic";

const LessonPlayerIndex = dynamic(
  () => import("./_component/LessonPlayerIndex"),
  {
    ssr: false,
  }
);

const page = ({
  params,
}: {
  params: {
    id: string;
    playerId: string;
  };
}) => {
  const { id, playerId } = params;

  return (
    <div className=" w-full">
      {/* <div className="fixed inset-0 min-h-screen bg-no-repeat bg-cover bg-center bg-[url(/backgroundQuiz.jpg)] z-[-1]"></div> */}
      <LessonPlayerIndex id={id} playerId={playerId} />
    </div>
  );
};

export default page;
