import React from "react"

// Follower page's follower Component
export default function Follower(props) {
    const [follow, setFollow] = React.useState('../assets/follow.png');
    const [follower, setFollower] = React.useState();

    function handleFollow() {


        if (follow === '../assets/follow.png') {
            setFollow('../assets/followed.png')
        } else {
            setFollow('../assets/follow.png')
        }

    }

    React.useEffect(() => {
        const fetchFollowers = async () => {
          const followersResponse = await fetch(`/api/users/${props.follower}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const followersJson = await followersResponse.json();
          if (followersResponse.ok) {
            setFollower(followersJson);
          }
        };
        fetchFollowers();
      }, []);
 
    return (
        <div className="followers--follow">
                <div className="followers--tiny--icon">
                <div className="follower--circle--border"> 
                    <div className="follower--artist--icon">
                        <img width="215vmin" src={follower?.imageURL} alt="profile"/>
                    </div>
                </div>
                </div>   

                <div className="follower--info">
                    <h5>{follower?.displayName}</h5>
                    <h6>LISTENER</h6>
                </div> 

                <div className="follower--follow--icon">
                    <img src={follow} id="follower--followbtn" alt="followbutton" onClick={() => handleFollow()}/>
            </div>
        </div>

    )
}