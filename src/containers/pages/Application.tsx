import { Attributes, h } from 'preact';
import styles from '../../styles/Application/index.module.scss';
import {
  ChatSection,
  MembersSection,
  VideoSection,
} from '../../components/Application';
import { Api, ApiClient } from '../../utils/client';
import { useEffect, useRef, useState } from 'preact/hooks';
import { IParty, IUser, IVideo } from '../../utils/interfaces';
import { ReactLocation, useLocation, useMatch } from '@tanstack/react-location';
import { io } from 'socket.io-client';
import { setNextUploadStatus } from '@files-ui/react';
const socket = io('http://104.248.128.150:3000', {
  autoConnect: true,
  auth: {
    token: localStorage.getItem('token'),
  },
});
export function Application() {
  const location = useLocation();
  const {
    params: { id },
  } = useMatch();
  const api_client = new ApiClient();
  const api = new Api();
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState<IParty>();
  const [video, setVideo] = useState<IVideo['data']>();
  const [user, setUser] = useState<IUser>();
  // handle authorization

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isJoined, setJoin] = useState(false);
  const [fooEvents, setFooEvents] = useState([]);
  const [messages, setMessages] = useState<
    { user: IUser['data']['user']; message: string }[]
  >([]);
  const video_ref = useRef<HTMLVideoElement>();
  
  useEffect(() => {
    (async () => {
      try {
        let user = await api_client.getUser();
        let { data: party } = (await api.parties.get(id)).data;
        setUser(user);
        setParty(party);

        console.log('emmitting');
        console.log(party);
        socket.emit('join-party', { partyId: party!.id });

        setLoading(false);
      } catch (err) {
        // location.href = "/"
      }
    })();
  }, []);

  useEffect(() => {
    video_ref.current?.load();
  }, [video?.url]);

  useEffect(() => {
    socket.on(
      'party-joined',
      ({
        partyId,
        messages,
        video,
      }: {
        partyId: number;
        video?: IVideo['data'];
        messages: { user: IUser['data']['user']; message: string }[];
      }) => {
        setJoin(true);
        console.log(messages);
        setMessages(messages);
        if (video) {
          setVideo(video);
        }
      },
    );
    socket.on('video-set-receive', ({ video }: { video: IVideo['data'] }) => {
      setVideo(video);
    });
    function onConnect() {
      setIsConnected(true);
    }

    // socket.on("user", ({user}: {user: IUser}) => {
    //   console.log(user);
    // })

    function onDisconnect() {
      setIsConnected(false);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);



  function sendMessage(message: string) {
    socket.emit('message-send', { partyId: party?.id, message });
  }

  // return isJoied ? 'Joined' : 'not joined';
  return (
    <div className={styles.container}>
      <MembersSection party={party} />
      <VideoSection socket={socket} party={party} video={video} video_ref={video_ref} />
      <ChatSection
        send={sendMessage}
        socket={socket}
        party={party}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
