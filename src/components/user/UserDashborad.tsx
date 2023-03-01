import React, { useEffect, useState, useContext, useRef } from "react";
import "../assets/css/style1.css";
import "../assets/css/style12.css";
import "../assets/css/core.css";
import "../assets/css/media.css";
import { toast } from "react-toastify";
toast.configure();
import "react-toastify/dist/ReactToastify.css";
import { Col, Input, Row, Modal,Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import UserContext from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { CustomerUser } from "../../models/CustomerUser";
import { Station } from '../../models/Station';
import { CustomerAdminService } from "../../servises/CustomerAdminService";
import { RouteName } from "../../RouteName";

// import { PaymentService } from "../../servises/PaymentService";
// import { TrialDataContext } from "../context/TrialContext";
import { useHistory } from "react-router-dom";
import { CustomerUserService } from "../../servises/CustomerUserService";
import { StationService } from "../../servises/StationService";
//import Swal from "sweetalert2";
// import PhoneInput from 'react-phone-input-2'





const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    password: "",
};
//import { CustomerAdmin } from "../../models/CustomerAdmin";
//import { Util } from "../../Util";
// import images from "../assets/images";

const UserDashboard: React.FC = () => {
    const [modalCenter, setModalCenter] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [adminUser, setAdminUser] = useState([] as CustomerUser[]);
    const [adminUserCount, setAdminUserCont] = useState(0);
    const [adminDealCount, setAdminDealCont] = useState(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    // const [trialData, setTrailData] = useContext(TrialDataContext);
    const [offset, setOffset] = useState<number>(1);
    const [addFuelRequest, setAddFuelRequest] = useState<any>({} as any);
    const [addUser, setAddUser] = useState<CustomerUser>({} as CustomerUser);
    const [reload, setReload] = useState(false);
    const [updateActive, setUpdateActive] = useState(false);
    const [isLoading, setIsLoaded] = useState<boolean>(true);
    const [isData, setData] = useState([] as any);
    const LIMIT = 10;
    const history = useHistory();
    const [imageFile, setImageFile] = useState({ preview: "", preview2: "", raw: "" });
    const imageFileRef = useRef<any>();
    imageFileRef.current = imageFile;
    const [disabledBtn, setDesableBtn] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [factoryList, setFactoryList] = useState<Station[]>([]);
    const [userFuelData, setUserFuelData] = useState<any[]>([]);
    const [loadData, setLoadData] = React.useState(false);
    const [loadDataRequest, setLoadDataRequest] = useState(true);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedName, setSelectedName] = useState("");

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const viewDeals = (data: any) => {
        history.push({ pathname: "/customer-admin/user-list/deals/" + data._id });
    }
    useEffect(() => {
    
    if(user?._id ){
        console.log("user1",user._id)
        CustomerUserService.getAllRequestUser(user._id).then((res) => {
            console.log('userdata1',res)
                  if(res.data){
                    console.log("res.data",res)
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
    useEffect(() => {
        console.log("user",user)
        StationService.getAllStations().then(res => {
            if(res.data){
                setFactoryList(res.data);
            }
            console.log("factory list",res)
        });
       console.log("user",user)
        
      }, [loadData]);
      
      

    const handleChange = (value: string,name:string) => {
        setSelectedValue(value);
        setSelectedName(name);
        setAddFuelRequest({ ...addFuelRequest, station: value })
      };
  

    function togCenter() {
        setModalCenter(!modalCenter);
        setUpdateActive(false)
        setAddFuelRequest("")
        setData("")
        setAddFuelRequest("");
        setImageFile({ ...imageFile, preview: "", preview2: "", raw: "" })
    }

    function editCustomer(data: any) {
        setUpdateActive(true)
        setData(data)
        setAddFuelRequest(data)
        setModalCenter(!modalCenter);
        removeBodyCss();
    }

    function togCenterClose() {
        setModalCenter(false)
        setUpdateActive(false)
        setAddFuelRequest("");
        setData("")
        setImageFile({ ...imageFile, preview: "", preview2: "", raw: "" })
    }


    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }


   
    const createFuelRequest = () => {
      
       
        console.log("user",user)
        console.log("data new",addFuelRequest)
        
        const originalDateString = addFuelRequest.date;
       const originalDate = new Date(originalDateString);
       const formattedDateString = originalDate.toISOString();
       addFuelRequest.date = formattedDateString
       console.log("data date",formattedDateString)
       console.log("data date",addFuelRequest)
       addFuelRequest.amount = parseInt(addFuelRequest.amount)
        CustomerUserService.fuelRequest(user._id,addFuelRequest).then((res) => {
            console.log('userdata1',res)
                  if(res){
                    console.log("res.data",res)
                  }
                  else{
                    console.log("something went wrong")
                  }
        });
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
                                    {/* <NavLink to={RouteName.CUSTOMER_ADMIN_VIEW_PROFILE}> <button type="button" className="btn mt-2 btn-sm btn-profile">View Profile</button></NavLink> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                          
                        </div>



                        <div className="col-md-2">
                            <div className="row float-right newCustomerRes">
                                <button type="button" className="btn mr-5 btn-sm btn-customer" onClick={() => {
                                    togCenter();
                                }}>Add new request</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-box pd-20 height-100-p mb-30 mt-20">
                    <div className="row">
                        <div className="title mb-15  col-md-8 col-sm-12 mb-20 ">
                            <h5 className="cardHearder">All Fuel Requests</h5>
                        </div>
                        <div className="row">
                            <Col sm="12" className="mt10">
                            
                            <div className="table-responsive">
                                        { userFuelData.length > 0 && (
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr className="tbHead">
                                                    <th scope="col">Station Name</th>
                                                       
                                    
                                                <th scope="col">Amount</th>
                                                <th scope="col">Date Time</th>
                                                <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { userFuelData.length > 0 &&
                                                        userFuelData.map((us, index) => (
                                                            <tr key={index}>
                                                                <td>{us?.stationName}</td>
                                                                <td>{us?.amount }</td>
                                                                <td>{us?.date }</td>
                                                                <td>{us?.status }</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        )}
                                    </div>

                                  
                            
                               
                            </Col>
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
                                        <h5 className="modal-title mt-0">Create Request</h5>
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
                                                        <h5 className="buyerInfoInputLabel mt-2">
                                                            Amount
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="card-heading mb-2 flex">
                                                        <Input
                                                            style={{ backgroundColor: '#ffffff' }}
                                                            type="text"
                                                            className="buyerInfoInput form-control"
                                                            id="formrow-firstname-Input"
                                                            value={addFuelRequest?.firstName || ""}
                                                            onChange={(e) => setAddFuelRequest({ ...addFuelRequest, firstName: e.target.value })}
                                                            name="name"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="card-heading mb-2">
                                                        <h5 className="buyerInfoInputLabel mb-2">
                                                            Station Name
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="card-heading mb-2 flex">
                                                        <Input
                                                            style={{ backgroundColor: '#ffffff' }}
                                                            type="text"
                                                            className="buyerInfoInput form-control"
                                                            id="formrow-firstname-Input"
                                                            value={addFuelRequest?.lastName || ""}
                                                            onChange={(e) => setAddFuelRequest({ ...addFuelRequest, lastName: e.target.value })}
                                                            name="Contact Name"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                      


            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="card-heading mb-2">
                                                        <h5 className="buyerInfoInputLabel mb-2">
                                                            Station Name
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="card-heading mb-2 flex">
                                                    {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={factory}
              label="Enter user role"
              onChange={e => setFactory(e.target.value)}
            >
              {factoryList.map((factory, index) => (
                <MenuItem value={factory.id} key={index}>
                  {factory.name}
                </MenuItem>
              ))}
            </Select> */}<Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Select an option
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Another Option</DropdownItem>
      </DropdownMenu>
    </Dropdown>

                                                    </div>
                                                </div>
                                            </div>
                                        

                                            <div className="row float-right newCustomerRes">
                                                <button type="button" className="btn mr-3 mt-2 mb-4 btn-sm btn-save" 
                                                // onClick={createFuelRequest}
                                                >Create Request</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Create Request</h5>
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
                                                    <h5 className="buyerInfoInputLabel mt-2">
                                                        Amount
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="card-heading mb-2 flex">
                                                    <Input
                                                        style={{ backgroundColor: '#ffffff' }}
                                                        type="number"
                                                        className="buyerInfoInput form-control"
                                                        id="formrow-firstname-Input"
                                                        value={addFuelRequest?.amount || ""}
                                                        onChange={(e) => setAddFuelRequest({ ...addFuelRequest, amount: e.target.value })}
                                                        name="name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="card-heading mb-2">
                                                        <h5 className="buyerInfoInputLabel mb-2">
                                                            Station Name
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="card-heading mb-2 flex">
                                                   
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
       {selectedName  ? selectedName : "Select Fuel Station"}
      </DropdownToggle>
      <DropdownMenu>
      {factoryList.map(item => (
            <DropdownItem key={item._id} value={item._id} onClick={() => handleChange(item._id,item.name)}>
              {item.name}
            </DropdownItem>
          ))}
      </DropdownMenu>
      
    </Dropdown>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                            <div className="col-lg-3">
                                                <div className="card-heading mb-2">
                                                    <h5 className="buyerInfoInputLabel mb-2">
                                                        Date
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="card-heading mb-2 flex">
                                                    <Input
                                                        style={{ backgroundColor: '#ffffff' }}
                                                        type="datetime-local"
                                                        className="buyerInfoInput form-control"
                                                        id="formrow-firstname-Input"
                                                        value={addFuelRequest?.date || ""}
                                                        onChange={(e) => setAddFuelRequest({ ...addFuelRequest, date: e.target.value })}
                                                        name="Contact Name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                    

                                        <div className="row float-right newCustomerRes">
                                            <button type="button" className="btn mr-3 mt-2 mb-4 btn-sm btn-save" 
                                            onClick={createFuelRequest}
                                            >Create Request</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                    </Modal>

                </div>
            </div >
        </div >
    );
};
export default UserDashboard;
