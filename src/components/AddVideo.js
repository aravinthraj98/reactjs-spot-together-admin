import { useEffect, useState } from 'react';
import firebase, { storage } from '../firebase';

export default function AddVideo({ id, values }) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (id == null) return;
    console.log(values.email + 'email not empty');

    const UploadVideo = storage
      .ref()
      .child(`${values.email}/` + id)
      .put(values.video);
    UploadVideo.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (isNaN(NaN)) {
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
            setUrl(url);
            firebase.firestore().collection('video').add(data);
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
