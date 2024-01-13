import { h } from 'preact';
import styles from '../../styles/login.module.scss';
import { Api } from '../../utils/client';
export function Login() {
  const api = new Api();
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
                  {` `}
                  log In
                </a>
              </div>
            </div>
          </div>
          <form>
            <div>
              <input type="text" placeholder={`First Name`} />
              <input type="text" placeholder={`Last Name`} />
            </div>
            <input type="text" placeholder={`Username`} />
            <input type="email" placeholder={`example@gmail.com`} />
            <input type="password" placeholder={`******`} />
            <div>
              <button>Another Method</button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await api.auth.register({
                    username: ``,
                    email: ``,
                    first_name: ``,
                    last_name: ``,
                    password: ``,
                  });
                }}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.vector_section}>325</div>
    </div>
  );
}
