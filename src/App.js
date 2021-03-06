import React from "react";
import { Route } from "react-router-dom";
import TopNav from "./Components/Nav/TopNav";
import Nav from "./Components/Nav/Nav";
import Login from "./Components/Login-SignUp/Login";
import SignUp from "./Components/Login-SignUp/SignUp";
import Dashboard from "./Components/Dashboards/Dashboard";
import ProfilePage from "./Components/Profile-Pages/Profile-Pages";
import LandingPage from "./Components/Landing-Page/Landing-Page";
import AboutPage from "./Components/Landing-Page/AboutPage/AboutPage";
import ProtectedRoute from "./Utils/ProtectedRoute";
import RideFind from "./Components/Rides/RideFind/RideFind";
import Logout from "./Components/Login-SignUp/Logout";
import SavedRide from "./Components/Rides/SavedRide/SavedRide";
import RideRequests from "./Components/Rides/RideRequests/RideRequests";

import "./App.scss";
import RideInProgress from "./Components/Rides/RideInProgress/RideInProgress";

//TODO: update app to include loader if isLoading

function App() {
    return (
        <div className="App" role="App">
            <TopNav />
            <div className="container">
               
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <ProtectedRoute exact path="/logout" component={Logout} />
                <ProtectedRoute
                    exact
                    path="/profilepage"
                    component={ProfilePage}
                />
                <Route exact path="/saved" component={SavedRide} />

                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/about" component={AboutPage} />
                <ProtectedRoute exact path="/Home" component={RideFind} />
                <ProtectedRoute
                    exact
                    path="/requests"
                    component={RideRequests}
                />
                <ProtectedRoute path="/start" component={RideInProgress} />
            </div>
            <Nav />
        </div>
    );
}
export default App;
