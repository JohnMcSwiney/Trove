import React, { Component } from "react";

export default function PopUp(props) { 
        function handleClick() {
        props.togglePop();
       };
     

       return (
        <div className="createplaylist--modal">
          <div className="createplaylist--modal_content">
          <span className="createplaylist--close" onClick={handleClick}>&times;    </span>
          <p>I'm A Pop Up!!!</p>
         </div>
        </div>
       );

}
