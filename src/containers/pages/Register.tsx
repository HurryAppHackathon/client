import { h } from 'preact';
import styles from '../../styles/login.module.scss';
import { ApiClient } from '../../utils/client';
import { useForm, SubmitHandler } from "react-hook-form"
import { RegisterDto } from 'src/utils/interfaces';
import {toast } from 'react-toastify'




export function Register() {  
  const client = new ApiClient();
  const onSubmit: SubmitHandler<RegisterDto> =  async (data) => {
    let res = await client.register(data);
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
                Create new account<span style={{ color: `#FF4646` }}>.</span>
              </div>
              <div class={styles.paragraph}>
                Already have an account?
                <a href="/login" className={styles.login_span}>
                  {" "}
                  log In
                </a>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input {...register("first_name")} type="text" placeholder={`First Name`} />
              <input {...register("last_name")} type="text" placeholder={`Last Name`} />
            </div>
            <input {...register("username")} type="text" placeholder={`Username`} />
            <input {...register("email")} type="email" placeholder={`example@gmail.com`} />
            <input {...register("password")} type="password" placeholder={`******`} />
            <div>
              <button>Another Method</button>
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
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.vector_section}></div>
    </div>
  );
}
