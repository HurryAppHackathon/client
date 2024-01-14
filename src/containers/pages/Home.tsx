import { Fragment, h } from 'preact';
import styles from '../../styles/home.module.scss';
import { Wrap } from '../../components/Application';
import { useEffect, useState } from 'preact/hooks';
import React from 'preact/compat';
import { usePopup } from 'react-hook-popup';
import { toast } from 'react-toastify';
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import { Api, ApiClient } from '../../utils/client';
import { IParty, IUser, IVideo, TParties } from 'src/utils/interfaces';
import PartySVG from '../../assets/party.svg';
// import MyVideosSVG from '../../assets/party.svg'
export function Home() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const api_client = new ApiClient();
  useEffect(() => {
    (async () => {
      try {
        const user = await api_client.getUser();
        setUser(user);
        setLoading(false);
      } catch (_err) {
        location.href = '/login';
      }
    })();
  }, []);

  const options: {
    name: string;
    icon: string;
    jsx: () => h.JSX.Element;
    description: string;
  }[] = [
    {
      icon: '',
      name: 'My videos',
      jsx: MyVideos,
      description: 'You can see all your videos here',
    },

    {
      icon: '',
      name: 'Explore',
      description: "Let's explore",
      jsx: Parties,
    },
  ];

  const [current, setCurrent] = useState(options[0]);

  function GetCurrent() {
    return current.jsx();
  }

  return !loading ? (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div class={styles.head}>
          <Wrap title="Hurry App Hackathon" />
          <div class={styles.divider} />
        </div>
        <div class={styles.options}>
          {options.map((option, i) => (
            <Wrap
              onClick={() => setCurrent(options[i])}
              image={option.icon}
              title={option.name}
            ></Wrap>
          ))}
        </div>
        <div class={styles.tail}>
          <div className={styles.divider} />
          <Wrap
            image={user?.data.user.avatar_url}
            title={user?.data.user.username}
          />
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
  ) : (
    'Loading'
  );
}

function Parties() {
  const api = new Api();
  const [loading, setLoading] = useState(true);
  const [parties, setParties] = useState<IParty[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const parties = (await api.parties.getAll('public')).data;
        setParties(parties.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    })();
  }, []);
  const [showCreateParty, hideCreateParty] = usePopup(
    'create_party',
    CreateParty,
  );
  function CreateParty() {
    const [name, setName] = useState('');
    const [isPublic, setPublic] = useState(false);
    return (
      <div class={styles.create_party}>
        <div className={styles.wrapper} onClick={() => hideCreateParty()}>
          <div
            class={styles.create_party_container}
            onClick={(p) => p.stopPropagation()}
          >
            <input
              onChange={(c) => setName(c.currentTarget.value)}
              value={name}
              className={styles.ipt}
              type="text"
              placeholder={'Name of event'}
            />
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
            <button
              onClick={async () => {
                try {
                  const res = await api.parties.create({
                    name,
                    is_public: `${Number(isPublic)}`,
                  });
                  toast.success('Party has been created!');
                  toast.success(
                    'you will be redirected into application page in 3 seconds!',
                  );
                  setTimeout(() => {
                    location.href = '/app/' + res.data.data.id;
                  }, 3000);
                } catch (err) {
                  toast.error(err.response.data.message);
                }
              }}
            >
              Create!
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div class={styles.parties}>
      {parties.map((party) => (
        <div className={styles.party}>
          <div>
            <img src={party.image_url} alt="" />
            <div class={styles.name}>
              <div class={styles.title}>{party.name}</div>
              <div class={styles.user}>
                <img src={party.owner.avatar_url} alt="" />
                <div class={styles.name}>{party.owner.username}</div>
              </div>
            </div>
          </div>
          <button onClick={() => (location.href = `/app/${party.id}`)}>
            Join
          </button>
        </div>
      ))}
      <div className={styles.party} onClick={() => showCreateParty()}>
        <div class={styles.add_container}>
          <div class={styles.add}>+</div>
        </div>
      </div>
    </div>
  );
}

function MyVideos() {
  const api = new Api();
  const [videos, setVideos] = useState<IVideo['data'][]>([]);
  useEffect(() => {
    (async () => {
      try {
        const videos = (await api.videos.getAll('own')).data;
        setVideos(videos.data);
      } catch (err) {
        toast.error('Something went wrong while getting videos');
      }
    })();
  }, []);
  const [showVideoSettings, hideVideoSettings] = usePopup(
    'video_settings',
    VideoSettings,
  );
  function VideoSettings({ message: video }: { message: IVideo['data'] }) {
    const [isPublic, setPublic] = useState(video.is_public);

    const [description, setDescription] = useState(video.description);
    const [name, setName] = useState(video.name);
    return (
      <>
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
                <source src={video.url} type="video/mp4" />
              </video>
              <div class={styles.inputs}>
                Name:
                <input
                  className={styles.ipt}
                  onChange={(e) => setName(e.currentTarget.value.toString())}
                  type="text"
                  value={name}
                  placeholder={'Name'}
                />
                Description:
                <input
                  className={styles.ipt}
                  onChange={(e) => setDescription(e.currentTarget.value.toString())}
                  type="text"
                  value={description}
                  placeholder={'Name'}
                />
                <button
                  onClick={async () => {
                    try {
                      const res = await api.videos.edit(video.id, {
                        name: name,
                        description: description,
                        is_public: `${Number(isPublic)}`,
                      });
                      toast.success('created');
                    } catch (err) {
                      toast.error(err.response.data.message);
                    }
                  }}
                >
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
      </>
    );
  }

  const [showUploadVideo, hideUploadVideo] = usePopup('add_video', UploadVideo);
  function UploadVideo({ message }: { message: string }) {
    const api = new Api();
    const [isPublic, setPublic] = useState(true);
    const [files, setFiles] = useState<ExtFile[]>([]);
    const [thumbnails, setThumbnails] = useState<ExtFile[]>([]);
    const [description, setDescription] = useState('');
    const upload = async () => {
      const body = new FormData();
      body.append('file', files[0]!.file);
      body.append('thumbnail', thumbnails[0]!.file);
      body.append('name', files[0].name);
      body.append('description', description);
      body.append('is_public', `${Number(isPublic)}`);
      try {
        await api.videos.upload_videos(body);
        toast.success("Video has been uploaded!")
        toast.success("you will be redirected in 3 seconds")
        setTimeout(() => {
          location.href = "/"
        }, 3000)
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    const updateFiles = (incommingFiles: any) => {
      //do something with the files
      console.log('incomming files', incommingFiles);
      setFiles(incommingFiles);
      //even your own upload implementation
    };

    const updateThumbnails = (incommingFiles: any) => {
      //do something with the files
      console.log('incomming files', incommingFiles);
      setThumbnails(incommingFiles);
      //even your own upload implementation
    };
    const removeFile = (id: any) => {
      setFiles(files.filter((x: any) => x.id !== id));
    };

    const removeThumbnail = (id: any) => {
      setThumbnails(files.filter((x: any) => x.id !== id));
    };

    return (
      <>
        <div className={styles.upload_video}>
          <div className={styles.wrapper} onClick={() => hideUploadVideo()}>
            <div
              class={styles.upload_container}
              onClick={(e) => e.stopPropagation()}
            >
              <div>Video description: </div>
              <input
                class={styles.ipt}
                type="text"
                value={description}
                onChange={(c) => setDescription(c.currentTarget.value)}
                placeholder={'Description'}
              />

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

              <div>Upload the video: </div>

              <Dropzone
                maxFiles={1}
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

              <div class={styles.test}>Upload a thumbnail: </div>
              <Dropzone
                maxFiles={1}
                accept="image/png, image/jpeg, image/webp"
                onChange={updateThumbnails}
                value={thumbnails}
              >
                {thumbnails.map((file: any) => (
                  <FileMosaic
                    key={file.id}
                    {...file}
                    onDelete={removeThumbnail}
                    info
                  />
                ))}
              </Dropzone>

              <button
                onClick={async () => {
                  await upload();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.content}>
      {videos.map((video) => {
        return <Video video={video} showPopup={showVideoSettings} />;
      })}
      <div onClick={() => showUploadVideo()} class={styles.add_video}>
        +
      </div>
    </div>
  );
}

function Video({
  video,
  onClick,
  showPopup,
}: {
  video: IVideo['data'];
  onClick?: () => h.JSX.Element;
  showPopup: any;
}) {
  return (
    <div onClick={() => showPopup(video)} class={styles.video}>
      <img src={video.thumbnail_url} alt="" />
      <div class={styles.background} />
      <div class={styles.text}>
        <div class={styles.title}>{video.name}</div>
      </div>
    </div>
  );
}
