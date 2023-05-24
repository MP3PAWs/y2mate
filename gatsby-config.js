module.exports = {
  siteMetadata: {
    title: `Y2mate - Youtube Downloader | Download Youtube Video Free in HD`,
    description: `Y2mate is easy to use and powerful Youtube downloader that allows you to easily save your favorite Youtube video and download them as mp3 music and mp4 files for free`,
    author: `@y2mate`,
    siteUrl: `https://y2mate.mobi/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Y2mate`,
        short_name: `Y2mate`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-257217301-4",
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        excludes: [
          `/404`,
          `/download`,
          `/search`,
        ],
      },
    },
  ],
}
