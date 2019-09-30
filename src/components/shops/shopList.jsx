import React, { Component, Fragment } from 'react';
import { Table, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteShop } from '../../store/actions/shopActions';
import UpdateShop from './updateShop';
import PropTypes from 'prop-types';
import messages from '../../en.messages';
import ErrorBoundary from './ErrorBoundary';

class ShopList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      show: false,
      id: ''
    };
  }

  static propTypes = {
    shops: PropTypes.arrayOf(PropTypes.object),
    deleteShop: PropTypes.func.isRequired
  }

  toggle(e) {
    this.setState(({
      show: !this.state.show,
      id: Number(e.target.id)
    }));
  }

  render () {
    const { shops } = this.props;
    return (
        <Table striped>
          <thead>
            <tr id='headtr'>
              <th className="firstTD">#</th>
              <th>{messages.name}</th>
              <th>{messages.city}</th>
              <th>{messages.address}</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            { shops && shops.map((shop, i) => {
                return (
                  <Fragment key={i}>
                  <tr key={i}>
                    <td className="firstTD">{i+1}</td>
                    <td className="shopData">{shop.name}</td>
                    <td className="shopData">{shop.city}</td>
                    <td className="shopData">{shop.address}</td>
                    <td id="x" onClick={() => this.props.deleteShop(shop.id)}>x</td>
                    <td id="tdButton">
                      <Button className="btnUpdate" outline color="info" id={i} onClick={this.toggle}>{messages.update}</Button>
                    </td>
                  </tr>
                  { this.state.show && i===this.state.id ?
                  <tr className="updateTR">
                    <td className="emptySpace"></td>
                    <td>

                      <ErrorBoundary>
                        <UpdateShop id={shop.id} data="name"/>
                      </ErrorBoundary>

                    </td>
                    <td>
                      <UpdateShop id={shop.id} data="city"/>
                    </td>
                    <td>
                      <UpdateShop id={shop.id} data="address"/>
                    </td>
                    <td className="emptySpace"></td>
                    <td className="emptySpace"></td>
                  </tr>
                  : null }
                  </Fragment>
                );
              }
            )}
          </tbody>
      </Table>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteShop: (id) => dispatch(deleteShop(id))
  };
};

 export default connect(null, mapDispatchToProps)(ShopList);