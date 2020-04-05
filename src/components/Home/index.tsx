import {FC, useEffect} from 'react';
import {Button} from 'antd';
import {useCurrentUser, useActions} from '@/hooks';
import {fetchUserInfo} from '@/actions';
import styles from './index.less';

const request = [fetchUserInfo];

const Home: FC = () => {
    const user = useCurrentUser();
    const [fetchUser] = useActions(request);

    useEffect(
        () => {
            fetchUser();
        },
        [fetchUser]
    );

    return (
        <div className={styles.root}>
            <h1>FExpy</h1>
            <div>Hi {user?.username}</div>
            <Button>test</Button>
        </div>
    );
};

export default Home;
