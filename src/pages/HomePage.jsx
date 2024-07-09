import { useEffect, useState } from "react";
import Sidebar from "components/templates/Sidebar";
import Main from "components/templates/Main";
import { useMutation } from "@tanstack/react-query";
import { getAllPosts } from "services/user";
import Loader from "components/modules/Loader";
import styles from "./HomePage.module.css";

const HomePgae = () => {
  // const { data, isLoading } = useQuery(["post-list"], getAllPosts);

  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  // console.log({ data });
  const {
    mutate,
    data,
    isLoading: isLoading,
  } = useMutation((search) => getAllPosts(search), {
    onSuccess: (data) => setDisplay(data?.data.posts),
  });
  useEffect(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      mutate(search);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search, mutate]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <Sidebar setDisplay={setDisplay} posts={data?.data.posts} />
          <div className={styles.main}>
            <input
              placeholder="جست و جوی محصول ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Main posts={data} display={display} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePgae;
