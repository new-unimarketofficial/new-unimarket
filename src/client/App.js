import React, { Component } from 'react';
import $ from 'jquery';
import ProductGridList from './components/product_list/ProductGridList.js';
import ProductSpecifics from './components/product_specifics/ProductSpecifics.js';
import TopBar from './components/top_bar/TopBar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: '',
      userWantsProductPage: false,
    };
    this.search = this.search.bind(this);
    this.handleProductClicked = this.handleProductClicked.bind(this);
  }

  componentDidMount() {
    this.search('socks');
  }

  search(searchQuery) {
    $.ajax({
      url: '/search',
      type: 'POST',
      contentType: 'application/json',
      // dataType: 'json',
      data: JSON.stringify({
        searchQuery,
      }),
      success: (results) => {
        const copyResults = results.slice('');
        if (Array.isArray(copyResults) && copyResults.length > 0) {
          for (let i = 0; i < copyResults.length; i++) {
            if (typeof copyResults[i].LargeImage !== 'object') {
              copyResults.splice(i, 1);
            }
          }
          this.setState({ results: copyResults });
        } else {
          window.alert('There is currently no information on ' + searchQuery);
        }
      },
      error: (err) => {
        console.log(err);
        window.alert('There is no information regarding ' + searchQuery);
      }
    });
  }

  handleProductClicked() {
    this.setState({ userWantsProductPage: !this.state.userWantsProductPage });
  }

  render() {
    return (
      this.state.userWantsProductPage ?
        <div>
          <TopBar search={this.search} />
          <ProductSpecifics />
        </div>
      :
        <div>
          <TopBar search={this.search} />
          <ProductGridList
            results={this.state.results}
            handleProductClicked={this.handleProductClicked}
          />
        </div>
    );
  }
}

export default App;
