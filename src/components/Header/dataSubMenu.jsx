import {
  HomeIcon,
  ShoppingBagIcon,
  ChatBubbleBottomCenterTextIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";

export const menuOptions = [
  {
    id: 1,
    title: "صفحه اصلی",
    isSubMenu: false,
    href: "/",
    icon: <HomeIcon className="w-5 h-5"></HomeIcon>,
  },
  {
    id: 2,
    title: "فروشگاه",
    href:"/Store",
    isSubMenu: true,
    icon: <ShoppingBagIcon className="w-5 h-5"></ShoppingBagIcon>,
    subMenus: [
      { subMenuTitle: "قهوه ویژه", path: "" },
      { subMenuTitle: "ویژه در سطح جهانی", path: "" },
      { subMenuTitle: "قهوه درجه یک", path: "" },
      { subMenuTitle: "ترکیبات تجاری", path: "" },
      { subMenuTitle: "کپسول قهوه", path: "" },
      { subMenuTitle: "کپسول زینو برزیلی", path: "" },
    ],
  },
  {
    id: 3,
    title: "دیکشنری",
    href: "/Dictionary"   ,
    isSubMenu: false,
    icon: (
      <ChatBubbleBottomCenterTextIcon className="w-5 h-5"></ChatBubbleBottomCenterTextIcon>
    ),
  },
  {
    id: 4,
    title: "وبلاگ",
    href: "/Contact",
    isSubMenu: true,
    subMenus: [
      { subMenuTitle: "فرهنگ قهوه در جهان", path: "" },
      { subMenuTitle: "انواع قهوه و طعم ها", path: "" },
      { subMenuTitle: "سلامتی و قهوه", path: "" },
      { subMenuTitle: "راهنمای خرید قهوه", path: "" },
      { subMenuTitle: "داستان قهوه ما", path: "" },
    ],
    icon: <BriefcaseIcon className="w-5 h-5"></BriefcaseIcon>,
  },
  {
    id: 5,
    title: "درباه ی ما",
    isSubMenu: false,
    href: "/About",
    icon: <DocumentTextIcon className="w-5 h-5"></DocumentTextIcon>,
  },
  {
    id: 6,
    title: "تماس باما",
    href:"/contact-us",
    isSubMenu: false,
    icon: <PhoneArrowUpRightIcon className="w-5 h-5"></PhoneArrowUpRightIcon>,
  },
];
