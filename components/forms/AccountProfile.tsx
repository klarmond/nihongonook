"use client"
import styles from "./AccountProfile.module.css";

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
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

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



const AccountProfile = ({ user, btnTitle }: Props) => {
    const [files, setfiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media");
    const router = useRouter()
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || ""
        }
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setfiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            }
            fileReader.readAsDataURL(file);
        }
    }

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const blob = values.profile_photo; //react hook form updates this value automatically, thats why we have it


        // a chatgpt generated function that tests to see if the imgage has been changed by the user
        const hasImageChanged = isBase64Image(blob);

        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            if(imgRes && imgRes[0].fileUrl) {
                values.profile_photo = imgRes[0].fileUrl;
            }
        }

     
        await updateUser({
          username: values.username,
          name: values.name,
          bio: values.bio,
          image: values.profile_photo,
          userId: user.id,
          path: pathname
        });

        if (pathname === "/profile/edit") {
          router.back()
        } else {
          router.push("/");
        }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form_container}>
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem
            className={styles.profile_photo_container}
            >
              <FormLabel className={styles.profile_photo_label}>
                {field.value ? (
                    <Image 
                        src={field.value}
                        alt="profile pic"
                        width={96}
                        height={96}
                        priority
                        className={styles.profile_photo}
                    />
                ) : (
                    <Image 
                        src="/assets/profile.png"
                        alt="profile pic"
                        height={96}
                        width={96}
                        className={styles.profile_photo}
                    />
                )}
              </FormLabel>
              <FormControl>
                <Input 
                     type="file"
                     accept="image/*"
                     placeholder="Upload a photo"
                     className={styles.file_input}
                     onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              
            </FormItem>
          )}
        />

    
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem
              className={styles.name}
            >
              <FormLabel className={styles.name_label}>
                Name
              </FormLabel>
              <FormControl>
                <Input 
                    type="text"
                    className={styles.name_input}
                    {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />      


        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem
              className={styles.username}
            >
              <FormLabel className={styles.username_label}>
                Username
              </FormLabel>
              <FormControl>
                <Input 
                    type="text"
                    className={styles.username_input}
                    {...field}
                />
              </FormControl>
            </FormItem>
          )}
        /> 



        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem
            className={styles.bio}
            >
              <FormLabel className={styles.bio_label}>
                Bio
              </FormLabel>
              <FormControl>
                <Textarea 
                    rows={10}
                    className={styles.bio_input}
                    {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />       




        <Button type="submit" className={styles.submit_button}>Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile