import { h } from 'preact';
import styles from '../../styles/home.module.scss';
import { Wrap } from '../../components/Application';
export function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div class={styles.head}>
          <Wrap title="My name" />
          <div class={styles.divider} />
        </div>
        <div class={styles.options}>
          <Wrap image={` `} title="My name" />
          <Wrap image={` `} title="My name" />
          <Wrap image={` `} title="My name" />
          <Wrap image={` `} title="My name" />
        </div>
        <div class={styles.tail}>
          <div className={styles.divider} />
          <Wrap image={` `} title="My name" />
        </div>
      </div>
      <div className={styles.home}>
        <div class={styles.head}>
          <div class={styles.title}>
            <div class={styles.name}>Your library</div>
            <div class={styles.divider} />
            <div class={styles.description}>here is some description</div>
          </div>
          <div class={styles.divider} />
        </div>
        <div className={styles.content}>
          <Video />
          <Video />
          <Video /> <Video /> <Video /> <Video /> <Video /> <Video />
        </div>
      </div>
    </div>
  );
}

function Video() {
  return (
    <div class={styles.video}>
      <img
        src="https://cdn.discordapp.com/attachments/1195575834426220604/1195636639083540581/image.png?ex=65b4b664&is=65a24164&hm=28341ca9d72876bc98df3798b3d3ab31e670718380246f4cce2e1dfa47db33f0&"
        alt=""
      />
      <div class={styles.background}></div>
      <div class={styles.text}>
        <div class={styles.title}>Let’s learn react native in 100sec!!</div>
        <div class={styles.views}>10K views</div>
      </div>
    </div>
  );
}
