import { sendOtp } from "services/auth";
import styles from "./SendOtp.module.css";

const SendOtpForm = ({ mobile, setMobile, setStep }) => {
  const submitHandler = async (event) => {
    event.preventDefault();

    if (mobile.length !== 11) return;

    const { response, error } = await sendOtp(mobile);

    if (response) setStep(2);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار شمره مبایل خود را وارد کنید. کد فعال سازی
        برای شما ارسال خواهد شد
      </span>
      <label htmlFor="input">شماره مبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="شماره مبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
};

export default SendOtpForm;
