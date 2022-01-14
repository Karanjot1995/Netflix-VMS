import { Component } from "react";
import Search from "../common/Search";
// import { useNavigate } from "react-router-dom";
import {RiHome2Line} from "react-icons/ri" 
import { useLocation, matchPath ,useHistory, Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../actions";


function BottomNav (){
    const location = useLocation();
    let history = useHistory();
    const userData = useSelector(state => state.user.userData)
    const isLogged = useSelector(state => state.user.isLogged)

    const dispatch = useDispatch()

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

    function logout(){
        dispatch(setUserData({userData:{},isLogged:false}))
        history.push('/login')
    }
       
    return (
        <div className="bottom-nav d-flex justify-content-between" >
            <ul className="header-search align-items-center justify-content-between m-1 text-white">
                <li className="">
                    <Link to="/home"><RiHome2Line className="home-icon"/></Link>
                    <p>Home</p>
                </li>
                <li className="navigation-menu d-flex">
                    <Search/>
                    <p>Search</p>
                </li>

                {isLogged? 
                    <li className="user-dropdown" onClick={logout}>
                        <img src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" width="30px" height="30px"/>
                        <p>Logout</p>
                        {/* <div className="dropdown">
                            <ul>
                                <li><a href="#">Account</a></li>
                                <li><a href="#">Manage Profile</a></li>
                                <li><a onClick={logout}>Logout</a></li>
                            </ul>
                        </div> */}
                        {/* <User/> */}
                    </li>
                    :
                    <li className="login-btn-header">
                    <a href="/login" class="authLinks redButton" data-uia="header-login-link">Sign In</a>
                    </li>
                }
            </ul>

        </div>
    );

}

export default BottomNav;


