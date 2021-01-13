import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import Context from '../context';
import Profile from './Profile';
import Views from './totalVideos';
import firebase from '../firebase';
import UploadVideo from './UploadVideo';

export default function AdminVideoPanel(props) {
  const [context, setContext] = useContext(Context);
  const [profile, isProfile] = useState(false);
  function setProfile() {
    isProfile(true);
  }
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .where('email', '==', context)
      .get()
      .then((docs) => {
        if (docs.empty) {
          console.log('no profile');

          return;
        } else {
          setProfile();
          console.log('show');
        }
      });
  }, []);
  return (
    <Container fluid='md'>
      <Row style={{ height: '45%', margin: '1%' }}>
        {!profile ? (
          <Profile profile={setProfile}></Profile>
        ) : (
          <Views email={context} />
        )}
      </Row>
      <Row style={{ height: '45%', margin: '1%' }}>
        <UploadVideo email={context} />
      </Row>
    </Container>
  );
}
