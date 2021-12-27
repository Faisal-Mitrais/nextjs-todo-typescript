import React from "react";
import '../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import LayoutComponent from "../layout";
import { store } from '../store'
import { Provider } from 'react-redux'

React.useLayoutEffect = React.useEffect;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </Provider>
  )
}

export default MyApp
