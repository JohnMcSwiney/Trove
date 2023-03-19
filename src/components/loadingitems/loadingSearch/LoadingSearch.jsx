import React from 'react'
import './LoadingSearch.css';

import ReactLoading from "react-loading";

function LoadingSearch() {
  return (
    <div className='loadingItemContainer'>
      <ReactLoading type={"bars"} color={"#8650F4"} height={100} width={100} />
    </div>
  )
}

export default LoadingSearch;
