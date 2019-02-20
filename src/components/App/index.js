import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {
    Title
} from '../index';
import styles from './styles.less';

const App = () => (
    <div className={styles.app}>
        <Switch>
            <Route path="/" exact component={Title} />
            <Redirect from="*" to="/" />
        </Switch>
    </div>
);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);

