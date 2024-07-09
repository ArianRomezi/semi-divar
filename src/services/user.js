import api from "configs/api";

const getProfile = async () =>
  await api.get("user/whoami").then((res) => res || false);

const getPosts = async () => await api.get("post/my");

const getAllPosts = async (search) => {
  if (!search || search === "") {
    return await api.get("/");
  }
  return await api.get(search ? "?q=" + search : "");
};

const deletePosts = async (id) => await api.delete(`post/delete/${id}`);

export { getProfile, getPosts, getAllPosts, deletePosts };
