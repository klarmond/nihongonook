"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import { IoCloseCircleSharp } from "react-icons/io5";

import styles from "./DeleteThread.module.css"

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    // <Image
    //   src='/assets/delete.svg'
    //   alt='delte'
    //   width={18}
    //   height={18}
    //   className='cursor-pointer object-contain'
      
    // />

    <IoCloseCircleSharp
        className={styles.x_button}
        size={20}
        onClick={async () => {
            await deleteThread(JSON.parse(threadId), pathname);
            if (!parentId || !isComment) {
            router.push("/");
            }
        }}
     />
    
  );
}

export default DeleteThread;
