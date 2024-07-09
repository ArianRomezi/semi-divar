import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import ClickAwayListener from "react-click-away-listener";
import cookie from "cookiejs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../services/user";

const Header = () => {
  const [isShowed, setIsShowed] = useState(false);
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  const showHandler = () => {
    setIsShowed(!isShowed);
  };
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    cookie.remove("accessToken");
    cookie.remove("refreshToken");
    queryClient.removeQueries(["profile"]);
    setTimeout(() => {
      navigate("/auth");
    }, 1000);
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="/divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="/location.svg" />
          <p>اصفهان</p>
        </span>
      </div>
      <div>
        <div className={styles.drop_down_wraper}>
          <button className={styles.list} onClick={showHandler}>
            دیوار من
          </button>
          {isShowed ? (
            <ClickAwayListener onClickAway={showHandler}>
              <div className={styles.drop_down}>
                {data.data.role === "ADMIN" ? (
                  <>
                    <Link to="/admin" onClick={showHandler}>
                      <span>
                        <img src="/profile.svg" />
                        <p>حساب</p>
                      </span>
                    </Link>
                    <Link to="/admin/post" onClick={showHandler}>
                      <span>
                        <img src="/confirm.svg" />
                        <p>پست ها</p>
                      </span>
                    </Link>
                  </>
                ) : null}

                <span>
                  <img src="/logout.svg" />
                  <button onClick={deleteHandler}>خروج از حساب</button>
                </span>
              </div>
            </ClickAwayListener>
          ) : null}
        </div>

        <Link to="/dashbord" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
};

export default Header;
