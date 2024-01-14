import { h } from 'preact';
import styles from '../../../styles/Application/index.module.scss';
import { ChatSidebar } from './Chat';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { IParty, IUser } from 'src/utils/interfaces';
export function ChatSection({
  send,
  party,
  socket,
  messages,
  setMessages,
}: {
  send: Function;
  party?: IParty;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  messages: { user: IUser['data']['user']; message: string }[];
  setMessages: StateUpdater<{ user: IUser['data']['user']; message: string }[]>;
}) {
  useEffect(() => {
    socket.on(`message-receive`, (data) => {
      setMessages((c) => [...c, data]);
    });
  }, []);

  return (
    <div className={styles.chat_section}>
      <ChatSidebar messages={messages} setMessages={setMessages} send={send} />
    </div>
  );
}
