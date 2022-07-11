import { combineReducers } from 'redux';
import apiUserLogin from '@/redux/api/user/login';

const api = combineReducers({
  user: combineReducers({
    login: apiUserLogin.reducer,
  }),
});

const reducers = {
  api,
};

export default reducers;
