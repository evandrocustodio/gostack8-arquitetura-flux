import {
  call,
  all,
  takeLatest,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';
import { addToCartSucess, updateAmountSuccess } from './actions';
import { formatMoeda } from '../../../utils/format';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );
  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Produto Sem Estoque');
    return;
  }
  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      formatedPrice: formatMoeda(response.data.price),
    };
    yield put(addToCartSucess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Produto Sem Estoque');
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeEvery('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);

/*
} else {

  */