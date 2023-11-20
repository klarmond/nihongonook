"use client"
import Link from "next/link";
import styles from "./LeftSidebar.module.css";
import { sidebarLinks } from "@/constants/"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { BiSolidLogOutCircle } from "react-icons/bi";

import { IoHome } from "react-icons/io5"
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { BsPersonCircle, BsActivity } from "react-icons/bs";
import { IconType } from "react-icons/lib";

type Props = {
  icon: any;
};


const LeftSidebar = () => {
  const router = useRouter()
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className={styles.leftsidebar_container}>
      <div className={styles.leftsidebar_links}>
        {
          sidebarLinks.map((link) => {
             const isActive = (pathname.includes(link.route) 
                              && link.route.length > 1) 
                              || pathname === link.route 

          if(link.route === "/profile") link.route = `${link.route}/${userId}`
          
          return (
            <Link 
              href={link.route}
              key={link.label}
              className={`${isActive && styles.active_leftsidebar_link}`}
            >
              
              <div className={styles.link_div}>
                <span>{link.icon}</span>
                <p>{link.label}</p>
              </div>
            </Link>
          )}
          )}
      </div>

      <div className="">
        <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                <div className={styles.logout_space}>
                    {/* <Image src="/assets/logout.svg" alt="logout" width={24} height={24} /> */}
                    <BiSolidLogOutCircle />
                    <h4>Logout</h4>
                </div>
            </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar