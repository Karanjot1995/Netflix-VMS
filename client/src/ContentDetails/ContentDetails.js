import React, { useState, useEffect } from "react";
import { FaPlay, FaRegPlayCircle } from 'react-icons/fa';
import { BsPlayCircle, BsPlusCircle } from 'react-icons/bs';
import {AiOutlineMinusCircle} from 'react-icons/ai';
import { BASE_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setUserData } from "../actions";
// import useWindowSize from "./DeviceSize";


function ContentDetails(props) {
    let history = useHistory();
    const [content, setContent] = useState({})
    const { id } = useParams();
    const [inList, setInlist] = useState(false)
    const userData = useSelector(state => state.user.userData)
    const isLogged = useSelector(state => state.user.isLogged)
    const dispatch = useDispatch()

    function inListItem(uc,id){
        let cid = null
        uc.map(c=>{
            if(c.ContentID == id){
                cid = c.ContentID
            }
        })
        if(cid == id){
            setInlist(true)
        }else{
            setInlist(false)
        }
    }


    useEffect(async () => {
        fetch(`/api/content/${id}`, {
               method: "POST",
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({id})
        }).then(res => res.json()).then(data=>{
            setContent(data[0])
            if(userData.userContent?.length){
                inListItem(userData.userContent, data[0].ContentID)
            }
        });
    },[]);

    useEffect( () => {
        if(userData.userContent?.length){
            inListItem(userData.userContent, content.ContentID)
        }
    });


    function addToList(e,cid){
        if(isLogged){
            fetch(`/api/add-to-list`,{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid:userData.userDetails.CustomerID, contentID:cid})
            }).then(res=>res.json()).then(data=>{
                dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
                // inListItem(data.updatedContent)
            })
        }else{
            history.push('/login')
        }

    }

    function removeFromList(e,cid){
        fetch(`/api/remove-from-list`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid:userData.userDetails.CustomerID, contentID:cid})
        }).then(res=>res.json()).then(data=>{
            dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
            // inListItem(data.updatedContent)
        })
    }
    
    console.log(content, inList)

    return (
        <div className="content-details pt-50 m-pb-50">
            {/* <div className="banner-item" style={{"background-image": `url('${content['ImageData']}')`}}> */}
            <div className="banner-item">
                <img src={`${content['ImageData']}`}/>
                <div className="play-btn">
                    <a href={`/content/${content['ContentID']}`}>
                        <BsPlayCircle className="play-icon"/>
                    </a>
                </div>
            </div>
            <div className="description m-2">
                {content['ContentName'] && <h3 className="title fs-50">{content['ContentName']}</h3>}
                {content['AverageRating'] && <p>{content['AverageRating'].toFixed(1)}/10</p>}
                {content['avgRating'] && <p>{content['avgRating'].toFixed(1)}/10</p>}
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                {!inList?
                    <a className="title-text" onClick={(e)=>addToList(e,content['ContentID'])}>
                        <BsPlusCircle className="add-list"/>
                        <span className="t"><span>Add to My List</span></span>
                    </a>
                    :
                    <a className="title-text" onClick={(e)=>removeFromList(e,content['ContentID'])}>
                        <AiOutlineMinusCircle className="add-list"/>
                        <span className="t"><span>Remove from My List</span></span>
                        {/* <span className="title">Remove from List<span className="arrow"></span></span> */}
                    </a>
                }
            
            </div>
        </div>

    );

}


export default ContentDetails