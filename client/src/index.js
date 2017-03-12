import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/app';

import store from './js/store';
import {Provider} from 'react-redux';

ReactDOM.render(
    	<Provider store={store} >
    		<Layout />
    	</Provider>, 
        document.getElementById('app')
);
