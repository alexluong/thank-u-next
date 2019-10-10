require("dotenv").config()

module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-116347511-2",
      },
    },
  ],
}
