import React from "react"

// Related Artist Component
export default function RelatedArtist(props) {

    return (
        <div className="slide slide--artists" id={"slide-"+ props.index}> 
                <img src={props.cover} className="artist--cover" alt="artist--cover"/>
        <span className="artist--name"><a href="/">{props.name}</a></span>
        </div>

    )

}
