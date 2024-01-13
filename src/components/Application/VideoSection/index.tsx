import { h } from 'preact';
import styles from '../../../styles/Application/index.module.scss';
import { IParty } from 'src/utils/interfaces';

export function VideoSection() {
  return (
    <div className={styles.video_section}>
      <video width="320" height="240" controls>
        <source
          src="http://172.20.10.6:9000/streamingapi/videos/1/rMURXYdNF8pk6mfcDxcCBzmMl2TMu2qFIkNHZreF.mp4"
          type="video/mp4"
        />
      </video>
      <div class={styles.details}>
        <div className={styles.title}>The Matrix (1999)</div>
        <div className={styles.description}>When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.</div>
      </div>
    </div>
  );
}
