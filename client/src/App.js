import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VersionList from "./components/VersionList";
import ValidateRequest from "./components/ValidateRequest";
import StartScraping from "./components/StartScraping";
import EditVersion from "./components/EditVersion";
import VersionDetails from "./components/VersionDetails";
import DeleteVersion from "./components/DeleteVersion";
import "./App.css"; // Assuming you have a global CSS file for basic styles

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="heading">APK Management System</h1>
        <nav>
          <ul className="navTabs">
            <li>
              <Link to="/scrape">Scrape</Link>
            </li>
            <li>
              <Link to="/edit">Edit</Link>
            </li>
            <li>
              <Link to="/delete">Delete</Link>
            </li>
            <li>
              <Link to="/versions">List</Link>
            </li>
            <li>
              <Link to="/version-details">Version</Link>
            </li>
            <li>
              <Link to="/validate">Validate</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/scrape" element={<StartScraping />} />
          <Route path="/edit" element={<EditVersion />} />
          <Route path="/delete" element={<DeleteVersion />} />
          <Route path="/versions" element={<VersionList />} />
          <Route path="/version-details" element={<VersionDetails />} />
          <Route path="/validate" element={<ValidateRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
