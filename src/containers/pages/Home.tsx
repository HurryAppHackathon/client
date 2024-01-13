import { Fragment, h } from 'preact';
import styles from '../../styles/home.module.scss';
import { Wrap } from '../../components/Application';
import { useEffect, useState } from 'preact/hooks';
import React from 'preact/compat';
import { usePopup } from 'react-hook-popup';
import { toast } from 'react-toastify';
import { Dropzone, FileMosaic } from '@files-ui/react';
export function Home() {
  const options: {
    name: string;
    jsx: () => h.JSX.Element;
    description: string;
  }[] = [
    {
      name: 'My videos',
      jsx: MyVideos,
      description: 'You can see all your videos here',
    },

    {
      name: 'Explore',
      description: "Let's explore",
      jsx: Parties,
    },
  ];

  const [current, setCurrent] = useState(options[1]);

  function GetCurrent() {
    return current.jsx();
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div class={styles.head}>
          <Wrap title="My name" />
          <div class={styles.divider} />
        </div>
        <div class={styles.options}>
          {options.map((option, i) => (
            <Wrap
              onClick={() => setCurrent(options[i])}
              image={` `}
              title={option.name}
            ></Wrap>
          ))}
        </div>
        <div class={styles.tail}>
          <div className={styles.divider} />
          <Wrap image={` `} title="My name" />
        </div>
      </div>
      <div className={styles.home}>
        <div class={styles.head}>
          <div class={styles.title}>
            <div class={styles.name}>{current.name}</div>
            <div class={styles.divider} />
            <div class={styles.description}>{current.description}</div>
          </div>
          <div class={styles.divider} />
        </div>
        <GetCurrent />
      </div>
    </div>
  );
}

function Parties() {
  const [showCreateParty, hideCreateParty] = usePopup(
    'create_party',
    CreateParty,
  );
  function CreateParty() {
    const [isPublic, setPublic] = useState(false);
    return (
      <div class={styles.create_party}>
        <div className={styles.wrapper} onClick={() => hideCreateParty()}>
          <div
            class={styles.create_party_container}
            onClick={(p) => p.stopPropagation()}
          >
            <input type="text" placeholder={'Name of event'} />
            <div
              class={styles.public}
              onClick={() => {
                setPublic(!isPublic);
              }}
            >
              <div class={styles.text}>is public: </div>
              <div class={styles.object}>
                <div>
                  {isPublic ? (
                    <svg
                      width={15}
                      height={15}
                      fill={'rgb(30, 255, 0)'}
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56"
                        fill-rule="nonzero"
                      />
                    </svg>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <button>Create!</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div class={styles.parties}>
      <div className={styles.party}>
        <div>
          <img src="https://i.pravatar.cc/500" alt="" />
          <div class={styles.name}>
            <div class={styles.title}>Name of the party</div>
            <div class={styles.user}>
              <img src="https://i.pravatar.cc/400" alt="" />
              <div class={styles.name}>Mr.Kasper</div>
            </div>
          </div>
        </div>
        <button>Join</button>
      </div>
      <div className={styles.party} onClick={() => showCreateParty()}>
        <div class={styles.add_container}>
          <div class={styles.add}>+</div>
        </div>
      </div>
    </div>
  );
}

function MyVideos() {
  const [showVideoSettings, hideVideoSettings] = usePopup(
    'video_settings',
    VideoSettings,
  );
  function VideoSettings() {
    const [isPublic, setPublic] = useState(true);
    return (
      // onClick={() => hidePopup()}
      <Fragment>
        <div
          className={styles.video_settings}
          onClick={() => hideVideoSettings()}
        >
          <div className={styles.wrapper} onClick={(p) => hideVideoSettings()}>
            <div
              onClick={(e) => e.stopPropagation()}
              className={styles.edit_video_container}
            >
              <video width="320" height="240" controls>
                <source
                  src="http://172.20.10.6:9000/streamingapi/videos/2/dJdhYXC2z955jV1zNzoK0jijZpdOXUuygyQlSkML.mp4"
                  type="video/mp4"
                />
              </video>
              <div class={styles.inputs}>
                Title:
                <input type="text" placeholder={''} value={'test'} />
                Description:
                <input type="text" placeholder={''} value={'description'} />
                <button onClick={() => toast.success('Data Saved!')}>
                  Save
                </button>
                <div
                  class={styles.public}
                  onClick={() => {
                    setPublic(!isPublic);
                  }}
                >
                  <div class={styles.text}>is public: </div>
                  <div class={styles.object}>
                    <div>
                      {isPublic ? (
                        <svg
                          width={15}
                          height={15}
                          fill={'rgb(30, 255, 0)'}
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56"
                            fill-rule="nonzero"
                          />
                        </svg>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  const [showUploadVideo, hideUploadVideo] = usePopup('add_video', UploadVideo);
  // useEffect(() => {
  //   showUploadVideo();
  // }, []);
  function UploadVideo() {
    const [isPublic, setPublic] = useState(true);
    const [files, setFiles] = useState([]);
    const updateFiles = (incommingFiles: any) => {
      //do something with the files
      console.log('incomming files', incommingFiles);
      setFiles(incommingFiles);
      //even your own upload implementation
    };
    const removeFile = (id: any) => {
      setFiles(files.filter((x: any) => x.id !== id));
    };
    useEffect(() => {
      console.log(files);
    }, [files]);
    return (
      // onClick={() => hidePopup()}
      <>
        <div className={styles.upload_video}>
          <div className={styles.wrapper} onClick={() => hideUploadVideo()}>
            <div
              class={styles.upload_container}
              onClick={(e) => e.stopPropagation()}
            >
              <Dropzone
                maxFiles={3}
                maxFileSize={2 * 1024 * 1024 * 1000}
                accept="video/*"
                onChange={updateFiles}
                value={files}
              >
                {files.map((file: any) => (
                  <FileMosaic
                    key={file.id}
                    {...file}
                    onDelete={removeFile}
                    info
                  />
                ))}
              </Dropzone>
              <button>Save</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.content}>
      <Video showPopup={showVideoSettings} />
      <div onClick={() => showUploadVideo()} class={styles.add_video}>
        +
      </div>
    </div>
  );
}

function Video({
  onClick,
  showPopup,
}: {
  onClick?: () => h.JSX.Element;
  showPopup: any;
}) {
  return (
    <div onClick={() => showPopup()} class={styles.video}>
      <img
        src="https://cdn.discordapp.com/attachments/1195575834426220604/1195636639083540581/image.png?ex=65b4b664&is=65a24164&hm=28341ca9d72876bc98df3798b3d3ab31e670718380246f4cce2e1dfa47db33f0&"
        alt=""
      />
      <div class={styles.background} />
      <div class={styles.text}>
        <div class={styles.title}>Let’s learn react native in 100sec!!</div>
      </div>
    </div>
  );
}
