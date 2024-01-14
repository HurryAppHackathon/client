import { Ref, h } from 'preact';
import styles from '../../../styles/Application/index.module.scss';
import { IParty, IVideo } from 'src/utils/interfaces';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { MutableRef, useEffect, useState } from 'preact/hooks';

export function VideoSection({
  socket,
  party,
  video,
  video_ref,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  party?: IParty;
  video?: IVideo['data'];
  video_ref: MutableRef<HTMLVideoElement | undefined>;
}) {
  function debounce(func, timeout = 300) {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      //@ts-ignore
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  useEffect(() => {
    socket.on('video-seek-receive', ({ time }: { time: number }) => {
      console.log('recived');
      if (video_ref.current) {
        if (Math.abs(video_ref.current.currentTime - time) > 1) {
          video_ref.current.currentTime = time;
        }
      }
    });
    socket.on('video-pause-receive', () => {
      video_ref.current!.pause();
    });
    socket.on('video-resume-receive', () => {
      video_ref.current!.play();
    });
  }, []);

  function pauseVideoSocket() {
    socket.emit('video-manage-send', {
      partyId: party?.id,
      action: 'pause',
    });
  }

  function resumeVideoSocket() {
    socket.emit('video-manage-send', {
      partyId: party?.id,
      action: 'resume',
    });
  }

  // time in secs
  function seekVideoSocket(time: number) {
    socket.emit('video-manage-send', {
      partyId: party?.id,
      action: 'seek',
      time,
    });
  }

  return (
    <div className={styles.video_section}>
      <video
        onPause={pauseVideoSocket}
        onPlay={resumeVideoSocket}
        onSeeked={(e) => {
          if (e.currentTarget.paused) {
            debounce(seekVideoSocket(e.currentTarget.currentTime), 250);
          }
        }}
        ref={video_ref}
        width="320"
        height="240"
        controls
      >
        <source src={video?.url} type="video/mp4" />
      </video>
      <div class={styles.details}>
        <div className={styles.title}>{video?.name}</div>
        <div className={styles.description}>{video?.description}</div>
      </div>
    </div>
  );
}
