import {FC} from 'react';
import {useCurrentUser} from '@/hooks';
import styles from './index.less';

const Home: FC = () => {
    const user = useCurrentUser();

    return (
        <div className={styles.root}>
            <h1>FExpy</h1>
            <div>Hi {user?.username}</div>
        </div>
    );
};

export default Home;
