import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import Context from '../context';
import firebase, { storage } from '../firebase';

export default function Profile(props) {
  const db = firebase.firestore();
  const context = useContext(Context);
  const initialValue = {
    email: context[0],
    username: '',
    channelname: '',
    password: '',
  };
  const [values, setValue] = useState(initialValue);

  function handleInput(e) {
    let [name, value] = [e.target.name, e.target.value];
    setValue({ ...values, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();

    console.log(context[0]);

    let find = db
      .collection('users')
      .where('username', '==', values.username)
      .where('email', '==', context[0]);
    find.get().then((data) => {
      if (data.empty) {
        db.collection('users').add(values);
        console.log('propadd');
        props.profile();

        return;
      } else {
        data.forEach((d) => {
          console.log(d.data());
        });
        // db.collection
        //   ('users')
        //   .where('email', '==', context[0])
        //   .set(values);
        console.log('username already present');

        return;
      }
    });
    return;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>USERNAME</Form.Label>
        <Form.Control type='text' name='username' onChange={handleInput} />
        <Form.Label>channelname</Form.Label>
        <Form.Control type='text' name='channelname' onChange={handleInput} />
        <Form.Label>channelname</Form.Label>
        <Form.Control type='text' name='description' onChange={handleInput} />
        <Button type='submit'>SUBMIT</Button>
      </Form.Group>
    </Form>
  );
}
