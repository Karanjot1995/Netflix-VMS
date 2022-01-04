import { Component } from "react";
import Search from "./Search";
// import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, matchPath ,useHistory} from 'react-router-dom';


function Header (){
    const location = useLocation();
    let history = useHistory();

    const match = matchPath(location.pathname, {
        path: '/:page',
        exact: true,
        // strict: false
      });

    function navigateBack(navigate){
        if(match){
            history.push('/home')
        }else{
            history.goBack()
        }
    }
       
    return (
        <div className="main-header d-flex justify-content-between" role="navigation">
             {!match?
                <a className="back-btn" onClick={()=>navigateBack()}><FaArrowLeft/></a>
            :''}
            <ul className="navigation d-flex align-items-center justify-content-around">
               
                <li>
                    <a aria-label="Netflix" className="logo icon-logoUpdate active" href="/home">
                        <img src={require('../images/netflix.png').default} height="50px"/>
                    </a>
                </li>
                <li className="navigation-tab">
                    <a className="current active" href="/home">Home</a>
                </li>
                {/* <li className="navigation-tab">
                    <a href="/customers">Customers</a>
                </li> */}
                <li className="navigation-tab">
                    <a href="/shows">TV Shows</a>
                </li>
                <li className="navigation-tab">
                    <a href="/movies">Movies</a>
                </li>
                <li className="navigation-tab">
                    <a href="/all-content">All Content</a>
                </li>
                {/* <li className="navigation-tab">
                    <a href="/browse/genre/34399">Movies</a>
                </li> */}
                {/* <li className="navigation-tab">
                    <a href="/content/:id">New &amp; Popular</a>
                </li> */}
                <li className="navigation-tab">
                    <a href="/latest">New &amp; Popular</a>
                </li>
                <li className="navigation-tab">
                    <a href="/my-list">My List</a>
                </li>
            </ul>
            <ul className="header-search d-flex align-items-center mt-3 text-white">
                <li className="navigation-menu d-flex">
                    <Search/>
                </li>
                <li className="user-dropdown">
                    <img src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" width="30px" height="30px"/>
                    <div className="dropdown">
                        <ul>
                            <li><a href="#">Account</a></li>
                            <li><a href="#">Manage Profile</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul>
                    </div>
                    {/* <User/> */}
                </li>
            </ul>

        </div>
    );

}

export default Header;


