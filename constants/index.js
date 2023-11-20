import { IoHome } from "react-icons/io5"
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { BsPersonCircle, BsActivity } from "react-icons/bs";


export const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
      icon: <IoHome/>,
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-thread",
      label: "Create Post",
      icon: <FaPencilAlt/>,
    },
    {
      imgURL: "/assets/user.svg",
      route: "/profile",
      label: "Profile",
      icon: <BsPersonCircle/>,
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
      icon: <FaSearch/>,
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Activity",
      icon: <BsActivity/>,
    },
    // {
    //   imgURL: "/assets/community.svg",
    //   route: "/communities",
    //   label: "Communities",
    // },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
  ];