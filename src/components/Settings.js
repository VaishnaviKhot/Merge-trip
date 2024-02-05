import React from 'react';
import '../Css/Settings.css'; // Import your CSS file
import SideBar from "./SideBar";

class Settings extends React.Component {
  handleChangePassword = () => {
    console.log('Changing Password');
  };

  handleRecentTrips = () => {
    console.log('Viewing Recent Trips');
  };

  handleLogout = () => {
    console.log('Logging Out');
  };

  handleSupport = () => {
    console.log('Accessing Support');
  };

  render() {
    return (
      <>
      <SideBar />
      <div className="settings-container settingPage">
        <h2 className="settings-heading">Settings</h2>
        <ul className="settings-list">
          <li className="settings-item" onClick={this.handleChangePassword}>
            Change Password
          </li>
          <li className="settings-item" onClick={this.handleRecentTrips}>
            Recent Trips
          </li>
          <li className="settings-item" onClick={this.handleLanguage}>
            Language
          </li>
          <li className="settings-item" onClick={this.handleLegal}>
            Legal & About
          </li>
          <li className="settings-item" onClick={this.handleServices}>
            Customer Services
          </li>
          <li className="settings-item" onClick={this.handleLogout}>
            Log Out
          </li>
          {/* Add more settings options as needed */}
        </ul>
      </div>
      </>
    );
  }
}

export default Settings;