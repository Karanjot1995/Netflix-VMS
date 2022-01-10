// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";

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

// const email = value => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = value => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       username: "",
//       email: "",
//       password: "",
//       successful: false,
//       message: ""
//     };
//   }

//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       email: e.target.value
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       message: "",
//       successful: false
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       AuthService.register(
//         this.state.username,
//         this.state.email,
//         this.state.password
//       ).then(
//         response => {
//           this.setState({
//             message: response.data.message,
//             successful: true
//           });
//         },
//         error => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           this.setState({
//             successful: false,
//             message: resMessage
//           });
//         }
//       );
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
//             onSubmit={this.handleRegister}
//             ref={c => {
//               this.form = c;
//             }}
//           >
//             {!this.state.successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                     validations={[required, vusername]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     name="email"
//                     value={this.state.email}
//                     onChange={this.onChangeEmail}
//                     validations={[required, email]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={this.state.password}
//                     onChange={this.onChangePassword}
//                     validations={[required, vpassword]}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <button className="btn btn-primary btn-block">Sign Up</button>
//                 </div>
//               </div>
//             )}

//             {this.state.message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     this.state.successful
//                       ? "alert alert-success"
//                       : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
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

// import React, { useState, useEffect } from "react";
 
// function Register() {
//   const [emailReg, setEmailReg] = useState("");
//   const [passwordReg, setPasswordReg] = useState ("");
//   const [loginStatus, setLoginStatus] = useState("");

//   const register = () => {
//     fetch(`/users/register`,{
//       method: "POST",
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({email: emailReg,password: passwordReg})
//     }).then(res=>res.json()).then(data=>
//         console.log('added: ',data)
//     )
//     // Axios.post("http://localhost:3001/register", {
//     //   username: usernameReg,
//     //   password: passwordReg,
//     //  }).then((response) => {
//     //     console.log(response);
//     //  });
//    };


//    return (
//      <div className="login-page">
//         <div className="registration">
//           <h1>Registration</h1>
//           <label>Email</label>
//           <input 
//             type="email" 
//             onChange={(e) => {
//               setEmailReg(e.target.value);
//             }}
//           /><br/>
//           <label>password</label>
//           <input 
//             type="text"
//             onChange={(e) =>{
//               setPasswordReg(e.target.value);
//             }}
//           /> <br />
//           <button onClick={register}> Register</button>
//         </div>
//      </div>
//    );
// }
 
// export default Register;






import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../actions";
import { useHistory } from "react-router-dom";

function Register() {
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
            <h1 className="login-title text-start">Register</h1>
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
            <button onClick={login} className="login-btn">Register</button>
          </div>
          <div className="login-signup-now text-start" data-uia="login-signup-now">
                  {`Already a member? `}
                  <a class=" " target="_self" href="/register">Sign In</a>
          </div>
        </div>

       </div>
        {/* <h1> {loginStatus}</h1> */}
        {/* <div class="login-wrapper hybrid-login-wrapper">
          <div class="login-wrapper-background">
            <img class="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt=""/>
          </div>
          <div class="nfHeader login-header signupBasicHeader">
            <a href="/" class="svg-nfLogo signupBasicHeader" data-uia="netflix-header-svg-logo">
              <span class="screen-reader-text">Netflix</span>
            </a>
          </div>
          <div class="login-body">
            <div>
              <div class="login-content login-form hybrid-login-form hybrid-login-form-signup" data-uia="login-page-container">
                <div class="hybrid-login-form-main">
                  <h1 data-uia="login-page-title">Sign In</h1>
                  <form method="post" class="login-form" action="">
                    <div data-uia="login-field+container" class="nfInput nfEmailPhoneInput login-input login-input-email">
                      <div class="nfInputPlacement"><div class="nfEmailPhoneControls">
                        <label class="input_id" placeholder="">
                          <input type="text" data-uia="login-field" name="userLoginId" class="nfTextField" id="id_userLoginId" value="" tabindex="0" autocomplete="email" dir=""/>
                          <label for="id_userLoginId" class="placeLabel">Email or phone number</label>
                        </label>
                        <div data-uia="phone-country-selector+container" class="ui-select-wrapper country-select">
                          <a data-uia="phone-country-selector+target" href="#" class="ui-select-wrapper-link">
                            <div class="ui-select-current" placeholder="{&quot;current_selected_country&quot;:&quot;US&quot;}">
                              <span class="country-select-flag nf-flag nf-flag-us"></span>
                              <span class="country-select-code">{`+<!-- -->1`}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}
     </div>
   );
}
 
export default Register;