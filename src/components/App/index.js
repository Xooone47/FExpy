import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {RecoilRoot} from 'recoil';
import {store} from '@/store';
import {Home} from '..';
import styles from './styles.less';

const App = () => (
    <RecoilRoot>
        <Provider store={store}>
            <BrowserRouter>
                <div className={styles.root}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    </RecoilRoot>
);

export default App;
