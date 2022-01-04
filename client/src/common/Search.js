import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import { FaSearch } from 'react-icons/fa';
import { useLocation, matchPath ,useHistory} from 'react-router-dom';
import { BASE_API_URL } from "../utils/constants";


function Search () {  
    const [result, setResult] = useState([]);
    const [disabled, setDisabled] = useState(false)
    const [toggle, setToggle] = useState('close-search')
    let history = useHistory();


    // useEffect(async () => {
    //     fetch('/search').then(res => res.json()).then(data=>setQuery(data))
    // },[]);
    function handleChange(e){
        fetch(`/api/search`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'query':(e.target.value).toLowerCase()})
        }).then(res => res.json()).then(d=>setResult(d))
    }

    // function getSearchResults(){
    //     console.log('search')
    //     // fetch('/seatch', {
    //     //     method: "POST",
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify(data)
    //     // }).then(res => res.json()).then(d=>console.log(Object.values(d)));
    // }

    function openSearch(e) {
        setDisabled(true)
        setToggle('open-search')
    }
      
    function closeSearch(e) {
        setDisabled(false)
        setToggle('close-search')
    }

    // function navigate(item){
    //     closeSearch()
    //     history.push(`/content/${item['ContentID']}`)
        
    // }


    return (
        <div className="" id="search">
            <div className="search-bar">
                <input onClick={openSearch} placeholder="Search titles..." disabled={disabled}/>
                <div id="myOverlay" class={`overlay ${toggle}`}>
                    <span class="closebtn" onClick={closeSearch} title="Close Overlay">×</span>
                    <div class="overlay-content">
                        <div className="overlay-search">
                            <input autocomplete="off" type="text" placeholder="Search Titles.." onChange={handleChange} name="search"/>
                            <span className="search-icon"><FaSearch fill="#9b9ea3" className="fa-search"/></span>

                            {result && result.length? 
                                <div id="search-results">
                                    <table className="search-table">

                                    {result.map((item)=>
                                        // <tr className="search-res d-flex justify-content-between p-2">
                                        // <a className="search-link d-flex" href={`/content/${item['ContentID']}`}>
                                        <a role="row" class="row search-res p-2" href={`/content/${item['ContentID']}`}>
                                            <div role="gridcell" class="cell">
                                                <img height="50px" src ={item['ImageData']?item['ImageData']:'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'}/>
                                            </div>
                                            <div role="gridcell" class="cell">
                                                <p className="text-light">{item['ContentName']}</p>
                                            </div>
                                            <div role="gridcell" class="cell">
                                                <p className="text-light">{item['Genre']}</p>
                                            </div>
                                            <div role="gridcell" class="cell">
                                                <p className="text-light">{item['AverageRating'].toFixed(1)}</p>
                                            </div>
                                        </a>
                                        //  <a className="search-link d-flex" href={`/content/${item['ContentID']}`}>
                                        //     <tr className="search-res p-2">
                                        //         <td><img height="50px" src ={item['ImageData']?item['ImageData']:'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg'}/></td>
                                        //         <td><p className="text-light">{item['ContentName']}</p></td>
                                        //         <td><p className="text-light">{item['Genre']}</p></td>
                                        //         <td><p className="text-light">{item['AverageRating'].toFixed(1)}</p></td>
                                        //     </tr>
                                        // </a>
                                    )}
                                    </table>
                                </div>
                            :null
                            }
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default Search;


