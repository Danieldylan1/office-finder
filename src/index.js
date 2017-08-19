import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/header';
import OfficeSearch from './components/office_search';
import OfficeBooking from './components/office_booking';
import BookingDetail from './components/booking_detail';
import SimpleForm from './components/simple_form';
import Hello from './components/hello';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Header/>
        <div className="app-header">Office Finder</div>
        <Switch>
          <Route path="/hello" component={Hello} />
          <Route path="/office/:id/booking" component={OfficeBooking} />
          <Route path="/booking/:id/detail" component={BookingDetail} />
          <Route path="/form/simple" component={SimpleForm} />
          <Route path="/" component={OfficeSearch} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container'));
