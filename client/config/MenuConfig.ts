/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BookmarkIcon,
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
    link: "/dashboard",
    icon: ChartPieIcon,
  },
  {
    title: "Bài viết",
    link: "/blogs",
    icon: BookMinusIcon,
  },
  {
    title: "Yêu thích",
    link: "/heart",
    icon: BookmarkIcon,
  },
];

export default listMenuClient;
