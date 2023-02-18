import React from "react"
import ReactDOM from 'react-dom'

import SongInfo from "./SongInfo"

export default function ReviewSongs(props) { 

    return (
        <div>
            <h1>Review Songs</h1>
            <div className="navigate--form---btns"> 
                <div className="back--btn" onClick={ () => props.handleFormNavigation('MusicDetails')}>
                  <img src="../assets/backbtn.png" id="back--icon" alt="back--icon"/>
                  <br/>
                  <label for="back--icon">Back</label>
                </div>
                <div className="next--btn" onClick={() => props.handleFormNavigation('ReviewSongs')}>
                  <img src="../../assets/nextbtn.png" id="next--icon" alt="next--icon"/>
                  <br/>
                  <label for="next--icon">Next</label>
                </div>
            
            </div>
        </div>
    )


}