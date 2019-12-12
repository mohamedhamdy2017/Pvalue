import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';

import {Home} from './screens/Home';
import {ItemDetails} from './screens/ItemDetails';
import Navigation from './navigation';

export class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        <Navigation />
      </Provider>
    );
  }
}
