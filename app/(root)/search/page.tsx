import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import styles from "./page.module.css"


async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section className={styles.search_container}>
      <h1>Search</h1>

      <Searchbar routeType='search' />

      <div>
        {result.users.length === 0 ? (
          <p>No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;
