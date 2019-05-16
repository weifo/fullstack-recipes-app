import React from 'react';
import {render} from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./Main";
import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-router-dom'

render(
<HashRouter>
 <Router />
</HashRouter>
, 
    document.getElementById('root'));
registerServiceWorker();
