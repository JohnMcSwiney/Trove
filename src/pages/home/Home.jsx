import { useState, useEffect } from "react";
import React from "react";
import TasteProfile from "../../components/taste Profile/TasteProfile";
import CardArtist from "../../components/cards/card_artist/CardArtist";
import CardAlbum from "../../components/cards/card_album/CardAlbum";
import CardDiscovery from "../../components/cards/card_discoverygame/CardDiscovery";
import { Navigate, useNavigate, Link } from "react-router-dom";

import "./home.css";
import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import LoadingSearch from "../../components/loadingitems/loadingSearch/LoadingSearch";
import CardCurated from "../../components/cards/card_curated/CardCurated";

import Slider from "react-slick";
import CardCarousel from "../../components/cards/card_carousel/CardCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const notify = () => {
    if (!toast.isActive("signinNotification")) {
      toast.dismiss();
      toast("You need to sign in for Discovery Game!", {
        toastId: "signinNotification",
        style: {
          backgroundImage: "linear-gradient(to right, #0034c4, #8650F4)",
          color: "white",
          fontWeight: "bold",
        },
      });
    }
  };
  const redirectDiscovery = () => {
    if (!user) {
      notify();
      return;
    }
    navigate("/discoverygame");
  };

  const userStorage = JSON.parse(localStorage.getItem("user"));
  const id = userStorage ? userStorage.id : null;
  const [done, setDone] = React.useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [curatedPlaylist, updateCurated] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setDone(false);
      setTimeout(() => {
        fetch(`/api/users/${id}`)
          .then((response) => response.json())
          .then((json) => {
            setUserInfo(json);
            setDone(true);
          });
      }, 500);
    };
    fetchUserInfo();
  }, []);

  // useEffect(() => {
  //   if () {
  //     try {
  //       setDone(false);
  //       const fetchCurated = async () => {
  //         const response = await fetch(`/api/curated`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ id }),
  //         });

  //         const json = await response.json();
  //         setDone(true);
  //       };
  //       fetchCurated();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [id]);

  useEffect(() => {
    const fetchCurated = async () => {
      setDone(false);
      setTimeout(async () => {
        const response = await fetch(`/api/curated/`, {
          method: "GET",
        });

        const json = await response.json();

        if (response.ok) {
          updateCurated(json);
          setDone(true);
        }
      }, 500);
    };

    fetchCurated();
  }, []);
  const settings = {
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: false,
    infinite: true,
    className: "test",
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    cssEase: "ease",
    dots: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    // dotsClass:"carousel-dots"
    // pauseOnDotsHover: true,
    // centerMode: true,
    // centerPadding: '-1vw',
    // focusOnSelect: true
  };

  return (
    <main className="container ">
      <div className="myTrvcontainer">
        {/* <h4 className='text-invisible'>...</h4> */}
        {/* <div className='homeShowcase'>
          <Slider {...settings}>
            <CardCarousel
              title={'Our Daily Mixtape'}
              imgUrl={
                'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
              }
            ></CardCarousel>
            <CardCarousel
              title={'Rock On!'}
              imgUrl={
                'https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80'
              }
            ></CardCarousel>
            <CardCarousel
              title={'Only on TroveMusic'}
              imgUrl={
                'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
              }
            ></CardCarousel>
            <CardCarousel
              title={'Ever wanted to be an artist?'}
              imgUrl={
                'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
              }
            ></CardCarousel>
          </Slider>
          <div className='carousel-dots'> ... </div>
        </div> */}
      </div>

      <div>
        <h4 className="homeHeaderText">Find Musical Treasures</h4>
        <div
          href={"/discoverygame"}
          className="my-3"
          onClick={redirectDiscovery}
        >
          <CardDiscovery />
          <ToastContainer />
        </div>
      </div>

      {userInfo?.likedArtists?.length > 0 && (
        <div>
          <h4 className=" homeHeaderText ">Artists you love:</h4>
          {!done ? (
            <LoadingSearch />
          ) : (
            <div>
              {userInfo?.likedArtists?.length > 0 &&
                userInfo?.likedArtists.map((artist) => {
                  return (
                    <div className="art-card-cont" key={artist._id}>
                      <CardArtist artist={artist} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      <h4 className="homeHeaderText">Try Something New:</h4>
      <ul className="homeCuratedShowcase">
        {curatedPlaylist?.length > 0 &&
          curatedPlaylist?.map((curatedPlaylist) => {
            return (
              <CardCurated
                key={curatedPlaylist._id}
                id={curatedPlaylist._id}
                name={curatedPlaylist.curatedPlaylistName}
                cover={curatedPlaylist.curatedPlaylistCoverUrl}
              />
            );
          })}
      </ul>
    </main>
    // </div>
  );
};

export default Home;
