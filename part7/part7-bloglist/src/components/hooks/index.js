import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'

import {fetchUsers} from 'userReducer '


export const useUsers = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return users;
};