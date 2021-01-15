import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import Context from '../context';
import firebase, { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export default function Profile(props) {
  const [disable, setDisable] = useState(false);
  const db = firebase.firestore();
  const context = useContext(Context);
  const initialValue = {
    email: context[0],
    username: '',
    channelname: '',
    logo: null,
  };
  const [values, setValue] = useState(initialValue);

  function handleInput(e) {
    if (e.target.name == 'logo') {
      console.log('logo');
      let [name, value] = [e.target.name, e.target.files[0]];
      setValue({ ...values, logo: value });
      return;
    }
    let [name, value] = [e.target.name, e.target.value];
    setValue({ ...values, [name]: value });
  }
  async function handleSubmit(e) {
    let urlI = '';
    e.preventDefault();
    setDisable(true);
    setValue('');

    e.target.reset();
    let id = uuidv4();
    let ImageUpload = storage
      .ref(`${values.email}/` + `${id}`)
      .put(values.logo);
    ImageUpload.on(
      'state_changed',
      (snapshot) => {
        if (
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100 ==
          100
        ) {
          window.alert('image stored');
        }
      },
      (err) => {
        console.log(err);
        return;
      },
      () => {
        storage
          .ref(`${values.email}/` + `${id}`)
          .getDownloadURL()
          .then((url) => {
            urlI = url;

            let find = db
              .collection('users')
              .where('username', '==', values.username)
              .where('email', '==', context[0]);
            find.get().then((data) => {
              if (data.empty) {
                console.log(urlI);

                let newData = {
                  ...values,
                  logo: url,
                };
                db.collection('users').add(newData);
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
          });
      }
    );

    return;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>USERNAME</Form.Label>
        <Form.Control
          type='text'
          name='username'
          placeholder='username'
          onChange={handleInput}
        />
        <Form.Label>channelname</Form.Label>
        <Form.Control type='text' name='channelname' onChange={handleInput} />
        <Form.Label>Description</Form.Label>
        <Form.Control type='text' name='description' onChange={handleInput} />
        <Form.Label>LOGO</Form.Label>
        <Form.File
          accept='image/png,.jpg,.png'
          name='logo'
          multiple={false}
          onChange={handleInput}
        />
        <Button type='submit' disabled={disable}>
          SUBMIT
        </Button>
      </Form.Group>
    </Form>
  );
}
