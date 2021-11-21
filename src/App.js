import "./App.css";
import CombinedLandingPage from "./Landing Page/CombinedLandingPage";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./LoginSignup/Login";
import Signup from "./LoginSignup/Signup";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./Store/Firebase";
import { loginActions } from "./Store/Slices/LoginControl";
import NotFound from "./Extras/NotFound";
import { doc, getDoc, onSnapshot } from "@firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        // const docRef = await doc(db, "users", user.uid);
        // const docSnap = await getDoc(docRef);

        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(loginActions.loggingin({ id: doc.data() }));
          console.log("Current data: ", doc.data());
        });

        // dispatch(loginActions.loggingin({ id: docSnap.data() }));
        setRender(true);
      } else {
        dispatch(loginActions.loggingout());
      }
    });
  }, []);
  const loginState = useSelector((state) => state.loginInfo.loginPage);

  if (loginState) {
    return (
      <Router>
        <Switch>
          <div className="App">
            <div className="pageContent">
              <Route path="/">
                <Login />
              </Route>
            </div>
          </div>
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        {render && <Navbar />}
        <Switch>
          <div className="App">
            <div className="pageContent">
              <Route exact path="/">
                {render && <CombinedLandingPage />}
              </Route>
              {/* {/* <Route exact path="/login">
                 <Login /> 
                <CombinedLandingPage />
              </Route> */}
              <Route path="*">
                <NotFound />
              </Route>
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
