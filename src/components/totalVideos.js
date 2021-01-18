import React, { useState, useContext } from 'react';
import { colorOne, colorTwo } from './color';
import Context from '../context';
import firebase from '../firebase';

export default function Views(props) {
  const [view, setView] = useState(0);
  const [music, setMusix] = useState(0);
  const [context, setContext] = useContext(Context);
  function settotal() {
    firebase
      .firestore()
      .collection('video')
      .where('email', '==', context)
      .get()
      .then((data) => {
        setView(data.size);
      });
    firebase
      .firestore()
      .collection('music')
      .where('email', '==', context)
      .get()
      .then((data) => {
        setMusix(data.size);
      });
  }
  useState(() => {
    console.log(props);

    settotal();
    firebase
      .firestore()
      .collection('video')
      .onSnapshot((onSnapshot) => {
        settotal();
      });
    firebase
      .firestore()
      .collection('music')
      .onSnapshot((onSnapshot) => {
        settotal();
      });
  }, []);
  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: colorOne,
        color: colorTwo,
        margin: '4%',
      }}
    >
      <p style={{ fontSize: '15%' }}>Total Videos Posted:{view}</p>
      <p style={{ fontSize: '20%' }}>Total musics Posted:{music}</p>
    </div>
  );
}
