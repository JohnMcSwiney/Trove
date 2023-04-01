import React from 'react';
import ReactLoading from 'react-loading';
 
const LoadingSign = ({ type, color }) => (
    <ReactLoading type="bars" color="blue" height={'15%'} width={'15%'} />
);
 
export default LoadingSign; 