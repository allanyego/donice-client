import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import AddReview from "./components/add-review";
import Login from "./components/login";
import Navbar from "./components/parts/navbar2";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import AppContext from "./services/context";

function App() {
  const [user, setUser] = useState(null);

  // Simulated authentication
  const login = (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    // Use of a context instead of passing props
    <AppContext.Provider value={{
      user,
      login,
    }}>
      <div className="App">
      <Router>
        <div className="main">
          <Navbar user={user} logout={logout} />
          <div className="mx-3">
            <Routes>
            // This is different from the video tutorial version
            <Route exact path={"/restaurants"} element={<RestaurantsList />} />
            <Route path="/restaurants/:id/review" element={<AddReview />} />
            <Route path="/restaurants/:id" element={<Restaurant />} />
            <Route path="/login" element={<Login />} />
            // Catch all route
            <Route
              path="*"
              element={<Navigate to="/restaurants" replace={true} />}
            />
          </Routes>
          </div>
        </div>
      </Router>
    </div>
    </AppContext.Provider>
  );
}

export default App;
