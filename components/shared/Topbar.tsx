import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./Topbar.module.css"
import { OrganizationSwitcher, SignOutButton, SignedIn, currentUser } from '@clerk/nextjs'
import { BiSolidLogOutCircle } from "react-icons/bi"
import { fetchUser } from '@/lib/actions/user.actions'
// import { dark } from "@clerk/themes";

const Topbar = async () => {
    // const user = await currentUser();

    // const userInfo = await fetchUser();

  return (
    <nav className={styles.topbar_container}>
        <Link href="/" >
            <Image src="/assets/logo.svg" width={60} height={60} alt="logo" />
            <p>NihongoNook</p>
         </Link>


         <div className=''>
            <div className="">
                {/* <SignedIn>
                    <SignOutButton>
                        <div className={styles.logout_space}>
                            <h4><BiSolidLogOutCircle />Logout</h4>
                        </div>
                    </SignOutButton>
                </SignedIn> */}
            </div>

            {/* <OrganizationSwitcher 
                appearance={{
                    
                }}
            /> */}
         </div>
    </nav>
  )
}

export default Topbar