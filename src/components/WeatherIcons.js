import React, {useState} from 'react';
import sun from '../icons/sun/26.png';
import cloud from '../icons/cloud/35.png';
import rain from '../icons/cloud/7.png';



function WeatherIcons(props){
    //console.log("props", props);
    const {icons} = props;
    return(
        <div>
            Today is {icons.icon}           
        </div>   
    );

}

export default WeatherIcons;