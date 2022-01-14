import React, { useState, useEffect } from "react";
import AllContent from './AllContent/AllContent';
import Home from './Home/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './common/Header'
import Customers from './Customers/Customers'
import CustomisedList from './CustomisedList/CustomisedList'
import NewPopular from './NewPopular/NewPopular';
import Content from './common/Content';
import Login from "./Login/Login";
import Register from "./Login/Register";
import Profile from "./Login/Profile";
import Shows from "./AllContent/Shows";
import Movies from "./AllContent/Movies";
import GenrePage from "./GenrePage/GenrePage";
import UserContent from "./UserContent/UserContent";
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from "./actions";
import BottomNav from "./mobile/BottomNav";
import useWindowSize from "./common/DeviceSize";
// import useWindowDimensions from "./common/DeviceSize";


function App() {
  // const [windowDimensions, setWindowDimensions] = useState(useWindowDimensions) 
  const userData = useSelector(state => state.user.userData)
  const isLogged = useSelector(state => state.user.isLogged)

  const windowSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)
 
  useEffect(() => {
    if(windowSize.width>600){
      setIsMobile(false)
    }else{
      setIsMobile(true)
    }
  })
  // useEffect(async () => {
  //   fetch(`/api/user-list`,{
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({userid:21001})
  //   }).then(res=>res.json()).then(data=>
  //     dispatch(setUserData(data))
  //   )
  // },[]);
  console.log(userData,isLogged)


  return (
    <div className="App">
      <Header/>
      {isMobile?<BottomNav/>:''}
      <Switch>
        <Route exact path="/"><Redirect to ="/home" /></Route>
        <Route exact path={"/home"}><Home/></Route>
        {/* <Route path="/customers" component={<Customers/>} /> */}
        <Route path="/all-content"><AllContent/></Route>  
        <Route exact path="/shows"><Shows/></Route>
        <Route path={["/movies/:id","/shows/:id"]}><GenrePage/></Route>
        <Route path="/movies"><Movies/></Route>
        <Route path="/latest"><NewPopular/></Route>  
        <Route path={`/content/:id`}><Content/></Route>  
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/profile"><Profile/></Route>   
        <Route path="/login" 
          render={() =>
            isLogged ? (
              <Redirect to ="/home"/>
            ) : (
              <Login />
          )}
        >
        </Route>
        <Route path="/register" 
          render={() =>
            isLogged ? (
              <Redirect to ="/home"/>
            ) : (
              <Register />
          )}
        >
        </Route>
        <Route path="/my-list" 
          render={() =>
            !isLogged ? (
              <Redirect to ="/login"/>
            ) : (
              <UserContent />
          )}
        >
        </Route>
      </Switch>
      {/* <Route path="/login" component={isLogged? <Redirect to ="/home"/>: Login}></Route>
        {isLogged?<Route path="/my-list"><UserContent/></Route>: <Redirect to ="/login"/>} */}
      {/* <Route path="/login">{isLogged?<Redirect to ="/home"/>:null}</Route> */}

      {/* {isLogged?<Route path="/my-list"><UserContent/></Route>: <Redirect to ="/login"/>} */}

    </div>
  );
}

export default App;
