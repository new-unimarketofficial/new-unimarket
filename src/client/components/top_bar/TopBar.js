import React, { Component } from 'react';
import SearchBar from './SearchBar.js';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const topBarStyle = {
      backgroundColor: 'rgb(138, 237, 228)',
      padding: '1% 1% 0% 1%',
    };
    const imageStyle = {
      height: '3%',
      width: '3%',
    };
    const headerStyle = {
      display: 'inline',
      fontFamily: 'Garamond',
      padding: '0.5%',
    };
    return (
      <div style={topBarStyle}>
        <img style={imageStyle} src="https://res.cloudinary.com/jchen54/image/upload/v1496962973/favicon_xllkya.png" />
        <h1 style={headerStyle}>Unimarket</h1>
        <SearchBar search={this.props.search}/>
      </div>
    );
  }
}

export default TopBar;
