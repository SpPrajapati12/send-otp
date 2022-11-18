import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import About from "./components/main/about/About";
import Home from "./components/main/home/Home";
import Layout from "./components/common/Layout";
import NavBar from "./components/navbar/NavBar"
import Register from "./components/register/Register";
import Mailbox from "./components/main/mailbox/Mailbox";
import Contacts from "./components/main/contacts/Contacts";
import Dashboard from "./components/dashboard/Dashboard";
import Logins from "./components/login/Logins";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId = "475970552739-22ahalkku08902252ms6kcl60vj8e5fo.apps.googleusercontent.com"
function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  // var accessToken = gapi.auth.getToken().access_token
  // console.log(accessToken)
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logins" element={<Logins />} />
          <Route element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/contact" element={<Contacts />} />
            <Route exact path="/mail" element={<Mailbox />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
