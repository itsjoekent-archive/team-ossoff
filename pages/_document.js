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
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://use.typekit.net/ofx3pan.css" />
          <link rel="icon" href="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-32x32.png" sizes="32x32" />
          <link rel="icon" href="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-192x192.png" sizes="192x192" />
          <link rel="apple-touch-icon" href="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-180x180.png" />
          <meta name="msapplication-TileImage" content="https://electjon.com/wp-content/uploads/2020/05/cropped-osfav-270x270.png" />
          <meta name="twitter:card" content="summary" />
          <meta property="og:image" content="https://teamossoff.com/assets/default-social.png" />
          <meta property="og:title" content="Team Ossoff" />
          <meta property="og:description" content="Join our people powered campaign to elect Jon to the Senate." />
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
