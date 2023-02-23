import React from "react"

// User's Top Genres
export default function TopGenres(props) {

    return (
        <div className="user--slide user--slide--artists" id={"user--slide-"+ props.index}> 
                <h4>{props.index}</h4>
                <img src={props.cover} className="user--artist--cover" alt="artist--cover"/>
        <span className="user--artist--name"><a href="/">{props.name}</a></span>
        <span className="user--percentage"><h5>{props.percentage}%</h5></span>
        </div>

    )

}
