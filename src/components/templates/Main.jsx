import { sp } from "utils/numbers";
import styles from "./Main.module.css";

const Main = ({ display }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <div className={styles.container}>
        {display?.map((post) => (
          <div key={post._id} className={styles.card}>
            <div className={styles.info}>
              <p>{post.options.title}</p>
              <div>
                <p>{sp(post.amount)} تومان</p>
                <span>{post.options.city}</span>
              </div>
            </div>
            <img src={`${BASE_URL}${post.images[0]}`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
