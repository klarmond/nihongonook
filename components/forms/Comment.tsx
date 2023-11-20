"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import  { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/thread";
import * as z from "zod";
import { Input } from "../ui/input";
// import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
// import { createThread } from "@/lib/actions/thread.actions";
import styles from "./Comment.module.css";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}


const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {


    const router = useRouter()
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread:"",
        }
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId, values.thread, JSON.parse(currentUserId), pathname
        )

        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form_container}>

            <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className={styles.thread_label}>
                        <Image src={currentUserImg} width={48} height={48} alt="Profile" className={styles.comment_img}/>
                    </FormLabel>
                    <FormControl>
                        <Input 
                            type="text"
                            placeholder="Comment here..."
                            className={styles.thread_input}
                            {...field}
                        />
                    </FormControl>
                    </FormItem>
                )}
            />  
            
            <Button type="submit" className={styles.thread_btn}>Comment</Button>    
            </form> 
        </Form>
    )
}

export default Comment;