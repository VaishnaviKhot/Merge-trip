// import React from 'react'
// import { Link } from 'react-router-dom'
// import "../Css/Header.css"

// const Header = () => {
//   return (
//     <div class="Search-container">
//       <form action="https://www.google.com/search" method="get"  class="search-bar" traget="_blank">
//           <input type="text" placeholder="search any thing" name="q" />
//           <button type="submit">  <i class="fas fa-search"></i></button>
//       </form>
// </div>
//   )
// }

// export default Header


import React from 'react';
import "../Css/Header.css";

const Header = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="Search-container">
      <form className="search-bar">
        <input
          type="text"
          placeholder="Search anything"
          onChange={handleSearch}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Header;

