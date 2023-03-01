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
import { AdminService } from "../../servises/AdminService";
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
import { Role } from '../../models/Role';

const Dashboard: React.FC = () => {
    const [modalCenter, setModalCenter] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [adminUser, setAdminUser] = useState([] as CustomerUser[]);
    const [adminUserCount, setAdminUserCont] = useState(0);
    const [adminDealCount, setAdminDealCont] = useState(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    // const [trialData, setTrailData] = useContext(TrialDataContext);
    const [offset, setOffset] = useState<number>(1);
    const [fuelStationMangerData, setFuelStationMangerData] = useState<any>({} as any);
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
    const [loadData, setLoadData] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const viewDeals = (data: any) => {
        history.push({ pathname: "/customer-admin/user-list/deals/" + data._id });
    }
    
    useEffect(() => {
        
        StationService.getAllStations().then(res => {
            if(res.data){
                setFactoryList(res.data);
            }
            console.log("factory list",res)
        });
    
        
      }, [loadData]);


    const handleChange = (value: string,name:string) => {
        setSelectedValue(value);
        setSelectedName(name);
        setFuelStationMangerData({ ...fuelStationMangerData, station: value })
      };
      const handleSelect = (value: string) => {
        setSelectedValue(value);
        setSelectedName(value)
        setFuelStationMangerData({ ...fuelStationMangerData, district: value })
      };


    function togCenter() {
        setModalCenter(!modalCenter);
        setUpdateActive(false)
        setFuelStationMangerData("")
        setData("")
        setFuelStationMangerData("");
        setImageFile({ ...imageFile, preview: "", preview2: "", raw: "" })
    }

    function editCustomer(data: any) {
        setUpdateActive(true)
        setData(data)
        setFuelStationMangerData(data)
        setModalCenter(!modalCenter);
        removeBodyCss();
    }

    function togCenterClose() {
        setModalCenter(false)
        setUpdateActive(false)
        setFuelStationMangerData("");
        setData("")
        setImageFile({ ...imageFile, preview: "", preview2: "", raw: "" })
    }


    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }


    const addNewUser = () => {
        const phoneno = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;

        if (!fuelStationMangerData.firstName) {
            toast.error("Please enter First Name!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }
        if (!fuelStationMangerData.lastName) {
            toast.error("Please enter Last Name!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }
        if (!fuelStationMangerData.email) {
            toast.error("Please enter email!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        }
        else if (!fuelStationMangerData?.phoneNumber) {
            toast.error("Phone number is required", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
            return;
        } else if (!fuelStationMangerData?.phoneNumber.match(phoneno)) {
            toast.error("Please enter valid phone number with country code! Ex:+1xxxxxxxxx", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: "foo-bar",
            });
        } else {
            setDesableBtn(true);
        //     const updatedUser: CustomerUser = {
        //         firstName: fuelStationMangerData?.firstName,
        //         lastName: fuelStationMangerData?.lastName,
        //         email: fuelStationMangerData?.email,
        //    //     streetAddress: fuelStationMangerData?.streetAddress,
        //         // city: fuelStationMangerData?.city,
        //         // state: fuelStationMangerData?.state,
        //         // zipCode: fuelStationMangerData?.zipCode,
        //         // phoneNumber: fuelStationMangerData?.phoneNumber,
        //         // deletingImageId: fuelStationMangerData?.profileImageId?._id || "none",
        //         // password: fuelStationMangerData?.password,
        //     };

            // CustomerAdminService.addUser(updatedUser).then((res) => {
            //     if (res.success) {
            //         toast.success(res.success, {
            //             position: toast.POSITION.BOTTOM_RIGHT,
            //             className: 'foo-bar'
            //         });
            //         viewAllUser();
            //         setAddUser({ ...initialState });
            //         setModalCenter(false)
            //         setUpdateActive(false)
            //         setFuelStationMangerData("");
            //         setDesableBtn(false);
            //         setImageFile({ ...imageFile, preview: "", preview2: "", raw: "" })
            //     } else {
            //         toast.error(res.error, {
            //             position: toast.POSITION.BOTTOM_RIGHT,
            //             className: 'foo-bar'
            //         });
            //         setUpdateActive(false)
            //         setDesableBtn(false);
            //     }
            // });
        }
    }
    const addFuelStationManager = () => {
        console.log("hi",user._id)
        console.log("")
      //  setUser( {newname:"lakshan"})
        console.log("user",user)
        console.log("data new",fuelStationMangerData)
     
       console.log("data date",fuelStationMangerData)
       fuelStationMangerData.stock = parseInt(fuelStationMangerData.stock)
       console.log("data date",fuelStationMangerData)
        AdminService.addFuelManager(fuelStationMangerData).then((res) => {
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
                                               A
                                            </span>
                                        </div>
                                    

                                </div>
                                <div className="d-flex flex-column ml-2 mt-2">
                                    <span className="card-text-name">ADMIN</span>
                                    <span className="card-text-email">{user?.userName} </span>
                                  
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            
                        </div>



                        <div className="col-md-2">
                            <div className="row float-right newCustomerRes">
                                <button type="button" className="btn mr-5 btn-sm btn-customer mt-3" onClick={() => {
                                    togCenter();
                                }}>Add new fuel station</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-box pd-20 height-100-p mb-30 mt-20">
                    <div className="row">
                        <div className="title mb-15  col-md-8 col-sm-12 mb-20 ">
                            <h5 className="cardHearder">All Fuel Stations</h5>
                        </div>
                         <div className="row">
                        
                        
                        <div className="row">
                            <Col sm="12" className="mt10">
                            <div className="table-responsive">
                                        { factoryList.length > 0 && (
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr className="tbHead">
                                                    <th scope="col">Station Name</th>
                                                        <th scope="col">District</th>
                                                        <th scope="col">Stock</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { factoryList.length > 0 &&
                                                        factoryList && factoryList.map((us, index) => (
                                                            <tr key={index}>
                                        
                                                                <td>{us?.name}</td>
                                                                <td>{us?.district }</td>
                                                                <td>{us?.stock }</td>
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
                                        <h5 className="modal-title mt-0">Create New Fuel Station</h5>
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
                                                         Name
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
                                                            value={fuelStationMangerData?.lastName || ""}
                                                            onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, lastName: e.target.value })}
                                                            name="Contact Name"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

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
                                                            value={fuelStationMangerData?.firstName || ""}
                                                            onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, firstName: e.target.value })}
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
                                                            value={fuelStationMangerData?.lastName || ""}
                                                            onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, lastName: e.target.value })}
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
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
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
                                                >Create Fuel Station</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Add New Fuel Station</h5>
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
                                                        value={fuelStationMangerData?.name || ""}
                                                        onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, name: e.target.value })}
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
                                                            Located District
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="card-heading mb-2 flex">
                                                   
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
       {selectedName  ? selectedName : "Select District"}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => handleSelect('Ampara')}>Ampara</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Anuradhapura')}>Anuradhapura</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Batticaloa')}>Batticaloa</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Colombo')}>Colombo</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Gampaha')}>Gampaha</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Galle')}>Galle</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Hambantota')}>Hambantota</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Jaffna')}>Jaffna</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Kilinochchi')}>Kilinochchi</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Kalutara')}>Kalutara</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Kandy')}>Kandy</DropdownItem>
        <DropdownItem onClick={() => handleSelect('kegalle')}>kegalle</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Matale')}>Matale</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Matara')}>Matara</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Monaragala')}>Monaragala</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Mullaitivu')}>Mullaitivu</DropdownItem>
        <DropdownItem onClick={() => handleSelect('NuwaraEliya')}>NuwaraEliya</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Polonnaruwa')}>Polonnaruwa</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Puttalam')}>Puttalam</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Ratnapura')}>Ratnapura</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Trincomalee')}>Trincomalee</DropdownItem>
        <DropdownItem onClick={() => handleSelect('Vavuniya')}>Vavuniya</DropdownItem>
      </DropdownMenu>
      
    </Dropdown>

                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div className="row">
                                            <div className="col-lg-3">
                                                <div className="card-heading mb-2">
                                                    <h5 className="buyerInfoInputLabel mt-2">
                                                        Stock Amount
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
                                                        value={fuelStationMangerData?.stock || ""}
                                                        onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, stock: e.target.value })}
                                                        name="name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="card-heading mb-2">
                                                    <h5 className="buyerInfoInputLabel mt-2">
                                                        Manager Name
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
                                                        value={fuelStationMangerData?.manager || ""}
                                                        onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, manager: e.target.value })}
                                                        name="name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="card-heading mb-2">
                                                    <h5 className="buyerInfoInputLabel mt-2">
                                                        Manager Email
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="card-heading mb-2 flex">
                                                    <Input
                                                        style={{ backgroundColor: '#ffffff' }}
                                                        type="email"
                                                        className="buyerInfoInput form-control"
                                                        id="formrow-firstname-Input"
                                                        value={fuelStationMangerData?.email || ""}
                                                        onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, email: e.target.value })}
                                                        name="name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="card-heading mb-2">
                                                    <h5 className="buyerInfoInputLabel mt-2">
                                                        Manager Password
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
                                                        value={fuelStationMangerData?.password || ""}
                                                        onChange={(e) => setFuelStationMangerData({ ...fuelStationMangerData, password: e.target.value })}
                                                        name="name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                            


                                    

                                        <div className="row float-right newCustomerRes">
                                            <button type="button" className="btn mr-3 mt-2 mb-4 btn-sm btn-save" 
                                            onClick={addFuelStationManager}
                                            >Add Fuel Station</button>
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
export default Dashboard;
