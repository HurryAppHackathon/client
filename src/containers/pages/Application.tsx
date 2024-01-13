import { h } from 'preact';
import styles from '../../styles/Application/index.module.scss';
import {
  ChatSection,
  MembersSection,
  VideoSection,
} from '../../components/Application';
import { Api, ApiClient } from '../../utils/client';
import { useEffect, useState } from 'preact/hooks';
import { IParty, IUser } from '../../utils/interfaces';
import { ReactLocation } from '@tanstack/react-location';
export function Application() {
  const api_client = new ApiClient();
  const api = new Api();
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState<IParty>();
  const [user, setUser] = useState<IUser>();
  const location = new ReactLocation();
  useEffect(() => {
    (async () => {
      try {
        let user = await api_client.getUser();
        // let party = await api.parties.get();
        setUser(user);
        setLoading(false);
      } catch (err) {
        // location.href = "/"
      }
    })();
  }, []);
  return !loading ? (
    <div className={styles.container}>
      <MembersSection  />
      <VideoSection  />
      <ChatSection />
    </div>
  ) : (
    'Loading...'
  );
}
