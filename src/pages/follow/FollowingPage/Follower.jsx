import React from "react"

// Follower page's follower Component
export default function Follower(props) {
    const [follow, setFollow] = React.useState('../assets/follow.png');

    function handleFollow() {


        if (follow === '../assets/follow.png') {
            setFollow('../assets/followed.png')
        } else {
            setFollow('../assets/follow.png')
        }

    }
 
    return (
        <div className="followers--follow">
                <div className="followers--tiny--icon">
                <div className="follower--circle--border"> 
                    <div className="follower--artist--icon">
                        <img width="215vmin" src={props.pfp} alt="genre"/>
                    </div>
                </div>
                </div>   

                <div className="follower--info">
                    <h5>{props.username}</h5>
                    <h6>{props.acctype}</h6>
                </div> 

                <div className="follower--follow--icon">
                    <img src={follow} id="follower--followbtn" alt="followbutton" onClick={() => handleFollow()}/>
            </div>
        </div>

    )
}