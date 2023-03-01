import React, { useEffect, useState } from "react";
import { StationService } from "../../servises/StationService";
import { Station } from '../../models/Station';
import "../assets/css/style1.css";
import "../assets/css/style.css";
import "../assets/css/core.css";
import "../assets/css/media.css";
import { Col } from "reactstrap";
const AllActiveFuelRequests: React.FC = () => {

  //  getActiveRequests
  const [factoryList, setFactoryList] = useState<any[]>([]);
  const [loadData, setLoadData] = React.useState(false);
  useEffect(() => {
      
      StationService.getAllFuelRequests().then(res => {
         if(res.data){
            setFactoryList(res.data);
         }
          console.log("factory list",res)
      });
  
      
    }, [loadData]);

    return (
        <div className="main-container0001">
        <div className="pd-ltr-20">
            <div className="rowCheck pb-4 pt-4 height-100-p">
            </div>

            <div className="card-box pd-20 height-100-p mb-30 mt-20">
                <div className="row">
                    <div className="title mb-15  col-md-8 col-sm-12 mb-20 ">
                        <h5 className="cardHearder">All Active Fuel Requests</h5>
                    </div>
                    <div className="d-flex justify-content-end  mb-3"  >
                        <button className="btn updateBtn btn-sm">Download</button>
                        </div>
                    <div className="row">
                        <Col sm="12" className="mt10">
                        <div className="table-responsive">
                                        { factoryList.length > 0 && (
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr className="tbHead">
                                                    <th scope="col">Station Name</th>
                                                        <th scope="col">User Name</th>
                                                <th scope="col">Vehicle Number</th>
                                    
                                                <th scope="col">Amount</th>
                                                <th scope="col">Date Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { factoryList.length > 0 &&
                                                     factoryList.filter((us) => us.status=="REQUESTED").     
                                                        map((us, index) => (
                                                            <tr key={index}>
                                        
                                                                <td>{us?.stationName}</td>
                                                                <td>{us?.user }</td>
                                                                <td>{us?.vehicleNumber }</td>
                                                                <td>{us?.amount }</td>
                                                                <td>{us?.date }</td>
                                                              

                                                               
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
        </div>
    </div>
    );
};
export default AllActiveFuelRequests;
