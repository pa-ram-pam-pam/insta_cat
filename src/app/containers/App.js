import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import BlockOfSmallPhotos from './BlockOfSmallPhotos';
import BlockOfBigPhoto from './BlockOfBigPhoto';
import Auth from './Auth'
import PreAutorization from './PreAuthorization'

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/preauth' component={PreAutorization}/>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/feed' component={BlockOfSmallPhotos}/>
                    <Route path='/view/:id' component={BlockOfBigPhoto}/>
                    <Redirect from='/' to='/feed'/>
                </Switch>
            </Router>
        </>
    );
};

export default connect(null, null)(App);

