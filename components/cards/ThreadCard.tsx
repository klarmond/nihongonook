import Image from "next/image";
import Link from "next/link";
import styles from "./ThreadCard.module.css";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai"
import { BsReply } from "react-icons/bs"
import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";

interface Props {
    id : string;
    currentUserId : string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    }
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: boolean;
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,

}: Props) => {
    return (
        <article >
            <div>
                <div>
                    <div className={`${isComment ? styles.comment_card : styles.thread_card}`} >
                        <DeleteThread
                            threadId={JSON.stringify(id)}
                            currentUserId={currentUserId}
                            authorId={author.id}
                            parentId={parentId}
                            isComment={isComment}
                        />
                        <Link href={`/profile/${author.id}`} className={styles.author_img_link}>
                            <Image src={author.image} width={40} height={40} alt="Profile" className={styles.author_img}/>
                        </Link>

                        <div>
                            <Link href={`/profile/${author.id}`} className={styles.author_name_link}>
                                <h4 className={styles.author_name}>{author.name}</h4>
                            </Link>

                            <p className={styles.author_content}>{content}</p>

                            <div className={styles.thread_icon_container}>
                                <div className={styles.thread_inner_icons}>
                                    {/* <AiOutlineHeart size={25}/>  */}
                                    <Link href={`/thread/${id}`}>
                                        <AiOutlineComment size={25}/>
                                    </Link>
                                    {/* <BsReply size={25}/>     */}
                                </div>

                                {isComment && comments.length > 0 && (
                                    <Link href={`/thread/${id}`}>
                                        <p>{comments.length} replies</p>
                                    </Link>
                                )}
                            </div>

                        </div>
                        <p className={styles.thread_time}>{formatDateString(createdAt)}</p>
                        
                    </div>

                    
                </div>
            </div>
        </article>
    )
}

export default ThreadCard;