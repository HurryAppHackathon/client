import { h } from 'preact';
import styles from '../../../styles/Application/chat.module.scss';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { useEffect, useRef, useState } from 'preact/hooks';
export function ChatSidebar() {
  const bottomRef = useRef<any>(null);
  const [arr, setArr] = useState<string[]>([]);
  const [content, setContent] = useState(``);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: `smooth` });
  }, [arr]);
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
          {arr.map((t, i) => (
            <div
              key={i}
              ref={i == arr.length - 1 ? bottomRef : undefined}
              className={styles.message}
            >
              <img src="https://i.pravatar.cc/400" />
              <div className={styles.wrapper}>
                <div className={styles.username}>Mr.Kasper</div>
                <div className={styles.content}>{t}</div>
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
              console.log(arr);
              setArr((ar) => [...ar, content]);
              setContent(``);
              // Do something else such as send the message to back-end
              // ...
            }
          }}
        />
        <div className={styles.buttons}>
          <div className={styles.wrapper}>
          </div>
        </div>
      </div>
    </div>
  );
}