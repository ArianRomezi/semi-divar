import { useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "services/admin";

const CategoryForm = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
    },

    // onSuccess: (_, id) =>
    //   queryClient.setQueryData(
    //     (["get-categories"],
    //     (prev) => {
    //       return {
    //         ...prev,
    //         data: {
    //           count: prev.data.count + 1,
    //           posts: [...prev.data.category, id],
    //         },
    //       };
    //     })
    //   ),
  });
  //geting data from input
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  //submiting form and send it to server
  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {!!error && <p>مشکلی پیش آمده است</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکن</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
};

export default CategoryForm;
