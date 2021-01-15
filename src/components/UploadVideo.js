import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import AddVideo from './AddVideo';

export default function UploadVideo(props) {
  const [show, isshow] = useState(false);

  const [id, setId] = useState(null);

  const initialValue = {
    email: props.email,
    name: '',
    video: null,
    description: '',
    vip:"no"
  };
  const [values, setValue] = useState(initialValue);
  const UploadNow = (e) => {
    e.preventDefault();
    e.target.reset();

    let id = uuidv4();
    setId(id);
    setValue({ ...values, email: props.email });
    isshow(true);
  };
  function valueChange(e) {
    if (e.target.name == 'video' || e.target.name == 'image') {
      const [name, value] = [e.target.name, e.target.files[0]];
      console.log(e.target.files[0]);
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
    <Form onSubmit={UploadNow}>
      <p>{props.email}</p>

      <Form.Group controlId='newVideo'>
        <Form.Label>VIDEO NAME</Form.Label>
        <Form.Control
          type='text'
          placeholder='video name'
          contentEditable={true}
          defaultValue={initialValue.name}
          onChange={valueChange}
          name='name'
        />

        <Form.Control
          as='textarea'
          rows={3}
          placeholder='description'
          defaultValue={initialValue.description}
          name='description'
          onChange={valueChange}
        />

        <Form.File
          id='video'
          name='video'
          accept='video/mp4,.mp4'
          multiple={false}
          onChange={valueChange}
        />

        <Button type='submit' className='form-control'>
          SUBMIT
        </Button>
        <br></br>
        {show && <AddVideo id={id} values={values} />}
      </Form.Group>
    </Form>
  );
}
