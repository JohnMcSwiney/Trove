import React from "react"

import './FollowingPage.css';
// import NavBar from './nav bar/NavBar';
import followers from "../../../data/followers.json"
import Follower from "./Follower";


// User's Top Genres
export default function FollowingPage(props) {

    return (
        <section>
            {/* HEADER */}


            {/* FOLLOWER INFO */}
            <div className="followers--info">
                    <div className="followers--stats--info">
                        <h3>USERNAME</h3>
                    </div>
            </div> 

            <div className="followers--count">
                <h5>888 FOLLOWING</h5>

            </div>

            {/* <Follower /> */}
            <div className="followers--list">
            {
                    followers && followers.map((item, index)=>{
                    return(
                        <Follower
                        key={index}
                        {...item}

                        />
                
                
                ) })}
            </div>

            {/* <NavBar /> */}
        </section>

    )

}