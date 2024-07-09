import { useQuery } from "@tanstack/react-query";

import { getCategory } from "services/admin";
import styles from "./Sidebar.module.css";
import { filterPosts } from "../../utils/helpers";

const Sidebar = ({ setDisplay, posts }) => {
  const { data } = useQuery(["get-categories"], getCategory);

  const categoryHandler = (category) => {
    setDisplay(filterPosts(posts, category));
  };

  return (
    <div className={styles.sidebar}>
      <h4>دسته ها</h4>
      <ul>
        <li onClick={() => categoryHandler(null)}>
          <img src="" />
          <p>همه</p>
        </li>
        {data?.data.map((category) => (
          <li key={category._id} onClick={() => categoryHandler(category._id)}>
            <img src={`${category.icon}.svg`} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
