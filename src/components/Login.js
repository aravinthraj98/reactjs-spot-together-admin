import React, { useRef, useState } from 'react';
import { colorOne, colorTwo } from '../components/color';
import { auth } from '../firebase';
import Views from './totalVideos';

export default function Login(props) {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [login, isLogin] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(password);
      let c = await auth.signInWithEmailAndPassword(user, password);
      if (c.user) {
        console.log(user);
        props.setLogin(user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        className='container-fluid'
        style={{
          textAlign: 'center',
          position: 'fixed',
          height: '100vh',
          backgroundColor: colorOne,

          flex: 1,
        }}
      >
        <div
          className='container'
          style={{
            justifyItems: 'center',

            height: '80vh',
            width: '70%',
            margin: '5%',
            marginLeft: '15%',
          }}
        >
          <div class='row'>
            <div
              className='col'
              style={{
                height: '80vh',
                backgroundColor: colorTwo,
                borderTopLeftRadius: '2%',
                borderBottomLeftRadius: '2%',
              }}
            >
              <h5 style={{ color: colorOne, marginTop: '49%' }}></h5>
            </div>
            <div
              className='col'
              style={{
                height: '80vh',
                backgroundColor: 'white',
                borderTopRightRadius: '2%',
                borderBottomRightRadius: '2%',
              }}
            >
              <div
                className='container'
                style={{
                  backgroundColor: colorOne,
                  marginTop: '30%',
                  padding: 1,
                  borderRadius: '2%',
                }}
              >
                <h4 style={{ color: colorTwo, padding: 4 }}>LOGIN</h4>
                <input
                  type='text'
                  className='form-control'
                  placeholder='LoginId'
                  onChange={(e) => setUser(e.target.value)}
                  style={{ margin: '9%', width: '80%' }}
                />
                <input
                  type='password'
                  className='form-control mb-4'
                  placeholder='password'
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ margin: '9%', width: '80%' }}
                />

                <button
                  type='submit'
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: colorTwo,
                    width: '40%',
                    marginBottom: '2%',

                    borderRadius: '4%',
                    borderColor: 'none',
                    border: 'none',
                  }}
                >
                  login
                </button>
                <br />
                <a
                  href=''
                  style={{ color: colorTwo, padding: 4, fontSize: 12 }}
                >
                  forgot password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
