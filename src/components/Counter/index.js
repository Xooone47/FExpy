import {useState, useCallback} from 'react';
import {Button} from 'antd';
import img from './assets/blackCat.jpeg';
import styles from './index.less';

const Counter = ({defaultCount = 0}) => {
    const [count, setCount] = useState(defaultCount);

    const handleAdd = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    function handleSubtract() {
        setCount(count - 1);
    }

    return (
        <div className={styles.root}>
            <div>Count：{count}</div>
            <Button onClick={handleAdd}>+</Button>
            <Button onClick={handleSubtract}>-</Button>
            <img src={img} alt="black cat" className={styles.cat} />
        </div>
    );
};

export default Counter;
