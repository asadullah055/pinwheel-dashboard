import { BsBagPlus } from "react-icons/bs";
import { FiLayers, FiUser } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBootstrap } from "react-icons/tb";

export const navMenu = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: RxDashboard,
  },
  {
    id: 2,
    title: "Brand",
    icon: TbBrandBootstrap,
    child: [
      {
        id: "2-1",
        title: "New Brand",
        path: "/brand/create",
      },
      {
        id: "2-2",
        title: "Brand List",
        path: "/brand/list",
      },
    ],
  },
  {
    id: 3,
    title: "Category",
    icon: FiLayers,
    child: [
      {
        id: "3-1",
        title: "New Category",
        path: "/category/create",
      },
      {
        id: "3-2",
        title: "Category List",
        path: "/category/list",
      },
    ],
  },
  {
    id: 4,
    title: "Product",
    icon: MdOutlineProductionQuantityLimits,
    child: [
      {
        id: "4-1",
        title: "Add Category",
        path: "/product/create",
      },
      {
        id: "4-2",
        title: "Product List",
        path: "/product/list",
      },
    ],
  },
  {
    id: 5,
    title: "Order",
    icon: BsBagPlus,
    child: [
      {
        id: "5-1",
        title: "Order List",
        path: "/order/list",
      },
      {
        id: "5-2",
        title: "Create Order",
        path: "/order/create",
      },
      {
        id: "5-3",
        title: "Order Details",
        path: "/order/details",
      },
    ],
  },
  {
    id: 6,
    title: "Coupon",
    icon: RiCoupon3Line,
    path: "/coupon",
  },
  {
    id: 7,
    title: "Customer",
    icon: FiUser,
    path: "/customer",
  },
  {
    id: 8,
    title: "User",
    icon: GrUserAdmin,
    path: "/user",
  },
];
