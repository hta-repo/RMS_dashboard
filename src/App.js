import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import ApproveCompany from "./scenes/ApproveCompany";
import ApproveCandidate from "./scenes/ApproveCandidate";
import CreatePlans from "./scenes/PlanManagment/create";
import AllPlans from "./scenes/PlanManagment/index";
import EditPlans from "./scenes/PlanManagment/edit";
import AllVouchers from "./scenes/VoucherManagment/index";
import CreateVouchers from "./scenes/VoucherManagment/create";
import EditVouchers from "./scenes/VoucherManagment/edit";
import AllStaff from "./scenes/StaffManagment/index";
import CreateStaff from "./scenes/StaffManagment/create";
import EditStaff from "./scenes/StaffManagment/edit";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import PrivateRoute from "./PrivateRoute.js";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Login from "./scenes/login";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

import { SnackbarProvider } from 'notistack';

//  Redux
import { useSelector, useDispatch } from "react-redux";

// API's
import { userDetail } from "./slices/auth";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const getUserDetail = useCallback(() => {
    dispatch(userDetail()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetail();
    }
  }, [isLoggedIn, getUserDetail]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Router>
            <PrivateRoute>
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/overview" element={<Dashboard />} />
                    <Route path="/approve-company" element={<ApproveCompany />} />
                    <Route path="/approve-candidate" element={<ApproveCandidate />} />
                    <Route path="/create-plans" element={<CreatePlans />} />
                    <Route path="/plans" element={<AllPlans />} />
                    <Route path="/edit-plans/:id?" element={<EditPlans />} />
                    <Route path="/vouchers" element={<AllVouchers />} />
                    <Route path="/create-vouchers" element={<CreateVouchers />} />
                    <Route path="/edit-vouchers/:id?" element={<EditVouchers />} />
                    <Route path="/staff" element={<AllStaff />} />
                    <Route path="/create-staff" element={<CreateStaff />} />
                    <Route path="/edit-staff/:id?" element={<EditStaff />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />
                  </Routes>
                </main>
              </div>
            </PrivateRoute>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
