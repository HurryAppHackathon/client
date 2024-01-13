import { h } from 'preact';
import styles from '../../styles/Application/index.module.scss';
import { ChatSection, MembersSection, VideoSection } from '../../components/Application';
export function Application() {
  return <div className={styles.container}>
    <MembersSection />
    <VideoSection />
    <ChatSection />
  </div>;
}
