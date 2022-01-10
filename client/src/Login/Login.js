// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

// import AuthService from "../services/auth.service";

// const required = value => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.handleLogin = this.handleLogin.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   handleLogin(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       loading: true
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.login(this.state.username, this.state.password).then(
//         () => {
//           this.props.history.push("/profile");
//           window.location.reload();
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             loading: false,
//             message: resMessage
//           });
//         }
//       );
//     } else {
//       this.setState({
//         loading: false
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="pt-100">
//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />

//           <Form
//             onSubmit={this.handleLogin}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <button
//                 className="btn btn-primary btn-block"
//                 disabled={this.state.loading}
//               >
//                 {this.state.loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 <span>Login</span>
//               </button>
//             </div>

//             {this.state.message && (
//               <div className="form-group">
//                 <div className="alert alert-danger" role="alert">
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={c => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;




import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../actions";
import { useHistory } from "react-router-dom";
import Register from "./Register";
import SignIn from "./SignIn";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("");
  const [loginStatus, setLoginStatus] = useState("");
  const userData = useSelector(state => state.user.userData)
  const isLogged = useSelector(state => state.user.isLogged)

  const dispatch = useDispatch()

   const login = async () => {
    fetch(`/users/login`,{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email: email,password: password})
    }).then(res=>res.json()).then(data=>{
      if(data.isLogged){
        dispatch(setUserData({userData:data,isLogged:true}))
      }
      // setLoginStatus(data);
      // if (!data.message) {
      //   setLoginStatus(data.message);
      // } else {
      //   dispatch(setUserData(data))
      //   setLoginStatus(data);
      // }
    })
  };

   return (
     <div className="login-page pt-50">
       <div class="login-wrapper-background">
         <img class="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt=""/>
       </div>
       <div className="login-body">
        <div className="login-form">
          <div>
            <h1 className="login-title text-start">Sign In</h1>
            <div className="lInput">
              <input
                className="email"
                type="email"
                placeholder="Email..."
                onChange = { (e) => {
                  setEmail (e.target.value);
                }}
              /> 
            </div>
            <div className="lInput">
              <input
                className="password"
                type="password"
                placeholder="Password..."
                onChange = { (e) => {
                  setPassword (e.target.value);
                }}
              />
            </div>
            <button onClick={login} className="login-btn">Sign In</button>
          </div>
          <div className="login-signup-now text-start" data-uia="login-signup-now">
                  {`New to Netflix? `}
                  <a class=" " target="_self" href="/register">Sign up now</a>
          </div>
        </div>

       </div>
     </div>
   );
}
 
export default Login;