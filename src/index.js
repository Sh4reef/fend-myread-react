import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes'

ReactDOM.render(
  <Router>
    <App children={routes}/>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
