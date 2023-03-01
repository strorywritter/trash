import React, { useEffect, useState, useContext } from "react";
import "../assets/css/style1.css";
import "../assets/css/style.css";
import "../assets/css/core.css";
import "../assets/css/media.css";
import { toast } from "react-toastify";
toast.configure();
import "react-toastify/dist/ReactToastify.css";
import { Card, CardBody, CardTitle,Button,CardHeader, Col, Form, Input, Label, Container, Nav, NavItem, CardText, NavLink, CardFooter, Row, TabContent, Modal, TabPane } from "reactstrap";
import plusImage from "../../components/assets/images/plus.svg";
import minusImage from "../../components/assets/images/minus.svg";

import UserContext from "../context/UserContext";
import { AdminService } from "../../servises/AdminService";
import { StationService } from "../../servises/StationService";
import { CustomerUser } from "../../models/CustomerUser";
import { CustomerAdminService } from "../../servises/CustomerAdminService";
import { CustomerUserService } from "../../servises/CustomerUserService";
const CustomerAdminDashboard: React.FC = () => {
    const [modalCenter, setModalCenter] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [adminUser, setAdminUser] = useState([] as CustomerUser[]);
    const [addStock, setAddStock] = useState<any>({} as any);
    const [userFuelData, setUserFuelData] = useState<any>({} as any);
    const [updateActive, setUpdateActive] = useState(false);
    useEffect(() => {
    
        if(user?.station ){
            console.log("user1",user.station)
            StationService.getStation(user.station).then((res) => {
                console.log('userdata1',res)
                      if(res.data){
                        console.log("res.data",res.data)
                      setUserFuelData(res.data)
                      }
                      else{
                        console.log("something went wrong")
                      }
            }) .catch((error) => {
            console.log(error);
          });
        }
            
          }, [user]);


    const viewAllUser = () => {
        CustomerAdminService.getAllUsers().then(res => {
            setAdminUser(res.data);
        });
    };

    function togCenter() {
        setModalCenter(!modalCenter);
        removeBodyCss();
    }

    function togCenterClose() {
        setModalCenter(false)
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }


    const increaseStock = () => {
        if (!addStock.amount) {
            toast.error("Please enter amount!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } 
   StationService.increaseStock(user.station,addStock.amount).then(res=>{
    console.log("res.data",res)
    setModalCenter(false)
    setUpdateActive(true)
    toast.success("Stock Increase sucess!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
  //   setUserFuelData(userFuelData.stock == userFuelData.stock + res.data.stock )
    // setUser(user.stock= res.data.stock)
   })
        console.log("amount",addStock.amount)
        console.log("amount",user)

    }
    const decreseStock = () => {
        if (!addStock.amountdesc) {
            toast.error("Please enter amount!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } 
   StationService.decreseStock(user.station,addStock.amountdesc).then(res=>{
    console.log("res.data",res)
    setModalCenter(false)
    setUpdateActive(true)
    toast.success("Stock decrese sucess!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
  //   setUserFuelData(userFuelData.stock == userFuelData.stock + res.data.stock )
    // setUser(user.stock= res.data.stock)
   })
        console.log("amount",addStock.amount)
        console.log("amount",user)

    }


    return (
        <div className="main-container0001">
            <div className="pd-ltr-20">
                <div className="rowCheck pb-4 pt-4 height-100-p">
                    <h4 className="cardHearder">Dashboard</h4>
                </div>

                <div className="card-box pd-20 height-100-p mb-20 mt-20">
                    <div className="row">
                    <div className="col-md-4">
                            <div className="d-xl-flex justify-content-start mb-2">
                                <div className="d-flex align-items-center mr-2">
                                        <div className="avatar-md rounded-circle bg-soft card-avatar relative">
                                            <span
                                                className="avatar-title text-size-avatr text-center-div">
                                                {user?.userName?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    

                                </div>
                                <div className="d-flex flex-column ml-2 mt-2">
                                    <span className="card-text-name">{user?.userRole.charAt(0).toUpperCase() + user?.userRole.slice(1).toLowerCase() }</span>
                                    <span className="card-text-email">{user?.userName} </span>
                                 
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            
                        </div>

                        <div className="col-md-4">
                        </div>
                    </div>
                </div>

                <div className="card-box pd-20 height-100-p mb-30 mt-20">
              
            <div className="pd-ltr-20">

                <div className="card-box pd-20 height-100-p mb-30 mt-20">
                    <div className="row">
                        <div className="row">
                            <Col md="12" className="mt10">
                         
                          <Col md={12}>
                          <Row className="d-flex justify-content-center">
      
      <Col md={6}>
        <Card className="subscriptionCard mb-4">
      <CardHeader className="subscriptionCardTitle d-flex justify-content-center">Fuel Plan</CardHeader>
        <CardBody>
          <CardTitle className="SubscriptionAmount d-flex justify-content-center mt-3">Current Stock</CardTitle>
          <div className="d-flex justify-content-center">
          <p className="SubscriptionUserCountAdd m-2" >{userFuelData.stock}</p>
          </div>
          <div className="d-flex justify-content-center mt-3">



<button className="btn updateBtn btn-sm mr-2"  title="Edit User" onClick={() => {togCenter() }} >
    Increase
</button>
<button className="btn inactiveBtn btn-sm mr-2"  title="Delete User" onClick={() => {togCenter() }} >
    Decrease
</button>

</div>
        
        </CardBody>
        </Card>
      </Col>
    
    </Row>
                          </Col>
       
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
        

                    <Modal
                        isOpen={modalCenter}
                        toggle={() => {
                            togCenter();
                        }}
                        centered>
                     {
                           updateActive ?
                           <div>
                            <div className="modal-header">
                           <h5 className="modal-title mt-0">Increase Stock</h5>
                           <button
                               type="button"
                               onClick={() => {
                                   togCenterClose();
                               }}
                               className="close"
                               data-dismiss="modal"
                               aria-label="Close"
                           >
                               <span aria-hidden="true">&times;</span>
                           </button>
                       </div>
                       <div className="modal-body">
                           <div className="mb-2">
                               <div className="row">
                                   <div className="col-lg-3">
                                       <div className="card-heading mb-2">
                                           <h5 className="buyerInfoInputLabel mb-2">
                                               Amount{" "}
                                           </h5>
                                       </div>
                                   </div>
                                   <div className="col-lg-9">
                                       <div className="card-heading mb-2 flex">
                                           <Input
                                               style={{ backgroundColor: '#EEEEEE', boxShadow: "none" }}
                                               type="number"
                                               className="buyerInfoInput form-control"
                                               id="formrow-firstname-Input"
                                               value={addStock?.amount || ""}
                                               onChange={(e) => setAddStock({ ...addStock, amount: e.target.value })}
                                               maxLength={15}
                                               name="fName"
                                               required
                                           />
                                       </div>
                                   </div>
                               </div>

                             

                               <div className="row float-right newCustomerRes">
                                   <button type="button" className="btn mr-3 mt-2 btn-sm btn-save" onClick={increaseStock}>Increase</button>
                               </div>

                           </div>
                       </div>
                           </div>
                           :
                           <div>
                            <div className="modal-header">
                           <h5 className="modal-title mt-0">Decrese Stock</h5>
                           <button
                               type="button"
                               onClick={() => {
                                   togCenterClose();
                               }}
                               className="close"
                               data-dismiss="modal"
                               aria-label="Close"
                           >
                               <span aria-hidden="true">&times;</span>
                           </button>
                       </div>
                       <div className="modal-body">
                           <div className="mb-2">
                               <div className="row">
                                   <div className="col-lg-3">
                                       <div className="card-heading mb-2">
                                           <h5 className="buyerInfoInputLabel mb-2">
                                               Amount{" "}
                                           </h5>
                                       </div>
                                   </div>
                                   <div className="col-lg-9">
                                       <div className="card-heading mb-2 flex">
                                           <Input
                                               style={{ backgroundColor: '#EEEEEE', boxShadow: "none" }}
                                               type="number"
                                               className="buyerInfoInput form-control"
                                               id="formrow-firstname-Input"
                                               value={addStock?.amountdesc || ""}
                                               onChange={(e) => setAddStock({ ...addStock, amountdesc: e.target.value })}
                                               maxLength={15}
                                               name="fName"
                                               required
                                           />
                                       </div>
                                   </div>
                               </div>

                             

                               <div className="row float-right newCustomerRes">
                                   <button type="button" className="btn mr-3 mt-2 btn-sm btn-save" onClick={decreseStock}>Decrese</button>
                               </div>

                           </div>
                       </div>
                           </div>

                     }
                    </Modal>
                    

                </div>
            </div>
        </div>
    );
};
export default CustomerAdminDashboard;
