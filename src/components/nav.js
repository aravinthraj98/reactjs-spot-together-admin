import React from 'react';
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
      style={{ backgroundColor: colorTwo }}
    >
      <form className='form-inline my-2 my-lg-0'>
        <input
          className='form-control mr-sm-2'
          type='search'
          placeholder='Search'
        />
        <button
          style={{ backgroundColor: colorOne, color: colorTwo }}
          className='btn btn-outline-success my-2 my-sm-0'
          type='submit'
        >
          Search
        </button>
      </form>

      <button
        style={{ backgroundColor: colorTwo }}
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

      <div
        className='collapse navbar-collapse'
        style={{ marginLeft: '60%' }}
        id='navbarTogglerDemo02'
      >
        <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
          <li className='nav-item'>
            <a
              className='nav-link'
              style={{
                fontWeight: 'normal',
                backgroundColor: colorOne,
                color: colorTwo,
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
                backgroundColor: colorOne,
                color: colorTwo,
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
        </ul>
      </div>
    </nav>
  );
}
