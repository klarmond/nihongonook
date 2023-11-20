import { fetchUser } from "@/lib/actions/user.actions";
import styles from "./page.module.css";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";



async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <>
            <main className={styles.main}>
                <h1>Create A Post</h1>
            </main>
            
            <PostThread userId={userInfo._id}/>
        </>
    )
}

export default Page;