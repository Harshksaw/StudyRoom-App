// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import { Permission, Search, View } from "./components";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Home from "./pages/Home";

import ManageSeats from "./pages/ManageSeats";
import CreateLibrary from "./components/ManageLibrary/CreateLibrary";
import ViewLibrary from "./components/ManageLibrary/ViewLibrary";
import ManageAdmin from "./pages/Owner/ManageAdmin";
import ManageRooms from "./pages/Owner/ManageRooms";
import OwnerRoute from "./components/Owner/OwnerRoute";
import { useEffect } from "react";
import OwnerHome from "./components/Owner/OwnerHome";
import MyLibrary from "./components/ManageLibrary/MyLibrary";

function App() {
  // const [count, setCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  // useEffect(() => {

  //   const getUserType = async () => {
  //     const response = await User
  //   }
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {role === "Admin" && (
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/manage-user/view" element={<View />} />
              <Route path="manage-user/permission" element={<Permission />} />
              <Route path="manage-user/search" element={<Search />} />
              <Route
                path="/manage-library/create-library"
                element={<CreateLibrary />}
              />
              <Route
                path="manage-library/view-library/:library_id"
                element={<ViewLibrary />}
              />
              <Route
                path="/manage-library/my-library"
                element={<MyLibrary />}
              />

              <Route path="/manage-seats" element={<ManageSeats />} />
            </Route>
          )}
          {role === "Owner" && (
            <Route element={<OwnerRoute />}>

              <Route path="admin" element={<OwnerHome />} />
              <Route path="admin/manage-rooms/:lib_id" element={<ManageRooms />} />
              <Route path="admin/manage-admin" element={<ManageAdmin />} />
              {/* <Route path="/admin/reports" element={<Reports />} /> */}
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
