import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import Router from './Router';

import App from './App';
import { Provider } from 'react-redux';
// import store from './store/BlogStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      {/* <App /> */}
    {/* </Provider> */}
    <RouterProvider router={Router} />

  </React.StrictMode>
);
