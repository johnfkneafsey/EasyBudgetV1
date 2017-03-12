require('babel-polyfill');

console.log(`Client running in ${process.env.NODE_ENV} mode`);

import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/sign-in';

import store from './store';
import {Provider} from 'react-redux';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
    	<Provider store={store} >
    		<SignIn />
    	</Provider>, document.getElementById('signIn'))
);