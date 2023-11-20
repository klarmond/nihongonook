import { fetchPosts } from '@/lib/actions/thread.actions';
import styles from './page.module.css'
import { UserButton, currentUser } from '@clerk/nextjs'
import User from '@/lib/models/user.model';
import ThreadCard from '@/components/cards/ThreadCard';



export default async function Home() {
  const result = await fetchPosts(1, 30); 
  const user = await currentUser();

  return (
    <main className={styles.main}>
      <h1>Home</h1>
      
      <section>
        { result.posts.length === 0 ?  (
          <p>No threads to show</p>
        ): (
          <>
            {
              result.posts.map((post) => (
                <ThreadCard 
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))
            }
          </>
        )

        }
      </section>
    </main>
  )
}
 