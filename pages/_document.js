import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/ofx3pan.css" />
          <link rel="icon" href="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-32x32.png" sizes="32x32" />
          <link rel="icon" href="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-192x192.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-180x180.png" />
          <meta name="msapplication-TileImage" content="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-270x270.png" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
