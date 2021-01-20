import React, { useState, useEffect } from "react";
import Processor from "./components/parts/Processor";
import GraphicsCards from "./components/parts/GraphicsCards";
import Motherboard from "./components/parts/Motherboard";
import Psu from "./components/parts/Psu";
import Ram from "./components/parts/Ram";
import Cabinet from "./components/parts/Cabinet";
import Storage from "./components/parts/Storage";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Laptop from "./components/Laptop";
import PreBuild from "./components/PreBuild";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Axios from "axios";
import AdminContext from "./context/AdminContext";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [admin, setadmin] = useState({
    id: undefined,
    admin: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let idauth = localStorage.getItem("x-auth-id");

      if (idauth === null) {
        localStorage.setItem("x-auth-id", null);
        idauth = "";
        history.push("/login");
      }

      const idRes = await Axios.post(
        "http://localhost:5000/settings/tokenIsValid",
        null,
        {
          headers: { "x-auth-id": idauth },
        }
      );

      if (idRes.data) {
        const res = await Axios.get("http://localhost:5000/settings", {
          headers: { "x-auth-id": idauth },
        });
        setadmin({
          idauth,
          admin: res.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setadmin }}>
      <Router>
        <NavBar />
        <Switch>
          {admin.admin ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/laptop">
                <Laptop />
              </Route>
              <Route exact path="/prebuild">
                <PreBuild />
              </Route>
              <Route exact path="/processor">
                <Processor />
              </Route>
              <Route path="/graphicscard">
                <GraphicsCards />
              </Route>
              <Route path="/motherboard">
                <Motherboard />
              </Route>
              <Route path="/ram">
                <Ram />
              </Route>
              <Route path="/cabinet">
                <Cabinet />
              </Route>
              <Route path="/storage">
                <Storage />
              </Route>
              <Route path="/psu">
                <Psu />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </>
          ) : (
            <Route path="/login">
              <Login />
            </Route>
          )}
        </Switch>
      </Router>
    </AdminContext.Provider>
  );
}

export default App;
