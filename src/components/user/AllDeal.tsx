import React, { useEffect, useState ,useContext} from "react";
import "../assets/css/style1.css";
import "../assets/css/style.css";
import "../assets/css/core.css";
import "../assets/css/media.css";
import { Col } from "reactstrap";
import UserContext from "../context/UserContext";
const UserAllDeal: React.FC = () => {
    const [user, setUser] = useContext(UserContext);
    console.log("userdatraa",user)

    return (
        <div></div>
    );
};
export default UserAllDeal;
