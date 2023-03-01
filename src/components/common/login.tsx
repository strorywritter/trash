import React, { useEffect, useState, useContext } from "react";
import { AuthService, UserLoginData } from "../../servises/AuthService";
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
import loginImage from "../../components/assets/images/login4.jpg";
import { User } from "../../models/User";
import UserContext from "../context/UserContext";
const Login: React.FC = () => {
  const initialState = { email: "", password: "" };
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [userData, setUserData] = useState(initialState);

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("userdata", userData);
    if (userData.email == "") {
      toast.error("Please enter user email!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
      return;
    }
    if (userData.password == "") {
      toast.error("Please enter user password!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
      return;
    }
    event.preventDefault();
    console.log("userlogin1", userData.email);
    AuthService.customerSignin(userData).then((res) => {
      console.log("userdata1", res);
      if (res) {
        console.log("userdata2", res);
        console.log("userdata22", res.data);
        const data = {
          _id: res.userId,
          name: res.userName,
          loginStatus: res.loginStatus,
          userId: res.userId,
          userName: res.userName,
          userRole: res.userRole,
          station: res?.station,
        };
        localStorage.setItem("userData", JSON.stringify(data));
        setUser({
          data,
        });

        if (res.userRole == "USER") {
          console.log("datahi");
          console.log("user11", user);
          history.push("/user/dashborad");
        }
        if (res.userRole == "ADMIN") {
          console.log("datahi");
          console.log("user11", user);
          history.push("/super-admin/dashboard");
        }
        if (res.userRole == "MANAGER") {
          console.log("datahi");
          console.log("user11", user);
          history.push("/customer-admin/dashboard");
        } else {
          toast.error("Please enter valid Credentials!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "foo-bar",
          });
        }
      } else {
        toast.error("Please enter user password!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo"></div>
        </div>
      </div>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container mt-100">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <img src={loginImage} style={{ height: "58vh" }} />
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="login-box bg-white box-shadow border-radius-10">
                <div className="login-title">
                  <h2 className="text-center text-primary">Online Fuelin Management System</h2>
                </div>
                <form onSubmit={submitLogin}>
                  <div className="input-group custom">
                    <input
                      type="text"
                      className="form-control form-control-md"
                      placeholder="Email"
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="icon-copy dw dw-user1"></i>
                      </span>
                    </div>
                  </div>
                  <div className="input-group custom">
                    <input
                      type="password"
                      className="form-control form-control-md"
                      placeholder="Password"
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                    <div className="input-group-append custom">
                      <span className="input-group-text">
                        <i className="dw dw-padlock1"></i>
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="input-group mb-0">
                        <button type="submit" className="btn btn btn-sm pt-2 pb-2 btncolor  btn-lg btn-block">
                          Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <h5 className="newSign float-right mt-4">
                        New customer? <NavLink to={RouteName.SIGNUP}>Registration</NavLink>
                      </h5>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
