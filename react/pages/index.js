import { useDispatch, useSelector, useStore } from 'react-redux';
import { useState, useEffect } from 'react';
import { createSelector } from 'reselect';
import apiUserLogin from '@/redux/api/user/login';
import apiUserRemove, { path as userRemovePath } from '@/redux/api/user/remove';

const selectUserLogin = createSelector(
  (state) => state,
  (state) => state.api.user.login
);

const selectApiUserRemoveDynamic = createSelector(
  (state) => state,
  (state) => state[userRemovePath] || {}
);

export default function Home() {
  const [count, setCount] = useState(0);
  const store = useStore();
  const dispatch = useDispatch();
  const userLogin = useSelector(selectUserLogin);
  const ar = useSelector(selectApiUserRemoveDynamic);

  const handleLogin = () => {
    dispatch(
      apiUserLogin.actions.request({
        username: 'Test UserName' + count,
        password: 'hello',
      })
    );

    setCount(count + 1);
  };

  const handleCancel = () => {
    dispatch(apiUserLogin.actions.cancel());
  };

  const handleRemove = () => {
    dispatch(apiUserRemove(count, store).actions.request({ id: count }));
  };

  return (
    <div>
      {Object.keys(userLogin.toJS()).map((key) => {
        return (
          <div key={key}>
            <b>{key}:</b>{' '}
            {typeof userLogin.get(key) === 'string'
              ? userLogin.get(key)
              : JSON.stringify(userLogin.get(key))}
          </div>
        );
      })}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleRemove}>test remove {ar[count]?.get('onFetch')}</button>
    </div>
  );
}
