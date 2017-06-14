import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Modal from 'react-modal';
import CircularProgress from 'material-ui/CircularProgress';
import ProductSpecifics from '../product_specifics/ProductSpecifics.js';

class ProductGridList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      tile: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  openModal(tile) {
    this.setState({ modalIsOpen: true, tile }, () => {
      console.log(this.state.tile);
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 'auto',
        height: 'auto',
        overflowY: 'auto',
      },
    };

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '65%',
      },
    };

    const containerStyle = {
      marginTop: '20%',
      marginLeft: '48%'
    };

    return (
      <div>
        {Array.isArray(this.props.results) ?
          <div>
            <div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Product Modal"
                >
                <ProductSpecifics tile={this.state.tile} />
              </Modal>
            </div>

            <div style={styles.root}>
              <GridList
                cols={2}
                cellHeight={200}
                padding={1}
                style={styles.gridList}
              >
                {this.props.results.map((tile) => (
                  <GridTile
                    style={{zIndex: 0}}
                    onClick={() => this.openModal(tile)}
                    key={tile.LargeImage.URL}
                    title={tile.ItemAttributes.Title}
                    subtitle={tile.ItemAttributes.Author}
                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    actionPosition="left"
                    titlePosition="top"
                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                  >
                    <img src={tile.LargeImage.URL} />
                  </GridTile>
                  ))}
              </GridList>
            </div>
          </div>
          :
          <div style={containerStyle}>
            <CircularProgress size={130} thickness={5} />
          </div>
        }
      </div>
    );
  }
}

ProductGridList.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default ProductGridList;
