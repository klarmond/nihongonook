"use client"
import styles from "./PostThread.module.css";

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
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form";
import  { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidation } from "@/lib/validations/thread";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
// import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";


interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string
    };
    btnTitle: string;
}









function PostThread({ userId } : {userId: string}) {
    const router = useRouter()
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread:"",
            accountId: userId,
        }
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname
        }) 

        router.push("/");
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
                        {/* Content */}
                    </FormLabel>
                    <FormControl>
                        <Textarea 
                            rows={15}
                            className={styles.thread_input}
                            {...field}
                        />
                    </FormControl>
                    </FormItem>
                )}
            />  


            <Button type="submit" className={styles.thread_btn}>Post</Button>    
            </form> 
        </Form>
    )
}

export default PostThread;