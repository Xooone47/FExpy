import {useState} from 'react';
import {Button} from 'antd';

const Counter = ({defaultCount = 0}) => {
    const [count, setCount] = useState(defaultCount);

    function handleAdd() {
        setCount(count + 1);
    }

    function handleSubtract() {
        setCount(count - 1);
    }

    return (
        <div>
            <div>Count：{count}</div>
            <Button onClick={handleAdd}>+</Button>
            <Button onClick={handleSubtract}>-</Button>
        </div>
    );
};

export default Counter;
