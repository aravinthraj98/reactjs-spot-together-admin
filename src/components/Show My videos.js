import React, { useState, useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Context from '../context';
import { colorOne, colorTwo } from './color';

import firebase from '../firebase';
export default function ShowMyVideos() {
  const [context, setContext] = useContext(Context);
  const [videos, setVideo] = useState([]);
  const db = firebase.firestore().collection('video');
  useState(() => {
    console.log('videopage');

    getVideos();
  }, []);
  function getVideos() {
    let arrayValue = [];
    db.where('email', '==', context);
    db.get().then((doc) => {
      doc.forEach((data) => {
        let newData = data.data();
        newData['docid'] = data.id;

        arrayValue.push(newData);
      });
      setVideo(arrayValue);
      console.log(context);
    });
  }
  function handleDelete(id) {
    console.log(id);
    if (window.confirm('delete the video?')) {
      db.doc(id)
        .delete()
        .then(() => {
          console.log('deleted');
          getVideos();
        });
    }
  }
  return (
    <>
      <Container fluid style={{ backgroundColor: colorOne, width: '100%' }}>
        {videos.length}
        <Row>
          {videos.map((data) => (
            <Col
              md={4}
              style={{ color: 'white', marginTop: 10, marginBottom: 10 }}
            >
              <video width='100%' height='80%' controls>
                <source
                  src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  type='video/mp4'
                />
                Your browser does not support HTML5 video.
              </video>
              <div
                style={{
                  color: 'white',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                  justifyTracks: 'space-evenly',
                }}
              >
                <Row>
                  <Col md={6}>
                    {' '}
                    <span style={{ maxWidth: 10 }}>
                      {data.description}
                    </span>{' '}
                    {data.vip && data.vip == 'yes' && (
                      <i style={{ margin: 10, color: 'blanchedalmond' }}>
                        premium
                      </i>
                    )}
                  </Col>
                  <Col md={6} style={{ textAlign: 'right' }}>
                    <Button
                      className='btn btn-danger'
                      onClick={() => handleDelete(data.docid)}
                    >
                      DELETE
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
