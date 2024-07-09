import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { getCategory } from "services/admin";
import styles from "./AddPost.module.css";
import { getCookie } from "utils/cookie";
import toast from "react-hot-toast";
import axios from "axios";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: null,
    images: null,
  });
  const { data } = useQuery(["get-categories"], getCategory);
  const queryClient = useQueryClient();

  const addHandler = (event) => {
    const e = select.current;
    console.log(select.current);
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    console.log(value, text);

    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      if (i === "category") {
        formData.append("category", value);
      } else formData.append(i, form[i]);
      console.log(form[i]);
    }

    console.log(formData);

    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        queryClient.removeQueries({ queryKey: ["admin", "get-post"] });
      })
      .catch((error) => toast.error("مشکلی پیش آمده است"));

    setForm({
      title: "",
      content: "",
      category: "",
      city: "",
      amount: null,
      images: null,
    });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const select = useRef();
  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">توضیخات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category" ref={select}>
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" />
      <button onClick={addHandler}>ایجاد</button>
    </form>
  );
};

export default AddPost;
