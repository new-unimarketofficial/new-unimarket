import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';

class ProductSpecifics extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const detailsStyle = {
      padding: '0 0 0 46%',
    };

    const imageStyle = {
      float: 'left',
    };

    const priceTitleStyle = {
      display: 'inline',
      fontWeight: 900,
    };

    const priceContentStyle = {
      display: 'inline',
    };

    const descriptionTitleStyle = {
      margin: 0,
      padding: 0,
      fontWeight: 900,
    };

    const descriptionContentStyle = {
      margin: 0,
      padding: 0,
    };
    // console.log('typeof typeof this.props.tile.ItemAttributes.OfferSummary: ', typeof this.props.tile.ItemAttributes.OfferSummary);
    return (
      <div>
        {this.props.tile.OfferSummary ?
          <div>
            <img style={imageStyle} src={this.props.tile.LargeImage.URL} />
            <div style={detailsStyle}>
              <h2>{this.props.tile.ItemAttributes.Title}</h2>
              {parseInt(this.props.tile.OfferSummary.TotalUsed) > 0 ?
                <div>
                  <p style={priceTitleStyle}>Price:</p>
                  <p style={priceContentStyle}> {this.props.tile.OfferSummary.LowestUsedPrice.FormattedPrice}</p>
                  {this.props.tile.ItemAttributes.Feature ?
                    <div>
                      <p style={descriptionTitleStyle}>Product Description:</p>
                      <p style={descriptionContentStyle}>{this.props.tile.ItemAttributes.Feature}</p>
                    </div>
                    :
                    <p>This product has no description at this time.</p>
                  }
                </div>
                :
                parseInt(this.props.tile.OfferSummary.TotalNew) === 0 && parseInt(this.props.tile.OfferSummary.TotalNew) === 0 ?
                <h2>This item is currently unavailable.</h2>
                :
                <div>
                  <p>Price: {this.props.tile.OfferSummary.LowestNewPrice.FormattedPrice}</p>
                  {this.props.tile.ItemAttributes.Feature ?
                    <div>
                      <p style={descriptionTitleStyle}>Product Description:</p>
                      <div>
                        {typeof this.props.tile.ItemAttributes.Feature === 'string' ?
                          <li style={descriptionContentStyle}>{this.props.tile.ItemAttributes.Feature}</li>
                        :
                          <ul>
                            {this.props.tile.ItemAttributes.Feature.map(feature => <li style={descriptionContentStyle}>{feature}</li>)}
                          </ul>
                      }
                    </div>
                    </div>
                    :
                    <p>This product has no description at this time.</p>
                  }
                </div>
              }
              <RaisedButton type="submit" label="Add to Cart" primary={true} />
            </div>

          </div>
          :
          <div>
            <img style={imageStyle} src={this.props.tile.LargeImage.URL} />
            <p style={detailsStyle}>We currently don`t support Kindle products. We apologize for the inconvenience.</p>
          </div>
        }
      </div>
    );
  }
}

ProductSpecifics.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default ProductSpecifics;
