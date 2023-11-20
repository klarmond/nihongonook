"use client"

import Image from "next/image";
import styles from "./UserCard.module.css"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
}
const UserCard = ({id, name, username, imgUrl, personType}: Props) => {
    const router = useRouter();

  return (
    <article className={styles.container}>
        <div className={styles.img_container}>
            <Image src={imgUrl} width={48} height={48} alt="pfp" />
        </div>
        
        <div className="d">
            <h4>{name}</h4>
            <h3>@{username}</h3>
        </div>

        <Button onClick={() => router.push(`/profile/${id}`)}> View</Button>
        
    </article>
  )
}

export default UserCard