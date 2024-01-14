import { h } from 'preact';
import styles from '../../styles/invite.module.scss';
import { Api, ApiClient } from '../../utils/client';
import { toast } from 'react-toastify';
import { useMatch } from '@tanstack/react-location';
import { useEffect, useState } from 'preact/hooks';
import { IParty } from 'src/utils/interfaces';

function makeid(length: number) {
  let result = ``;
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function Invite() {
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState<IParty>();
  const {
    params: { id },
  } = useMatch();
  useEffect(() => {
    (async () => {
      try {
        const party = (await new Api().parties.get_hack(id)).data;
        setParty(party.data);
        setLoading(false);
      } catch (err) {
        toast.error(`يعني لازم يخرب البرسنتيشن :(`);
      }
    })();
  }, []);

  const [name, setName] = useState(``);
  return (
    <div className={styles.container}>
      <div class={styles.wrapper}>
        <img src={party?.image_url} alt="" />
        <div class={styles.invited}>You have been invited</div>
        <div class={styles.title}>{party?.name}</div>
        <div class={styles.divider} />
        <div class={styles.online}>
          <span />
          {party?.memberCounter} online
        </div>
        <input
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          placeholder={`What should we call you?`}
          type="text"
        />
        <button
          onClick={async () => {
            const api = new ApiClient();
            const res = await api.register({
              username: name,
              first_name: makeid(10),
              last_name: makeid(10),
              email: makeid(10) + `@gmail.com`,
              password: `password`,
            });
            toast.success(`you will be redirected to party in 3 seconds`);
            setTimeout(() => {
              location.href = `/app/` + id;
            }, 3000);
          }}
          type="text"
        >
          JOIN
        </button>
      </div>
    </div>
  );
}
