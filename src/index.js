import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history'

import Home from './containers/Home';
import CaloriePage from './containers/CaloriePage';
import notfound from './components/NotFound';
import Footer from './containers/Footer';
import Header from './containers/Header';
import DietPage from './containers/DietPage';
import WorkoutPage from './containers/WorkoutPage';


const history = createBrowserHistory();

ReactDOM.render(
        <Router history={history}>
            <Header/>
            <Switch>
                <Route path="/calorie" component={CaloriePage}/>
                <Route path="/dietmanage" component={DietPage}/>
                <Route path="/workout" component={WorkoutPage}/>
                <Route exect path="/" component={Home}/>
                <Route component={notfound}/>
            </Switch>
            <Footer/>
        </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
