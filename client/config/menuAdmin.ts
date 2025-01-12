/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChartColumnStackedIcon,
  ChartPieIcon,
  FileQuestionIcon,
  NotebookTabsIcon,
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
    link: "/user",
    icon: SquareUserRoundIcon,
  },

  {
    title: "Môn học",
    link: "/category",
    icon: ChartColumnStackedIcon,
  },
  {
    title: "Bài học",
    link: "/quiz",
    icon: FileQuestionIcon,
  },
  {
    title: "Cuộc chơi",
    link: "/lesson",
    icon: NotebookTabsIcon,
  },
  // {
  //   title: "Lớp học",
  //   link: "/dashboard",
  //   icon: SchoolIcon,
  // },
  //   {
  //     title: "Cuộc thi",
  //     link: "/blogs",
  //     icon: BookMinusIcon,
  //   },
];

export default listMenuAdmin;
