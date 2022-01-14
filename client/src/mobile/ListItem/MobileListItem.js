import React, { useState, useEffect } from "react";
import { FaRegPlayCircle } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import {AiOutlineMinusCircle} from 'react-icons/ai';
// import { BASE_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserData } from "../../actions";
// import useWindowSize from "./DeviceSize";


function MobileListItem(props) {
    const [inList, setInlist] = useState(false)
    const userData = useSelector(state => state.user.userData)
    const isLogged = useSelector(state => state.user.isLogged)
    let history = useHistory();
    const dispatch = useDispatch()
    const width = window.innerWidth;
    // const windowSize = useWindowSize()
    // const [isMobile, setIsMobile] = useState(false)
   
    // useEffect(() => {
    //   if(windowSize.width>600){
    //     setIsMobile(false)
    //   }else{
    //     setIsMobile(true)
    //   }
    // },[])

    function addToList(e,cid){
        e.stopPropagation();
        e.preventDefault();
        if(isLogged){
            fetch(`/api/add-to-list`,{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid:userData.userDetails.CustomerID, contentID:cid})
            }).then(res=>res.json()).then(data=>{
                dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
                inListItem(data.updatedContent)
            })
        }else{
            history.push('/login')
        }

    }

    function removeFromList(e,cid){
        e.stopPropagation();
        e.preventDefault();
        fetch(`/api/remove-from-list`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid:userData.userDetails.CustomerID, contentID:cid})
        }).then(res=>res.json()).then(data=>{
            dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
            inListItem(data.updatedContent)
        })
    }

    function inListItem(uc){
        uc.map(c=>{
            if(c.ContentID == props.item['ContentID']){
                setInlist(true)
            }
        })
    }

    useEffect(async () => {
        if(userData.userContent?.length){
            inListItem(userData.userContent)
        }

    },[]);


    let imgData = props.item['ImageData'];
    let g = []

    if(props.item['Genre']){
        g = Array.isArray(props.item['Genre']) ? g = props.item['Genre'] : g = props.item['Genre'].split(',') ;
    }

    return (
        <div className={`list-item ${props.mrgBtm ? props.mrgBtm : ''}`}>
            <div class="card-item">
                <a href={`/content/info/${props.item['ContentID']}`} className="content-link">
                    <div className="list-details text-center">
                    <img width={"100%"} heigth={'100px'} src={imgData?imgData:'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'}/>
                    {/* <div className="card-desc">
                        {props.item['ContentName']? <p className="title text-white">{props.item['ContentName']}</p>:''}
                        {props.item['AverageRating']? <p className="text-white">{props.item['AverageRating'].toFixed(1)}/10</p>:''}
                        {props.item['avgRating']? <p className="text-white">{props.item['avgRating'].toFixed(1)}/10</p>:''}
                    </div> */}
                    </div>
                </a>
            </div>
            
        </div>

    );

}


export default MobileListItem