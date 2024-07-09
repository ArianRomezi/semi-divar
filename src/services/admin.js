import api from "configs/api";

const addCategory = async (data) => {
  await api.post("category", data);
};

const getCategory = async () => await api.get("category");
const getAllPost = async () => await api.get("post/admin");
const deleteCategory = async (id) => await api.delete(`category/${id}`);
const publishPost = async (id) => await api.patch(`post/${id}`);

export { addCategory, getCategory, deleteCategory, getAllPost, publishPost };
