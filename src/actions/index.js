/**
 * @file 系统中的actions
 * @author lisiqi06
 */
import {RECEIVE_USER_INFO} from './types';

const fetch = () => Promise.resolve({
    username: 'Trio',
    permission: 'ADMIN',
});

export const fetchUserInfo = () => async dispatch => {
    const data = await fetch();
    dispatch({
        type: RECEIVE_USER_INFO,
        payload: data,
    });
};
