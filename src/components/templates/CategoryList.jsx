import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "services/admin";

import styles from "./CategoryList.module.css";
import Loader from "../modules/Loader";
import { deleteCategory } from "services/admin";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery(["get-categories"], getCategory);
  const { mutate, isLoading } = useMutation((id) => deleteCategory(id), {
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
    },
  });

  const deleteHandler = (id) => {
    mutate(id);
  };

  return (
    <div className={styles.list}>
      {isFetching ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug: {i.slug}</p>
            <button onClick={() => deleteHandler(i._id)} disabled={isLoading}>
              حذف دسته
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
