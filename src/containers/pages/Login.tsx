import { h } from 'preact';
import styles from '../../styles/login.module.scss';
import { ApiClient } from '../../utils/client';
import { useForm, SubmitHandler } from "react-hook-form"
import { LoginDto, RegisterDto } from 'src/utils/interfaces';
import {toast } from 'react-toastify'




export function Login() {  
  const client = new ApiClient();
  const onSubmit: SubmitHandler<LoginDto> =  async (data) => {
    let res = await client.login(data);
    if(res) {
      toast.success("you are going to be redirected to home page in 3 seconds!");
      setTimeout(() => {
        location.href = "/"
      }, 3000)
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterDto>()
  return (
    <div class={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.login_container}>
          <div className={styles.header_container}>
            <div class={styles.depth}>START FOR FREE</div>
            <div className={styles.title_container}>
              <div class={styles.title}>
                Welcome back<span style={{ color: `#FF4646` }}>!</span>
              </div>
              <div class={styles.paragraph}>
                Create account?
                <a href="/register" className={styles.login_span}>
                  {" "}
                  Register
                </a>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} type="text" placeholder={`Username`} />
            <input {...register("password")} type="password" placeholder={`******`} />
            <div>
              <button disabled>Another Method</button>
              <button type="submit"
              //  onClick={async (e) => {
              //     e.preventDefault();
              //     await client.register({
              //       username: ``,
              //       email: ``,
              //       first_name: ``,
              //       last_name: ``,
              //       password: ``,
              //     });
                // }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.vector_section}></div>
    </div>
  );
}
