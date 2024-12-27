/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArchiveIcon,
  ChartColumnStackedIcon,
  ChartPieIcon,
  FileQuestionIcon,
  NewspaperIcon,
  NotebookTabsIcon,
  SchoolIcon,
  SquareUserRoundIcon,
} from "lucide-react";

const listMenuAdmin: any[] = [
  {
    title: "Thống kê",
    link: "/",
    icon: ChartPieIcon,
  },
  {
    title: "Người dùng",
    link: "/library",
    icon: SquareUserRoundIcon,
  },
  {
    title: "Bài tập",
    link: "",
    icon: ArchiveIcon,
    children: [
      {
        title: "Môn học",
        link: "/category",
        icon: ChartColumnStackedIcon,
      },
      {
        title: "Câu hỏi",
        link: "/quizz",
        icon: FileQuestionIcon,
      },
      {
        title: "Bài học",
        link: "/lesson",
        icon: NotebookTabsIcon,
      },
    ],
  },
  {
    title: "Bài viết",
    link: "/library",
    icon: NewspaperIcon,
  },

  {
    title: "Lớp học",
    link: "/dashboard",
    icon: SchoolIcon,
  },
  //   {
  //     title: "Cuộc thi",
  //     link: "/blogs",
  //     icon: BookMinusIcon,
  //   },
];

export default listMenuAdmin;
