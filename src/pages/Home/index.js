import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import Api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const dispatch = useDispatch();

  const qtdProduto = useSelector(state =>
    state.cart.reduce((qtdProd, prod) => {
      qtdProd[prod.id] = prod.amount;
      return qtdProd;
    }, {})
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await Api.get('/products');
      const { data } = response;
      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(prod => (
        <li key={prod.id}>
          <img src={prod.image} alt={prod.title} />
          <strong>{prod.title}</strong>
          <span>{prod.formatedPrice}</span>
          <button type='button' onClick={() => handleAddProduct(prod.id)}>
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
