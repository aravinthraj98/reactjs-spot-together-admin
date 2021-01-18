import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Container, ButtonGroup, Row } from 'react-bootstrap';
import Context from '../context';
import { colorOne, colorTwo } from './color';
import ReactAudioPlayer from 'react-audio-player';

import firebase from '../firebase';
export default function ShowMyVideos() {
  const db = firebase.firestore();
  const [context, setContext] = useContext(Context);
  const [type, setType] = useState('video');
  const [videos, setVideo] = useState([]);

  useEffect(() => {
    console.log('videopage');

    getVideos();
  }, [type]);

  function getVideos() {
    let arrayValue = [];
    let find = db.collection(type).where('email', '==', context);

    find.get().then((doc) => {
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
      db.collection(type)
        .doc(id)
        .delete()
        .then(() => {
          console.log('deleted');
          getVideos();
        });
    }
  }
  return (
    <>
      {type}
      <Container fluid style={{ backgroundColor: colorOne, width: '100%' }}>
        <ButtonGroup aria-label='Basic example' style={{ width: '100%' }}>
          <Button
            variant='primary'
            onClick={() => setType('music')}
            style={{ width: '48%', margin: '1%' }}
          >
            Music
          </Button>

          <Button
            variant='info'
            onClick={() => setType('video')}
            style={{ width: '48%', margin: '1%' }}
          >
            Video
          </Button>
        </ButtonGroup>
        <Row style={{ height: '30%' }}>
          {videos.map((data) => (
            <Col
              md={4}
              style={{ color: 'white', marginTop: 10, marginBottom: 10 }}
            >
              {type == 'video' ? (
                <video width='100%' height='80%' controls>
                  <source
                    src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    type='video/mp4'
                  />
                  Your browser does not support HTML5 video.
                </video>
              ) : (
                <audio controls>
                  <source src={data.url} type='audio/ogg' />
                  <source src={data.url} type='audio/mpeg' />
                  Your browser does not support the audio tag.
                </audio>
              )}
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
