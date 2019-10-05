import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import Api from '../../services/api';
import { formatMoeda } from '../../utils/format';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const response = await Api.get('/products');

    const { data } = response;
    this.setState({
      products: data,
    });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { qtdProduto } = this.props;
    return (
      <ProductList>
        {products.map(prod => (
          <li key={prod.id}>
            <img src={prod.image} alt={prod.title} />
            <strong>{prod.title}</strong>
            <span>{prod.formatedPrice}</span>
            <button
              type='button'
              onClick={() => this.handleAddProduct(prod.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color='#FFF' />
                {qtdProduto[prod.id] || 0}
              </div>
              <span>Adicionar ao Carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
const mapStateToProps = state => ({
  qtdProduto: state.cart.reduce((qtdProduto, prod) => {
    qtdProduto[prod.id] = prod.amount;
    return qtdProduto;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
