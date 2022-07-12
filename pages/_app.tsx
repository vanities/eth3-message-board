import App, { AppContext, AppInitialProps } from 'next/app'
import { wrapper } from 'redux/wrapper'

import 'bootstrap/dist/css/bootstrap.min.css'

import { Web3ReactProvider } from '@web3-react/core'
const { ethers } = require('ethers')

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider)

export class AppComponent extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      },
      appProp: ctx.pathname
    }
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    )
  }
}

export default wrapper.withRedux(AppComponent)
