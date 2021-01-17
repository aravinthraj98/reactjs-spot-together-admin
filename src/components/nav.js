import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { colorOne, colorTwo } from './color';

export default function Nav(props) {
  function logout() {
    if (window.confirm('Do you want to logOut')) {
      console.log('log');
      props.home();
    }
  }
  return (
    <nav
      className='navbar navbar-expand-lg navbar-light'
      style={{
        backgroundColor: colorTwo,
        textAlign: 'right',
        justifyContent: 'right',
        alignSelf: 'right',
      }}
    >
      <Row style={{ textAlign: 'right', alignSelf: 'right' }}>
        <Col md={5} style={{ textAlign: 'right' }}>
          <button
            style={{ backgroundColor: colorTwo, textAlign: 'left' }}
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
            <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  style={{
                    fontWeight: 'normal',

                    color: 'white',
                    borderWidth: '1%',
                    borderRadius: '5%',
                    height: '90%',
                  }}
                  href='/'
                >
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  style={{
                    fontWeight: 'normal',

                    color: 'white',
                    borderWidth: '1%',
                    borderRadius: '5%',
                    height: '90%',
                  }}
                  href='#'
                >
                  profile
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  style={{
                    fontWeight: 'normal',

                    color: 'white',
                    borderWidth: '1%',
                    width: '95%',
                    borderRadius: '5%',
                    marginLeft: '2%',
                    height: '90%',
                  }}
                  onClick={logout}
                  href=''
                >
                  logOut
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  style={{
                    fontWeight: 'normal',

                    color: 'white',
                    borderWidth: '1%',
                    width: '95%',
                    borderRadius: '5%',
                    marginLeft: '2%',
                    height: '90%',
                  }}
                  href='/Myvideo'
                >
                  ShowmyVideos
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </nav>
  );
}
