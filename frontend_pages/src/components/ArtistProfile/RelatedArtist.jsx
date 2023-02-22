import React from "react"

// Related Artist Component
export default function RelatedArtist(props) {

    return (
        <div className="artist--slide artist--slide--artists" id={"artist--slide-"+ props.index}> 
                <img src={props.cover} className="artist--artist--cover" alt="artist--cover"/>
        <span className="artist--artist--name"><a href="/">{props.name}</a></span>
        </div>

    )

}
