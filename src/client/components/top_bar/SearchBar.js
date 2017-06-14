import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    if (this.state.searchQuery.length > 0) {
      this.props.search(this.state.searchQuery);
      this.setState({
        searchQuery: '',
      });
    }
  }

  handleSearchChange(event) {
    event.preventDefault();
    this.setState({
      searchQuery: event.target.value,
    });
  }

  render() {
    const inputStyle = {
      // flex: '10px 20px',
      lineHeight: '25px',
      width: '40%',
      fontSize: '22px',
      margin: 0,
      padding: 0,
      border: 0,
    };

    return (
      <div>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            style={inputStyle}
            placeholder="calculus textbook, kettle, ramen"
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
          <RaisedButton type="submit" label="Search" primary={true} />
        </form>
      </div>
    );
  }
}

SearchBar.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default SearchBar;
