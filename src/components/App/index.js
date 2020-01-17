import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Home} from '..';
import styles from './styles.less';

const App = () => (
    <BrowserRouter>
        <div className={styles.app}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
