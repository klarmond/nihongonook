import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import styles from "./page.module.css"
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";


async function Page({ params } : { params: { id: string } }) {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(params.id);

    if (!userInfo?.onboarded) redirect("/onboarding");

    // console.log(userInfo)
    return (
        <section>
            <ProfileHeader 
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
            
            <div className={styles.flex_container}>
                <h2>Posts</h2>
                <div className={styles.tabs_container}>
                    <Tabs defaultValue="threads">
                        {/* <TabsList className="tab">
                            {
                                profileTabs.map((tab) => (
                                    <TabsTrigger key={tab.label} value={tab.value} > 
                                        <Image 
                                            src ={tab.icon}
                                            alt={tab.label}
                                            width={24}
                                            height={24}

                                        />
                                        <p>{tab.label}</p>

                                        {tab.label === "Threads" && (
                                            <p>{userInfo?.threads?.length}</p>
                                        )}
                                    </TabsTrigger>
                                ))
                            }
                        </TabsList> */}

                        <div className={styles.profileTabs_container}>
                            {profileTabs.map((tab) => (
                                <TabsContent key={`content-${tab.label}`} value={tab.value}>
                                    <ThreadsTab 
                                        currentUserId={user.id}
                                        accountId={userInfo.id}
                                        accountType="User"
                                    />
                                </TabsContent>
                            ))}

                        </div>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}

export default Page;

