import { React, useState } from 'react';
import "./CardSong.css";
import { AiOutlineMenu } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiShareLine } from 'react-icons/ri';
import { FaHeart, FaShareSquare, FaRegHeart } from 'react-icons/fa'

export default function CardSong(props) {
        const [isLiked, setIsLiked] = useState(false)


        const toggleLiked = () => {
                setIsLiked(!isLiked)
        }

        return (
                <div className="song-card-cont">
                        <div className="song-card-art-img">
                                <img src={props.cover} alt="albumcover" />
                                {/* <img src='../assets/playmask.png' id="playmask" alt="albumcover"/> */}
                        </div>
                        <div className="song-card-info">
                                <div className='songCardTextCont'>

                                        <h3>{props.title}</h3>
                                        <h6>{props.artist}</h6>
                                </div>
                                <div><h5><span>{props.duration}</span></h5></div>

                        </div>
                        <div>
                                
                        </div>
                        <div className="song-card-options">
                                <button onClick={toggleLiked}>
                                        {isLiked ? <FaHeart className='text-white' /> : <FaRegHeart />}
                                </button>

                                <button><RiShareLine /></button>
                                <button className='moreBtnTransform'><GiHamburgerMenu /></button>
                        </div>


                </div>

        )
}
