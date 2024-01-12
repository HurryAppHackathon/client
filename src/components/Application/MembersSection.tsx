import { h } from 'preact';
import styles from '../../styles/Application/index.module.scss';
import LeaveSVG from '../../assets/leave.svg';

function Wrap({
  image,
  title,
  color,
}: {
  image?: string;
  title: string;
  color?: string;
}) {
  return (
    <div className={styles.wrap}>
      {image ? <img src={image} alt="" /> : ''}
      <div className={styles.title} style={{ color }}>
        {title}
      </div>
    </div>
  );
}

export function MembersSection() {
  return (
    <div className={styles.members_section}>
      <div className={styles.head}>
        <Wrap title="Hackathon!" />
        <div className={styles.divider} />
      </div>
      <div className={styles.members}>
        <Wrap image={'https://i.pravatar.cc/300'} title="Ahmed Ali" />
        <Wrap image={'https://i.pravatar.cc/500'} title="Ali Yosif" />
        <Wrap image={'https://i.pravatar.cc/400'} title="Mariam Mohammed" />
      </div>

      <div className={styles.tail}>
        <div className={styles.divider}></div>
        <Wrap
          image={LeaveSVG as unknown as string}
          color="red"
          title="Leave Party!"
        />	
      </div>
    </div>
  );
}
