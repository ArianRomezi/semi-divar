import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getPosts } from "services/user";
import Loader from "../modules/Loader";
import { sp } from "utils/numbers";
import styles from "./PostList.module.css";
import { deletePosts } from "../../services/user";

const PostList = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading } = useQuery(["my-post-list"], getPosts);
  const queryClient = useQueryClient();

  const { mutate, isLoading: loading } = useMutation((id) => deletePosts(id), {
    // onSuccess: () => queryClient.invalidateQueries("my-post-list"),
    onSuccess: (_, id) =>
      queryClient.setQueryData(["my-post-list"], (prev) => {
        return {
          ...prev,
          data: {
            count: prev.data.count - 1,
            posts: prev.data.posts.filter((item) => {
              return item._id !== id;
            }),
          },
        };
      }),
  });

  const removeHandler = (id) => {
    mutate(id);
  };

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${BASE_URL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
              <button
                onClick={() => removeHandler(post._id)}
                disabled={loading}
              >
                حذف پست
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
