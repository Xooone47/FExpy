/**
 * @file actions
 * @author Trey
 */
import {RECEIVE_USER_INFO} from './types';

const fetch = () => Promise.resolve({
    username: 'Trey',
    permission: 'ADMIN',
});

export const fetchUserInfo = () => async dispatch => {
    const data = await fetch();
    dispatch({
        type: RECEIVE_USER_INFO,
        payload: data,
    });
};
