import React,  { useEffect } from "react";
import Slider from "../../img/CarPal.mp4";
import Imgone from "../../img/Group 38 (1).png";
import Imgtwo from "../../img/Group 29.png";
import Imgthree from "../../img/Group 39.png";
import dashboard from "../../App";
import { Link } from "react-router-dom";

import "./Landing-Page.scss";

function LandingPage() {
    return (
        <div className="mainContainer">
            <div className="hero">
                <video className="slider" autoPlay loop>
                    <source src={Slider} type="video/mp4" />
                </video>
                <Link to="/Signup">
                    <p className="overlaybutton">
                        Sign Up
                    </p>
                </Link>
            </div>
            <div className="main">
                <div className="intro">
                    <h1 data-testid="welcomeh1" className="introTitle">
                        Welcome to CarPal
                    </h1>
                    <p data-testid="firstptag" className="firstpara">
                        The future of networking and commuting at the same time.
                        Yeah, we did it seriously. Watch this, with Carpal you
                        will be able to join a community of drivers and riders
                        who are looking to save money, lessen the impact on the
                        enviorment, and gain a friend along the way.
                    </p>
                </div>
                <section className="container">
                    <div id="first">
                        <h2 data-testid="h2tag1">Features</h2>
                        <div className="features">
                            <div className="paraone">
                                <p className="para">
                                    With this awesome app, these are just a few
                                    of the features you will get such as SMS
                                    messaging, friends list, gamification (user
                                    stats and point system) and even driver's
                                    real-time location, but wait there's more
                                    and its just five clicks away front becoming
                                    a Carpaller.
                                </p>
                            </div>
                            <div className="imgone">
                                <img
                                    role= 'image'
                                    className="allimg"
                                    src={Imgone}
                                    alt="Temp img"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="second">
                        <h2 data-testid="h2tag2">Drivers</h2>
                        <div className="featuresflip">
                            <div className="paraone">
                                <p className="para">
                                    Are you a current driver who loves to drive
                                    or even hates to drive, well guess what you
                                    in luck. The Carpal developer kept you in
                                    mind when building this app I might even add
                                    that they made it just for you.
                                </p>
                            </div>
                            <div className="imgone">
                                <img
                                    className="allimg"
                                    src={Imgtwo}
                                    alt="Temp img"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="third">
                        <h2 data-testid="h2tag3">Riders</h2>
                        <div className="features">
                            <div className="paraone">
                                <p className="para">
                                    As a rider you gain many great features and
                                    here are just a few of those. Request a ride
                                    to your destination, customize the type of
                                    driver you are interested in meet, and rate
                                    each Carpal experience to make sure our
                                    community stays the best in the business.
                                </p>
                            </div>
                            <div className="imgone">
                                <img
                                    className="allimg"
                                    src={Imgthree}
                                    alt="Temp img"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="containertwo">
                <h2 className="padding">Ready to gooooooooo?</h2>
                <Link to="/Signup">
                    <button name="signup">sign Up</button>
                </Link>
            </section>
        </div>
    );
}

export default LandingPage;
