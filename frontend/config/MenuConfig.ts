import {
  BookmarkIcon,
  BookMinusIcon,
  BookUserIcon,
  ChartPieIcon,
  EarthIcon,
  HouseIcon,
} from "lucide-react";

const listMenu = [
  {
    title: "Khám phá",
    link: "/",
    icons: HouseIcon,
  },
  {
    title: "Đa dạng",
    link: "/diversity",
    icons: EarthIcon,
  },
  {
    title: "Thư viện",
    link: "/library",
    icons: BookUserIcon,
  },
  {
    title: "Yêu thích",
    link: "/heart",
    icons: BookmarkIcon,
  },
  {
    title: "Báo cáo",
    link: "/dashboard",
    icons: ChartPieIcon,
  },
  {
    title: "Bài viết",
    link: "/blogs",
    icons: BookMinusIcon,
  },
];

export default listMenu;
