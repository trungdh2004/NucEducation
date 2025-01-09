/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BookMinusIcon,
  BookUserIcon,
  ChartPieIcon,
  EarthIcon,
  HouseIcon,
} from "lucide-react";

const listMenuClient: any[] = [
  {
    title: "Khám phá",
    link: "/",
    icon: HouseIcon,
  },
  {
    title: "Đa dạng",
    link: "/diversity",
    icon: EarthIcon,
  },
  {
    title: "Thư viện",
    link: "/library",
    icon: BookUserIcon,
  },

  {
    title: "Báo cáo",
    link: "/reports",
    icon: ChartPieIcon,
  },
  {
    title: "Bài viết",
    link: "/blogs",
    icon: BookMinusIcon,
  },
];

export default listMenuClient;
