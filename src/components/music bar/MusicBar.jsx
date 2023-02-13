import React, {useState} from 'react'
import NoSong from './NoSong.png';

import HeartIcon from '../../assets/Trv_icons/Trv_likeIcon_outline.svg'
import { RiFolderMusicFill, RiFolderMusicLine } from "react-icons/ri"
import { BsPlay, BsPause } from "react-icons/bs"
import { FaHeart, FaShareSquare, FaRegHeart, FaUserCircle } from "react-icons/fa"



import Trv_Chest from '../../assets/Trv_icons/Tvr_lib_icon.ico'

const MusicBar = () => {
    const songName = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const [isLiked, setIsLiked] = useState(false);
  const toggleLiked = () => {
    setIsLiked(!isLiked);
  }
  return (
   <>
         <div className="col-span-3  
                      mobilePlayerBg
                      lg:border-2 rounded-t-sm rounded-b-lg 
                      shadow-lg
                      flex-row 
                      h-14 
                      m-auto
                      pb-2
                      phone_lg:h-24
                      w-11/12
                      ">
          {/* Using Flex! */}

          {/* Small */}

          {/* progress bar */}
          <div className="flex-none h-1/6 font-body">
            {/* Song Progress and Range inp */}
            <div className='flex -inset-y-1 relative'>
              <input type="range" className="w-full progressBar" defaultValue="0 " onChange />
            </div>
          </div>
          
          <div className="flex flex-row h-5/6 mx-2">

            <div className="songBarItem w-10 m-auto flex justify-center">
              {/* Like */}
              <button className="box-border p-1" onClick={toggleLiked}>{isLiked ? <FaHeart /> : <FaRegHeart />}</button>
            </div>

            <div className=" songBarItem w-15 phone_sm:hidden phone_lg:w-40 box-border p-2 m-2 overflow-hidden border-white border-y-1 border-x-1">
              {/* Album */}
              <img src={NoSong} className=" rounded-lg shadow-md w-0 phone_sm:w-10  phone_lg:w-20" />
            </div>

            <div className="songBarItem phone_sm:flex-auto inline-flex box-border justify-start px-1 ">
              {/* Song Info */}
              <div className=' h-fit overflow-ellipsis block w-full text-left'>
                <div className='text-body  truncate w-32 phone_sm:w-32 phone_lg:w-40'>{songName}</div>
                <div className='pl-1 text-sm truncate w-32 phone_sm:w-28 phone_lg:w-40 '><a className='cursor-pointer'> Artist </a></div>
              </div>
            </div>

            <div className="songBarItem w-28 flex-row">

              <div className=" w-1/3 flex justify-end">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.3529 6.7323C12.3529 4.92033 12.3529 3.10406 12.3529 1.2921C12.3529 0.840184 12.0206 0.517387 11.5836 0.560427C11.4288 0.577643 11.2649 0.646506 11.1329 0.728281C8.73821 2.23036 6.34358 3.73674 3.95349 5.24743C3.48913 5.5401 3.02932 5.82847 2.56496 6.12113C2.04142 6.45254 2.04142 7.01636 2.56952 7.34776C5.43307 9.15542 8.30117 10.9588 11.1647 12.7621C11.6291 13.0548 12.1754 12.8956 12.3211 12.4264C12.3529 12.3274 12.3529 12.2155 12.3529 12.1079C12.3529 10.3175 12.3529 8.52274 12.3529 6.7323ZM10.8961 10.9459C8.65627 9.53417 6.44373 8.13969 4.21298 6.7366C6.44828 5.3249 8.66082 3.93042 10.8961 2.52303C10.8961 5.34212 10.8961 8.12678 10.8961 10.9459ZM0.00188065 2.77266C0.00188065 2.7081 0.00187969 2.64354 0.00643158 2.57898C0.024642 2.2691 0.247717 2.01086 0.55729 1.942C0.871415 1.87313 1.21286 2.00225 1.35399 2.2777C1.41772 2.40682 1.44959 2.56607 1.44959 2.7124C1.45414 5.39807 1.45414 8.07943 1.45414 10.7651C1.45414 10.8254 1.45414 10.8813 1.44959 10.9416C1.41772 11.2514 1.14457 11.514 0.816786 11.5398C0.347874 11.5785 0.0109844 11.2773 0.00643158 10.8124C0.00643158 9.461 0.00643158 8.10526 0.00643158 6.75382C0.00187969 5.42389 -0.0026722 4.09828 0.00188065 2.77266Z" fill="white" />
                </svg>
              </div>
              <div className="w-1/4 flex box-border justify-center text-xl">
                <BsPlay className="h-auto w-28" />
              </div>
              <div className="w-1/3 flex justify-start">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.647064 6.7323C0.647064 4.92033 0.647064 3.10406 0.647064 1.2921C0.647064 0.840184 0.9794 0.517387 1.41644 0.560427C1.57123 0.577643 1.73512 0.646506 1.86715 0.728281C4.26179 2.23036 6.65642 3.73674 9.04651 5.24743C9.51087 5.5401 9.97068 5.82847 10.435 6.12113C10.9586 6.45254 10.9586 7.01636 10.4305 7.34776C7.56693 9.15542 4.69883 10.9588 1.83528 12.7621C1.37092 13.0548 0.824613 12.8956 0.678932 12.4264C0.647064 12.3274 0.647064 12.2155 0.647064 12.1079C0.647064 10.3175 0.647064 8.52274 0.647064 6.7323ZM2.10388 10.9459C4.34373 9.53417 6.55627 8.13969 8.78702 6.7366C6.55172 5.3249 4.33918 3.93042 2.10388 2.52303C2.10388 5.34212 2.10388 8.12678 2.10388 10.9459ZM12.9981 2.77266C12.9981 2.7081 12.9981 2.64354 12.9936 2.57898C12.9754 2.2691 12.7523 2.01086 12.4427 1.942C12.1286 1.87313 11.7871 2.00225 11.646 2.2777C11.5823 2.40682 11.5504 2.56607 11.5504 2.7124C11.5459 5.39807 11.5459 8.07943 11.5459 10.7651C11.5459 10.8254 11.5459 10.8813 11.5504 10.9416C11.5823 11.2514 11.8554 11.514 12.1832 11.5398C12.6521 11.5785 12.989 11.2773 12.9936 10.8124C12.9936 9.461 12.9936 8.10526 12.9936 6.75382C12.9981 5.42389 13.0027 4.09828 12.9981 2.77266Z" fill="white" />
                </svg>
              </div>
              {/* Controls */}
            </div>
          </div>





          {/* Medium */}

          {/* Large */}

        </div>
        


        <div className="mobileNav rounded row-span-1 col-span-3 h-12 m-auto md:hidden flex flex-row justify-around w-11/12">
          {/* Bot Nav */}
          <div className="bot_nav_item activeIcon">
            <svg className="mx-auto mt-2 mb-auto p-2/6 svgFill" width="20" height="20" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 13.6426C0 11.8681 0 10.0936 0 8.31905C0 7.6263 0.216715 7.02946 0.690455 6.54454C0.781171 6.45395 0.881963 6.36868 0.982759 6.29408C3.63873 4.27443 6.28965 2.24946 8.94562 0.229812C9.34377 -0.0739339 9.65119 -0.0792628 10.0544 0.229812C12.7053 2.24413 15.3512 4.26377 18.0021 6.28342C18.6724 6.78966 18.995 7.48242 18.995 8.3457C18.995 11.9001 18.9899 15.4598 19 19.0141C19 19.4937 18.6724 20.0053 18.0626 20C16.3491 19.9893 14.6355 19.9946 12.922 19.9946C12.6146 19.9946 12.3072 20 11.9947 19.9946C11.5966 19.984 11.2942 19.7442 11.1984 19.3605C11.1732 19.2592 11.1732 19.1527 11.1732 19.0461C11.1732 17.7565 11.1732 16.4669 11.1732 15.1773C11.1732 14.6018 11.0019 14.1009 10.5785 13.7279C10.0695 13.2696 9.47985 13.1523 8.84987 13.3868C8.22494 13.6213 7.85199 14.1009 7.73607 14.7936C7.71088 14.9375 7.70584 15.0867 7.70584 15.2306C7.70584 16.5202 7.7008 17.8098 7.70584 19.0994C7.70584 19.3445 7.63528 19.5577 7.47905 19.7335C7.32785 19.8987 7.14138 19.9786 6.92467 19.9946C6.86419 20 6.79868 20 6.7382 20C4.81804 20 2.89788 20 0.972681 20C0.902124 20 0.831569 20 0.766051 19.9946C0.337669 19.952 0.0403232 19.6269 0.00504471 19.174C4.92159e-06 19.11 0.00504471 19.0408 0.00504471 18.9768C4.92159e-06 17.1916 0 15.4171 0 13.6426ZM9.4748 1.87111C9.40424 1.9244 9.35385 1.9617 9.30345 1.999C7.49921 3.36852 5.69496 4.73804 3.89072 6.10757C3.22547 6.61381 2.56022 7.11472 1.89497 7.62097C1.68833 7.77551 1.56738 7.98333 1.56738 8.26043C1.56738 11.559 1.56738 14.8576 1.56738 18.1508C1.56738 18.1935 1.57745 18.2361 1.58249 18.2841C3.10955 18.2841 4.62653 18.2841 6.16366 18.2841C6.16366 18.2041 6.16366 18.1348 6.16366 18.0602C6.16366 17.1117 6.16366 16.1578 6.16366 15.2093C6.16366 14.9055 6.17878 14.5965 6.25438 14.2981C6.59709 12.9605 7.39841 12.0653 8.6634 11.7295C9.94854 11.3832 11.0674 11.7775 11.9594 12.8273C12.5188 13.4881 12.7759 14.2767 12.7759 15.1667C12.7708 16.1525 12.7759 17.133 12.7759 18.1189C12.7759 18.1881 12.7809 18.2574 12.7859 18.3267C14.3231 18.3267 15.8401 18.3267 17.3722 18.3267C17.3722 18.2414 17.3722 18.1615 17.3722 18.0816C17.3722 14.8629 17.3722 11.6443 17.3722 8.43096C17.3722 8.383 17.3722 8.34037 17.3722 8.29241C17.3772 8.06327 17.2814 7.88208 17.1252 7.73287C17.0748 7.68492 17.0143 7.64228 16.9589 7.59965C14.5751 5.77185 12.1862 3.94937 9.80239 2.12689C9.70159 2.0363 9.59576 1.95637 9.4748 1.87111Z" />
            </svg>
            <p className="bot_nav_text activeText ">Home</p>
          </div>

          <div className="bot_nav_item inactiveIcon">
            <svg className="mx-auto mt-2 mb-auto p-2/6 svgFillInactive" width="21" height="20" viewBox="0 0 22  21" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3327 15.959C13.0961 17.5878 10.6364 18.2306 7.9144 17.8187C5.54657 17.4568 3.59852 16.3584 2.09648 14.5861C-0.920703 11.0227 -0.651778 5.98022 2.71304 2.68516C5.99259 -0.52253 11.3251 -0.90945 15.0901 1.81147C17.189 3.32795 18.4418 5.34992 18.7763 7.83993C19.1108 10.3299 18.4155 12.5703 16.7954 14.5673C16.8676 14.6422 16.9397 14.7109 17.0053 14.7733C18.2056 15.9153 19.4125 17.0636 20.6194 18.2056C20.8489 18.4241 21.0064 18.6674 20.9998 18.9857C20.9932 19.3851 20.803 19.6909 20.4357 19.8781C20.0619 20.0653 19.6945 20.0341 19.3469 19.8032C19.2551 19.7408 19.1698 19.6597 19.0911 19.5848C17.8908 18.449 16.697 17.307 15.4967 16.1649C15.4442 16.1025 15.3983 16.0339 15.3327 15.959ZM16.7692 8.96949C16.7429 5.00044 13.4044 1.99869 9.46235 1.99245C5.40227 1.97997 2.11616 5.07532 2.10304 8.93828C2.08337 12.8075 5.36292 15.9528 9.42956 15.9465C13.4962 15.9403 16.7364 12.8574 16.7692 8.96949Z" />
            </svg>
            <p className="bot_nav_text inactiveText">Search</p>
          </div>

          <div className="bot_nav_item inactiveIcon svgFillInactive justify-center">
            <RiFolderMusicLine className='p-0.5 mx-auto inactiveText mb-2.5' size={28} />
            <p className="bot_nav_text inactiveText">Trove</p>
          </div>

        </div>
   </>

  )
}

export default MusicBar