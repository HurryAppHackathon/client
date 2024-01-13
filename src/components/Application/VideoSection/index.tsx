import { h } from 'preact';
import styles from '../../../styles/Application/index.module.scss';

export function VideoSection() {
  return (
    <div className={styles.video_section}>
      <video width="320" height="240" controls>
        <source
          src="http://172.20.10.6:9000/streamingapi/videos/2/dJdhYXC2z955jV1zNzoK0jijZpdOXUuygyQlSkML.mp4"
          type="video/mp4"
        />
      </video>
      <div class={styles.details}>
        <div className={styles.title}>THis is an event!!</div>
        <div className={styles.description}>THis is an event!!</div>
      </div>
    </div>
  );
}
