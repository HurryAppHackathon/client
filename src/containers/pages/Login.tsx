import { h } from 'preact';
import styles from '../../styles/login.module.scss';
export function Login() {
  return (
    <div class={styles.container}>
      <div className={styles.login_container}>
        <div className={styles.header_container}>
          <div class={styles.depth}>START FOR FREE</div>
          <div className={styles.title_container}>
            <div class={styles.title}>
              Create new account<span style={{ color: '#FF4646' }}>.</span>
            </div>
            <div class={styles.paragraph}>
              Already have an account?
              <span className={styles.login_span}> log In</span>
            </div>
          </div>
        </div>
        <form>
          <div>
            <input type="text" placeholder={'First Name'} />
            <input type="text" placeholder={'Last Name'} />
          </div>
          <input type="email" />
          <input type="password" />
          <div>
            <button>Another Method</button>
            <button>Create Account</button>
          </div>
        </form>
      </div>
      <div className={styles.vector_section}>325</div>
    </div>
  );
}
