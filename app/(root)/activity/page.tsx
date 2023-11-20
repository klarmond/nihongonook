import styles from "./page.module.css";

import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect("/onboarding");

    const activity = await getActivity(userInfo._id);

  return (
    <div className={styles.activity_container}>
      <h1>Activity</h1>

      <section className=''>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className={styles.person_container}>
                  <Image
                    src={activity.author.image}
                    alt='user_logo'
                    width={30}
                    height={30}
                    className='rounded-full object-cover'
                  />
                  <p>
                    <span>
                      {activity.author.name}
                    </span>{" "}
                    replied to your post
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className={styles.no_activity}>You have no activity yet.</p>
        )}
      </section>
    </div>
  )
}

export default Page;