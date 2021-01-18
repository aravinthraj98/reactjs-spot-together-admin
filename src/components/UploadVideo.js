import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import firebase from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import AddVideo from './AddVideo';

export default function UploadVideo(props) {
  const [show, isshow] = useState(false);
  const [upload, setUpload] = useState('video');

  const [id, setId] = useState(null);

  const initialValuevideo = {
    email: props.email,
    name: '',
    video: null,
    description: '',
    vip: 'no',
  };
  const initialValuemusic = {
    email: props.email,
    name: '',
    music: null,
    description: '',
    vip: 'no',
  };
  const [values, setValue] = useState(initialValuevideo);
  function selectUpload(type) {
    setUpload(type);
    if (type == 'music') setValue(initialValuemusic);
    else setValue(initialValuevideo);
  }

  const UploadNow = (e) => {
    e.preventDefault();
    e.target.reset();

    let id = uuidv4();
    setId(id);
    setValue({ ...values, email: props.email });
    isshow(true);
  };
  const Uploaded =()=>{
    isshow(false);
  }
  function valueChange(e) {
    if (e.target.name == 'video' || e.target.name == 'music') {
      const [name, value] = [e.target.name, e.target.files[0]];

      let premium = window.confirm('is this Video under your premium catagory');
      setValue({ ...values, [name]: value });
      if (premium) {
        setValue({ ...values, vip: 'yes' });
        console.log('ssddd');
      }

      console.log('ss');
    } else {
      const [name, value] = [e.target.name, e.target.value];
      setValue({ ...values, [name]: value });
    }
  }

  return (
    <>
      <ButtonGroup aria-label='Basic example' style={{ width: '100%' }}>
        <Button
          variant='primary'
          onClick={() => selectUpload('music')}
          style={{ width: '48%', margin: '1%' }}
        >
          Music
        </Button>

        <Button
          variant='info'
          onClick={() => selectUpload('video')}
          style={{ width: '48%', margin: '1%' }}
        >
          Video
        </Button>
      </ButtonGroup>
      <Form onSubmit={UploadNow}>
        <p>{props.email}</p>

        <Form.Group controlId='newVideo'>
          <Form.Label>{upload} NAME</Form.Label>
          <Form.Control
            type='text'
            placeholder={upload + 'name'}
            contentEditable={true}
            onChange={valueChange}
            name='name'
          />

          <Form.Control
            as='textarea'
            rows={3}
            placeholder='description'
            name='description'
            onChange={valueChange}
          />

          {upload == 'video' ? (
            <Form.File
              id='video'
              name='video'
              accept='video/mp4,.mp4'
              placeholder='choosevideo'
              title='video'
              multiple={false}
              onChange={valueChange}
            />
          ) : (
            <Form.File
              name='music'
              accept='audio/mp3,.mp3'
              placeholder='chooseMusic'
              multiple={false}
              onChange={valueChange}
            />
          )}

          <Button type='submit' className='form-control'>
            SUBMIT
          </Button>
          <br></br>
          {show && <AddVideo id={id} type={upload} uploaded={Uploaded} values={values} />}
        </Form.Group>
      </Form>
    </>
  );
}
