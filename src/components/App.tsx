import React, { useState, useContext,useEffect } from "react";
import { BrowserRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import { RouteName } from "../RouteName";
import HomePage from "./common/homepage";
import Auth from "./common/Auth";
import { MenuContext } from "./context/MenuContext";
import UserContext from "./context/UserContext"
import { Role } from "../models/Role";
import ContentLayout from "./common/ContentLayout";
import SidePane from "./common/SidePane";
import Content from "./common/Content";
import NavBarDashbord from "./common/NavBarDashbord";
import Dashboard from "./admin/Dashboard";
import AllFuelRequests from "./admin/AllFuelRequests";
import AllActiveFuelRequests from "./admin/AllActiveFuelRequests";
import AllCompletedFuelRequests from './admin/AllCompletedFuelRequests';
import CustomerAdminDashboard from "./customerAdmin/CustAdminDashboard";
import CustomerAdminSideMenu from "./customerAdmin/CustAdminSideBar";
import AllDeal from "./customerAdmin/AllDeal";
import Subscription from "./customerAdmin/Subscription";
import Signup from "./common/Signup";
import UserSideMenu from "./user/UserSideBar";
import BuyerInfromation from "./user/BuyerInformation";
import AdminSideMenu from "./admin/AdminSideBar";
import UserAllDeal from "./user/AllDeal";
import Login from "./common/login";
import VerifyRole from "./common/VerifyRole";
import UserDashboard from './user/UserDashborad';
import { User, UserDetails } from '../models/User';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route path={RouteName.LOGIN}>
        <UserContext.Provider value={[user, setUser]}>
          <Login />
          </UserContext.Provider>
        </Route>
        <Route path={RouteName.SIGNUP}>
          <Signup />
        </Route>
        <Route path="/" >
          {/* <Auth> */}
          <UserContext.Provider value={[user, setUser]}>
            <MenuContext.Provider value={[isMenuOpen, setIsMenuOpen]}>
              <div className="bg-gray-100" style={{ display: "flex", flexDirection: "column", position: "absolute", width: "100%", height: "100%" }}>
                <Router>
                  <Switch>
                    <Route path="/super-admin">
                      {/* <VerifyRole allow={Role.SUPER_ADMIN}> */}
                        <SystemAdminDashbordRouter />
                      {/* </VerifyRole> */}
                    </Route>
                    <Route path="/customer-admin">
                      {/* <VerifyRole allow={Role.CUSTOMER_ADMIN}> */}
                        <CustomerAdminDashbordRouter />
                      {/* </VerifyRole> */}
                    </Route>
                    <Route path="/user">
                      {/* <VerifyRole allow={Role.USER}> */}
                        <UserDashbordRouter />
                      {/* </VerifyRole> */}
                    </Route>
                    <Switch>
             <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route path="/login"   >   <Login />   </Route>
               </Switch>
                    
                  </Switch>
                </Router>
              </div>
            </MenuContext.Provider>
          {/* </Auth> */}
          </UserContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
};

//  System Admin  Dashbord
const SystemAdminDashbordRouter: React.FC = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
    <ContentLayout>
      <NavBarDashbord />
      <Router>
        <SidePane>
          <AdminSideMenu />
        </SidePane>
        <Content>
          <Switch>
            <Route path={RouteName.ADMIN_DASHBOARD}>
              <Dashboard />
            </Route>
            <Route path={RouteName.ADMIN_ALL_FUEL_REQUESTS}>
              <AllFuelRequests/>
            </Route>
            <Route path={RouteName.ADMIN_ACTIVE_FUEL_REQUESTS}>
              <AllActiveFuelRequests/>
            </Route>
            <Route path={RouteName.ADMIN_COMPLETE_FUEL_REQUESTS}>
              <AllCompletedFuelRequests/>
            </Route>
          </Switch>
        </Content>
      </Router>
    </ContentLayout>
    </UserContext.Provider>
  );
};

// Customer Admin  Dashbord
const CustomerAdminDashbordRouter: React.FC = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
   
    <UserContext.Provider value={[user, setUser]}>
    <ContentLayout>
      <NavBarDashbord />
      <Router>
        <SidePane>
          <CustomerAdminSideMenu />
        </SidePane>
        <Content>
          <Switch>
            <Route path={RouteName.CUSTOMER_ADMIN_DASHBOARD}>
              <CustomerAdminDashboard />
            </Route>
            <Route path={RouteName.CUSTOMER_ADMIN_ALL_DEALS}>
              <AllDeal />
            </Route>
            <Route path={RouteName.CUSTOMER_ADMIN_SUBSCRIPTION}>
              <Subscription />
            </Route>
          </Switch>
        </Content>
      </Router>
    </ContentLayout>
    </UserContext.Provider>
  );
};

// User Dashbord
const UserDashbordRouter: React.FC = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
    <ContentLayout>
      <NavBarDashbord />
      <Router>
        <SidePane>
          <UserSideMenu />
        </SidePane>
        <Content>
          <Switch>
            <Route path={RouteName.USER_ADMIN_DASHBOARD}>
              <UserDashboard />
            </Route>
            {/* <Route path={RouteName.USER_ALL_DEALS}>
              <UserAllDeal />
            </Route> */}
          </Switch>
        </Content>
      </Router>
    </ContentLayout>
    </UserContext.Provider>
  );
};
export default App;
