import React, { useEffect, useState } from "react";
import { AuthService } from "../../servises/AuthService";
import { RequestState } from "../../RequestState";
import { NavLink, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import { RouteName } from "../../RouteName";
import "../../components/assets/css/core.css";
import "../../components/assets/css/style.css";
import "../../components/assets/css/style1.css";
import { toast } from "react-toastify";
toast.configure();
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../../components/assets/images/signup.svg";
import { User } from "../../models/User";
import { CommonService } from "../../servises/CommonService";

const Signup: React.FC = () => {
  //  const token = AuthService.getToken();
    const initialState = {name:"",email: "", password: "",vehicleNumber:"" };
    const history = useHistory();
    const [userData, setUserData] = useState(initialState);

    const submitSignup = () => {
        if (!userData.name) {
            toast.error("Please enter  Name!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }
        if (!userData.password) {
            toast.error("Please enter password!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }
        if (!userData.email) {
            toast.error("Please enter email!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }

        if (userData.vehicleNumber.length<7) {
            toast.error("Please enter valid vehicleNumber!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }
        if(userData.vehicleNumber.length==7){
            CommonService.customerSignup(userData).then((res) => {
                console.log('userdata',userData)
                if (res) {
                    toast.success("Registration Sucess!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: "foo-bar",
                    });
                    console.log('userdata',res)
                    location.href = "/login";
                    return;
                } else {
                    toast.error(res, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                }
            });
   
        }
        else{
            toast.error("Registration Fail! Please Try Again", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar'
            });
        }
        
      
    }


  

    return (
        <div className="login-page">
            <div className="login-header box-shadow">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="brand-logo">
                    
                    </div>
                </div>
            </div>
            <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
                <div className="container mt-100">
                    <div className="row align-items-center">
                        
                      
                            <div className="col-md-12 col-lg-12">
                                <div className="signup-box bg-white box-shadow border-radius-10">
                                    <div className="login-title mb-4">
                                        <h2 className="text-center text-primary">User registration</h2>
                                    </div>
                                    <form>
                                        <div className="row align-items-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="input-group custom">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-md"
                                                        placeholder="Customer Name"
                                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                      
                                        </div>


                                        <div className="row align-items-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="input-group custom">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-md"
                                                        placeholder="Email"
                                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                           
                                        </div>

                                        <div className="row align-items-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="input-group custom">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-md"
                                                        placeholder="Vehicle Number"
                                                        onChange={(e) => setUserData({ ...userData, vehicleNumber: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        

                                        <div className="row align-items-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="input-group custom">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-md"
                                                        placeholder="Password"
                                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row float-right">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="input-group">
                                                    <button type="button" className="btn btn-sm pt-2 pb-2 signupBtn  btncolor btn-lg btn-block" onClick={submitSignup}>
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                       
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Signup;
