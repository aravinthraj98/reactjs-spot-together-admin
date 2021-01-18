import { useEffect, useState } from 'react';
import firebase, { storage } from '../firebase';

export default function AddVideo({ id, values, type, uploaded }) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (id == null) return;
    console.log(values.email + 'email not empty');
    let file = values.video;
    if (type == 'music') {
      file = values.music;
      console.log(type);
      console.log(id);
    }

    const UploadVideo = storage
      .ref()
      .child(`${values.email}/` + id)
      .put(file);
    UploadVideo.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (isNaN(progress)) {
          setProgress(100);
        } else {
          setProgress(progress);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('hello');

        storage
          .ref(`${values.email}/`)
          .child(id)
          .getDownloadURL()
          .then((url) => {
            let vip = 'no';
            if (values.vip == 'yes') {
              vip = 'yes';
            }
            let data = {
              email: values.email,
              id,
              name: values.name,
              description: values.description,
              url,
              views: 0,
              vip: values.vip,
            };
            console.log('hello1');

            console.log(url);
            console.log(type);
            firebase.firestore().collection(type).add(data);
            uploaded();
            return;
          });
      }
    );
  }, []);
  return (
    <>
      {url}
      {progress}
      <meter value={progress} min={0} max={100} />
    </>
  );
}
