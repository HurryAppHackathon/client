import { h } from 'preact';
import styles from '../../styles/Application/index.module.scss';
import LeaveSVG from '../../assets/leave.svg';
import { IParty } from '../../utils/interfaces';

export function Wrap({
  onClick,
  image,
  title,
  color,
}: {
  onClick?: Function,
  image?: string;
  title: string;
  color?: string;
}) {
  return (
    <div onClick={onClick ? onClick as any : () => {}} className={styles.wrap}>
      {image ? <img src={image} alt="" /> : ``}
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
        <Wrap title={"Party name"} />
        <div className={styles.divider} />
      </div>
      <div className={styles.members}>
        <Wrap image={`https://i.pravatar.cc/300`} title="Ahmed Ali" />
        <Wrap image={`https://i.pravatar.cc/500`} title="Ali Yosif" />
        <Wrap image={`https://i.pravatar.cc/400`} title="Mariam Mohammed" />
      </div>

      <div className={styles.tail}>
        <div className={styles.divider}></div>
        <Wrap
        onClick={() => location.href = '/'}
          image={LeaveSVG as unknown as string}
          color="red"
          title="Leave Party!"
        />
      </div>
    </div>
  );
}
