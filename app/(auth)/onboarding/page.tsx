import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import styles from "./page.module.css"

async function Page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (userInfo?.onboarded) redirect("/");

    const userData = {
        id: user.id,
        objectId: userInfo?._id,
        username: userInfo ? userInfo?.username : user.username,
        name: userInfo ? userInfo?.name : user.firstName ?? "",
        bio: userInfo ? userInfo?.bio : "",
        image: userInfo ? userInfo?.image : user.imageUrl,
      };

    return (
        <main className={`${styles.onboarding_container}`}>
            {/* <h1>Onboarding</h1>
            <p>Complete your profile to use NinhongoNook</p> */}

            <section>
                <AccountProfile user={userData} btnTitle="Continue" />
            </section>
        </main>
    )
}

export default Page