import Image from "next/image";
import styles from "./ProfileHeader.module.css";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio: string;
}

const ProfileHeader = ({ 
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio
 } : Props) => {
    return (
        <div className={styles.main_container}>
            <div className={styles.profile_header_container}>
                <div>
                    <div>
                        <Image src={imgUrl} alt="Profile img" width={100} height={100} className={styles.profile_img}/>
                    </div>
                    <div>
                        <h2 className={styles.name}>{name}</h2>
                        <p className={styles.username}>@{username}</p>
                    </div>
                </div>
                {/*  */}
                <p className={styles.bio}>{bio}</p>
            </div>
        </div>
    )
}

export default ProfileHeader;