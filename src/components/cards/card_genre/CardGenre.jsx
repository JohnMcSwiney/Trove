import React from "react";
import recordAsset from "./recordAsset.png"
import './CardGenre.css'

const GenreCard = ({color, name, percent}) => {
    const genreName = name;
    const style = {
    backgroundColor: color
    }
    const percentage = percent;
    return ( 
        <div className="genreCardCont">
            <div className="genreFiller"></div>
            <div className="recordCont" style={style} >
                <img src={recordAsset} className="recordItem" />
                {/* <div className="genreSticker" style={style}></div> */}
                {/* <div className="recordCenter"></div> */}
            </div>
            <div className="genreNameCont">
                {genreName}
            </div>
            <div className="genrePercent">
                {Math.round(percent)
}{'%'}
            </div>
            
        </div>
     );
}
 
export default GenreCard;