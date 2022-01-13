import React, { useState, useEffect } from "react";
import { FaRegPlayCircle } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import {AiOutlineMinusCircle} from 'react-icons/ai';
import { BASE_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserData } from "../actions";


function ListItem(props) {
    const [inList, setInlist] = useState(false)
    const userData = useSelector(state => state.user.userData)
    const isLogged = useSelector(state => state.user.isLogged)
    let history = useHistory();
    const dispatch = useDispatch()

    function addToList(e,cid){
        e.stopPropagation();
        e.preventDefault();
        if(isLogged){
            fetch(`/api/add-to-list`,{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userid:userData.userDetails.CustomerID, contentID:cid})
            }).then(res=>res.json()).then(data=>
                dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
            )
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
        }).then(res=>res.json()).then(data=>
            dispatch(setUserData({userData:{...userData,userContent:data.updatedContent}}))
        )
    }

    useEffect(async () => {
        if(userData.userContent?.length){
            userData.userContent.map(c=>{
                if(c.ContentID == props.item['ContentID']){
                    setInlist(true)
                }
            })
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
                <a href={`/content/${props.item['ContentID']}`} className="content-link">
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
            <div class='popup'>
                <a href={`/content/${props.item['ContentID']}`} className="content-link">
                    <div className="card-details text-center mb-3">
                    <img width={"100%"} heigth={'100px'} src={imgData?imgData:'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'}/>
                        <div className="p-3">
                            <div className="d-flex justify-content-between pb-3 text-start">
                                {props.item['ContentName']? <p className="title text-white">{props.item['ContentName']}</p>:''}
                                {props.item['AverageRating']? <p className="text-white">{props.item['AverageRating'].toFixed(1)}/10</p>:''}
                                {props.item['avgRating']? <p className="text-white">{props.item['avgRating'].toFixed(1)}/10</p>:''}
                                {/* {props.item['runningTime']? <p className="text-white">{props.item['runningTime']}/10</p>:''} */}
                            </div>
                            <div className="preview d-flex justify-content-start mb-2">
                                <FaRegPlayCircle className="preview-play-btn mr-10"/>
                                {!inList?
                                <a className="title-text" onClick={(e)=>addToList(e,props.item['ContentID'])}>
                                    <BsPlusCircle className="preview-play-btn"/>
                                    <span className="t"><span>Add to My List</span></span>
                                </a>
                                :
                                <a className="title-text" onClick={(e)=>removeFromList(e,props.item['ContentID'])}>
                                    <AiOutlineMinusCircle className="preview-play-btn"/>
                                    <span className="t"><span>Remove from My List</span></span>
                                    {/* <span className="title">Remove from List<span className="arrow"></span></span> */}
                                </a>
                                }

                            </div>
                            <div className="">
                            {/* {Array.isArray(props.item['Genre']) ? 
                                <p className="text-white">{geres.join(',')}</p>
                                :<p className="text-white">{props.item['Genre'].split(',').join(', ')}</p>
                            } */}
                                <p className="text-white">{g.length ? g.join(',') : ''}</p>
                                {/* {props.item['Genre']? <p className="text-white">{props.item['Genre'].split(',').join(', ')}</p>:''} */}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>

    );

}


export default ListItem