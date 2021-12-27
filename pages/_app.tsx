import React from "react";
import '../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import LayoutComponent from "../layout";

React.useLayoutEffect = React.useEffect;

function MyApp({ Component, pageProps }: AppProps) {
  return <LayoutComponent>
    <Component {...pageProps} />
  </LayoutComponent>
}

export default MyApp
