"use client"
import styles from "./BottomBar.module.css";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"


const Bottombar = () => {
  const router = useRouter()
  const pathname = usePathname();

  return (
    <div>
        <section className={styles.bottombar}>
          <div className={styles.bottombar_container}>
            {
              sidebarLinks.map((link) => {
                const isActive = (pathname.includes(link.route) 
                                  && link.route.length > 1) 
                                  || pathname === link.route 
              
              return (
                <Link 
                  href={link.route}
                  key={link.label}
                  className={`${isActive && styles.active_leftsidebar_link}`}
                >
                  {/* <Image 
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24} 
                  /> */}

                  <p className="">{link.label}</p>
                </Link>
              )}
            )}
          </div>
        </section>
    </div>
  )
}

export default Bottombar