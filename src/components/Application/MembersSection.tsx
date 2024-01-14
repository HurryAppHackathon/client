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
  onClick?: Function;
  image?: string;
  title: string;
  color?: string;
}) {
  return (
    <div
      onClick={onClick ? (onClick as any) : () => {}}
      className={styles.wrap}
    >
      {image ? <img src={image} alt="" /> : ``}
      <div className={styles.title} style={{ color }}>
        {title}
      </div>
    </div>
  );
}

export function MembersSection({ party }: { party?: IParty }) {
  return (
    <div className={styles.members_section}>
      <div className={styles.head}>
        <Wrap title={party?.name} />
        <div className={styles.divider} />
      </div>
      <div className={styles.members}>
        {party?.members.map((member) => (
          <Wrap image={member.avatar_url} title={member.username} />
        ))}
      </div>

      <div className={styles.tail}>
        <div className={styles.divider}></div>
        <Wrap
          onClick={() => (location.href = `/`)}
          image={LeaveSVG as unknown as string}
          color="red"
          title="Leave Party!"
        />
      </div>
    </div>
  );
}
