import React from "react";

import TasteProfile from "../../components/taste Profile/TasteProfile";
import CardArtist from "../../components/cards/card_artist/CardArtist";
import CardAlbum from "../../components/cards/card_album/CardAlbum";
import CardDiscovery from "../../components/cards/card_discoverygame/CardDiscovery";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./home.css";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";

const Home = () => {
  const navigate = useNavigate();
  const redirectDiscovery = () => {
    navigate("/discoverygame");
  };
  const { user } = useAuthContext();
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`/api/users/${user?.id}`);
      const data = await response.json();

      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);
  return (
    // <div className=' '>
    <main className="test123456 container ">
      <div>
        <h4 className="homeHeaderText">Find Musical Treasures</h4>
        <div
          href={"/discoverygame"}
          className="my-3"
          onClick={redirectDiscovery}
        >
          <CardDiscovery />
        </div>
      </div>

      {userInfo && userInfo?.likedArtists?.length > 0 && (
        <div>
          <h4 className=" homeHeaderText ">Artists you love:</h4>
          {userInfo?.likedArtists &&
            userInfo?.likedArtists.map((artist) => {
              return (
                <div className="art-card-cont" key={artist._id}>
                  <CardArtist artist={artist} />
                </div>
              );
            })}
        </div>
      )}

      <h4 className="homeHeaderText">Suggested Albums:</h4>
      <div className="grid grid-flow-col overflow-scroll ">
        <CardAlbum />
      </div>
    </main>
    // </div>
  );
};

export default Home;
