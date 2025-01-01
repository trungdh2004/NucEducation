
import { configApp } from "@/config/app.config";
import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import QuizIndex from "./_component/QuizIndex";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(configApp.SERVER_URL + "/quiz/findMeta/" + id);
  const res = await product.json();
  let name = "";

  if (!product.ok) {
    name = "Bài viết lỗi";
  } else {
    name = res.name as string;
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: name,
    openGraph: {
      images: ["/NUC.svg", ...previousImages],
    },
  };
}

const page = async ({ params }: Props) => {
  const id = params.id;

  if (!id) redirect("/");
  return (
    <div className="w-full">
      <QuizIndex id={id} />
      {/* <QuizLoading /> */}
    </div>
  );
};

export default page;
