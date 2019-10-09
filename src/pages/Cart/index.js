import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';
import { formatMoeda } from '../../utils/format';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state =>
    state.cart.map(prod => ({
      ...prod,
      total: formatMoeda(prod.amount * prod.price),
    }))
  );
  const totalGeral = useSelector(state =>
    formatMoeda(
      state.cart.reduce((tot, prod) => {
        return tot + prod.price * prod.amount;
      }, 0)
    )
  );

  const increaseProd = prod => {
    dispatch(CartActions.updateAmountRequest(prod.id, prod.amount + 1));
  };

  const decreaseProd = prod => {
    dispatch(CartActions.updateAmountRequest(prod.id, prod.amount - 1));
  };

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <td />
            <td>PRODUTO</td>
            <td>QTD</td>
            <td>SUBTOTAL</td>
          </tr>
        </thead>
        <tbody>
          {cart.map(prod => (
            <tr key={prod.id}>
              <td>
                <img src={prod.image} alt={prod.title} />
              </td>
              <td>
                <strong>{prod.title}</strong>
                <span>{prod.formatedPrice}</span>
              </td>
              <td>
                <div>
                  <button type='button'>
                    <MdRemoveCircleOutline
                      size={20}
                      color='#7159c1'
                      onClick={() => decreaseProd(prod)}
                    />
                  </button>
                  <input type='number' readOnly value={prod.amount} />
                  <button type='button'>
                    <MdAddCircleOutline
                      size={20}
                      color='#7159c1'
                      onClick={() => increaseProd(prod)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>
                  <span>{prod.total}</span>
                </strong>
              </td>
              <td>
                <button
                  type='button'
                  onClick={() => dispatch(CartActions.removeFromCart(prod.id))}
                >
                  <MdDelete size={20} color='#7159c1' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type='button'>Finalizar Pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{totalGeral} </strong>
        </Total>
      </footer>
    </Container>
  );
}
