import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';

import Nprogress from 'nprogress';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routerChangeStart', () => Nprogress.start());
Router.events.on('routerChangeComplete', () => Nprogress.done());
Router.events.on('routerChangeError', () => Nprogress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;

  return { pageProps };
};

export default withData(MyApp);
