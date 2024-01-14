import { h } from 'preact';
import styles from '../../../styles/Application/chat.module.scss';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { StateUpdater, useEffect, useRef, useState } from 'preact/hooks';
import { IUser } from 'src/utils/interfaces';
export function ChatSidebar({
  send,
  messages,
  setMessages,
}: {
  send: Function;
  messages: { user: IUser['data']['user']; message: string }[];
  setMessages: StateUpdater<{ user: IUser['data']['user']; message: string }[]>;
}) {
  const bottomRef = useRef<any>(null);
  const [content, setContent] = useState(``);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: `smooth` });
  }, [messages]);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.divider} />
          <div>Chat Section</div>
        </div>
      </div>
      <div className={styles.area}>
        <div className={styles.white_space} />
        <div className={styles.messages}>
          <div className={styles.divider}>
            <div>NEW</div>
            <span />
          </div>
          {messages.map((msg, i) => (
            <div
              key={i}
              ref={i == messages.length - 1 ? bottomRef : undefined}
              className={styles.message}
            >
              <img src={msg.user.avatar_url} />
              <div className={styles.wrapper}>
                <div className={styles.username}>{msg.user.username}</div>
                <div className={styles.content}>{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.input}>
        <ReactTextareaAutosize
          placeholder="Type your message here..."
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          maxRows={10}
          onKeyPress={(e: {
            key: string;
            which: string;
            keyCode: number;
            shiftKey: any;
            preventDefault: any;
          }) => {
            if (e.key === `Enter` && !e.shiftKey) {
              // Don't generate a new line
              e.preventDefault();
              setMessages((ar) => [...ar]);
              setContent(``);
              send(content);
            }
          }}
        />
        <div className={styles.buttons}>
          <div className={styles.wrapper}></div>
        </div>
      </div>
    </div>
  );
}
