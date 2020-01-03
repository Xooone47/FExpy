import {useState, useCallback} from 'react';
import {Button} from 'antd';
import styles from './index.less';

const Counter = ({defaultCount = 0}) => {
    const [count, setCount] = useState(defaultCount);

    const handleAdd = useCallback(
        () => {
            setCount(c => c + 1);
        },
        []
    );

    const handleSubtract = useCallback(
        () => {
            setCount(c => c - 1);
        },
        []
    );

    return (
        <div className={styles.root}>
            <div>Count：{count}</div>
            <Button onClick={handleAdd}>+</Button>
            <Button onClick={handleSubtract}>-</Button>
        </div>
    );
};

export default Counter;
