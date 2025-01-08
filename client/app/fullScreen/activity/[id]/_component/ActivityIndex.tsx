"use client";
import { endLessonApi, lessonFindJoinApi } from "@/actions/lesson.action";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Logo from "@/components/root/header/Logo";
import { Button } from "@/components/ui/button";
import { LessonResponseReview } from "@/types/lesson.type";
import { CopyIcon, LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ActivityIndex = ({ id }: { id: string }) => {
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonResponseReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await lessonFindJoinApi(id);
        setLesson(response);
      } catch (error: unknown) {
        console.log("error", error);

        router.push("/");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Đã copy mã vào clipboard");
    });
  };

  const handleEndLesson = async () => {
    try {
      await endLessonApi(id);
      toast.success("Kết thúc thành công");
      router.push(`/reports/${id}`)
    } catch (error: unknown) {
      console.log("erorr: ", error);
    }
  };

  return (
    <div>
      {loading}
      <div className="fixed top-0 w-full z-20 h-20 bg-black/80 flex items-center justify-between px-4">
        <div>
          <Logo className="size-12" />
        </div>

        <div>
          <Button variant={"destructive"}>Kết thúc</Button>
        </div>
      </div>

      <div className="max-w-md md:max-w-3xl bg-black/80 mt-20 sticky top-20 rounded-b-2xl border border-gray-500 mx-auto p-2 md:p-4 flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 bg-gray-500/20 rounded-b-xl p-2 md:p-4 w-full">
          <div className="flex items-center border-b py-4 px-2">
            <div className="size-8 md:size-10 rounded-full bg-gray-500/30 flex items-center justify-center text-white">
              1
            </div>
            <div className="flex-1 flex items-center px-2 justify-center gap-1 text-white group cursor-pointer">
              <div className="text-xl md:text-4xl group-hover:underline">
                join.
              </div>
              <div className="text-xl md:text-4xl group-hover:underline">
                nucEducation
              </div>
              <div className="text-xl md:text-4xl group-hover:underline">
                .com
              </div>
            </div>
            <div
              className="size-8 md:size-12 text-white flex items-center justify-center bg-gray-500/30 rounded-md cursor-pointer"
              onClick={() => {
                handleCopy(
                  `${window?.location?.origin}/fullScreen/join/${lesson?._id}`
                );
              }}
            >
              <LinkIcon />
            </div>
          </div>
          <div className="flex items-center py-4 px-2">
            <div className="size-8 md:size-10 rounded-full bg-gray-500/30 flex items-center justify-center text-white">
              2
            </div>
            <div className="flex-1 flex items-center px-2 justify-center gap-1 text-white group cursor-pointer">
              <div className="text-xl md:text-4xl space-x-2">
                {lesson?.code}
              </div>
            </div>
            <div
              className="size-8 md:size-12 text-white flex items-center justify-center bg-gray-500/30 rounded-md cursor-pointer"
              onClick={() => {
                handleCopy(lesson?.code as string);
              }}
            >
              <CopyIcon />
            </div>
          </div>
        </div>
        <div className="size-28 md:size-40 bg-gray-500/20 rounded-md md:rounded-b-xl p-2 flex items-center justify-center">
          <QRCodeSVG
            value={`${window?.location?.origin}/fullScreen/join/${lesson?._id}`}
            level={"H"}
            size={150}
            bgColor={"transparent"}
            fgColor={"#fff"}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto  mt-4 p-2 rounded-md text-center ">
        <h4 className="text-center text-xl  md:text-2xl font-semibold text-white bg-black/50 inline-block px-4 py-3 rounded-full">
          Danh sách người tham gia
        </h4>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        handleSubmit={() => {
          handleEndLesson();
          setOpenConfirm(false);
        }}
        successLabel="Kết thúc"
        title="Kết thúc bài học"
        description="Bạn có chắc chắn muốn kết thúc bài học không"
      />
    </div>
  );
};

export default ActivityIndex;
