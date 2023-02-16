import React from "react"

export default function TopGenres(props) {

    return (
        <div className="slide slide--artists" id={"slide-"+ props.index}> 
                <h4>{props.index}</h4>
                <img src={props.cover} className="artist--cover" alt="artist--cover"/>
        <span className="artist--name"><a href="/">{props.name}</a></span>
        <span className="percentage"><h5>{props.percentage}%</h5></span>
        </div>

    )

}
