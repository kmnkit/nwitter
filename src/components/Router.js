import React, { useState } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {/* isLoggedIn이 true여야 Navigation이 마운트 됨 */}
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )
                }
            </Switch>
        </Router>
    )
};

export default AppRouter;
