import Head from "next/head";

export type CommonHeadProps = {
  title?: string;
  desc?: string;
  url?: string;
  ogImage?: {
    url: string;
    alt: string;
    height: string;
    width: string;
    contentType: string;
  };
  twitterImage?: {
    url: string;
    alt: string;
  };
};

const defaultProps: CommonHeadProps = {
  title: "The Space Book Club",
  desc:
    "Find the best recommendations for space-themed books, lovingly curated by the patrons of Jake Robins.",
  url: "https://books.offnominal.space",
  twitterImage: {
    url: "https://books.offnominal.space/onbc_social.png",
    alt: "The Space Book Club Logo with space-themed book icons",
  },
  ogImage: {
    url: "https://books.offnominal.space/onbc_social.png",
    alt: "The Space Book Club Logo with space-themed book icons",
    height: "1147",
    width: "2000",
    contentType: "image/png",
  },
};

export default function CommonHead(props: CommonHeadProps) {
  const title = props.title || defaultProps.title;
  const desc = props.desc || defaultProps.desc;
  const url = props.url || defaultProps.url;
  const twitterImage = props.twitterImage || defaultProps.twitterImage;
  const ogImage = props.ogImage || defaultProps.ogImage;

  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />

      <link rel="icon" href="/favicons/favicon-32.png" sizes="32x32" />
      <link rel="icon" href="/favicons/favicon-57.png" sizes="57x57" />
      <link rel="icon" href="/favicons/favicon-76.png" sizes="76x76" />
      <link rel="icon" href="/favicons/favicon-96.png" sizes="96x96" />
      <link rel="icon" href="/favicons/favicon-128.png" sizes="128x128" />
      <link rel="icon" href="/favicons/favicon-192.png" sizes="192x192" />
      <link rel="icon" href="/favicons/favicon-228.png" sizes="228x228" />

      <link
        rel="shortcut icon"
        sizes="196x196"
        href="/favicons/favicon-196.png"
      />

      <link
        rel="apple-touch-icon"
        href="/favicons/favicon-120.png"
        sizes="120x120"
      />
      <link
        rel="apple-touch-icon"
        href="path/to/favicon-152.png"
        sizes="152x152"
      />
      <link
        rel="apple-touch-icon"
        href="path/to/favicon-180.png"
        sizes="180x180"
      />

      <meta name="msapplication-TileColor" content="#434343" />
      <meta
        name="msapplication-TileImage"
        content="/favicons/favicon-144.png"
      />

      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />

      <meta property="og:url" content={url} key="url" />
      <meta property="og:type" content="website" key="type" />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:description" content={desc} key="description" />
      <meta property="og:image" content={ogImage.url} key="og_image" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter_card"
      />
      <meta name="twitter:site" content="@JakeOnOrbit" key="site_handle" />
      <meta
        name="twitter:creator"
        content="@JakeOnOrbit"
        key="creator_handle"
      />
      <meta
        name="twitter:description"
        content={desc}
        key="twitter_description"
      />
      <meta name="twitter:title" content={title} key="twitter_title" />
      <meta
        name="twitter:image"
        content={twitterImage.url}
        key="twitter_image"
      />
      <meta
        name="twitter:image:alt"
        content={twitterImage.alt}
        key="twitter_image_alt"
      />

      <title>{title}</title>
    </Head>
  );
}
