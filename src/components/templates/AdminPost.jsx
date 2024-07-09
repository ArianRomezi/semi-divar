import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPost, publishPost } from "services/admin";
import { sp } from "utils/numbers";
import { deletePosts } from "services/user";
import styles from "./AdminPost.module.css";

const AdminPost = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const queryClient = useQueryClient();
  const { data } = useQuery(["admin", "get-post"], getAllPost);

  const { mutate, isLoading: loading } = useMutation((id) => deletePosts(id), {
    // onSuccess: () => queryClient.invalidateQueries("my-post-list"),
    onSuccess: (_, id) =>
      queryClient.setQueryData(["admin", "get-post"], (prev) => {
        return {
          ...prev,
          data: {
            post: prev.data.post.filter((item) => {
              return item._id !== id;
            }),
          },
        };
      }),
  });
  const { mutate: patch, isLoading: patchloading } = useMutation(
    (id) => publishPost(id),
    {
      // onSuccess: () => queryClient.invalidateQueries("my-post-list"),
      onSuccess: (_, id) =>
        queryClient.setQueryData(["admin", "get-post"], (prev) => {
          return {
            ...prev,
            data: {
              post: prev.data.post.map((item) => {
                if (id === item._id) {
                  return { ...item, public: true };
                }
                return item;
              }),
            },
          };
        }),
    }
  );

  return (
    <div className={styles.list}>
      {data?.data?.post?.map((post) => (
        <div key={post._id} className={styles.post}>
          <img src={`${BASE_URL}${post.images[0]}`} />
          <div className={styles.info}>
            <p>{post.options.title}</p>
            <div>
              <p>{sp(post.amount)} تومان</p>
              <span>{post.options.city}</span>
            </div>
          </div>

          <p>{post.public ? "منتشر شده" : "در حال بررسی"}</p>
          <br />
          {!post.public && (
            <button onClick={() => patch(post._id)}>انتشار</button>
          )}
          <button onClick={() => mutate(post._id)}>حذف</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPost;
