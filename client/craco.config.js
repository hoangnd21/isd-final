const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            "@primary-color": "#86bc26",
            "@link-color": "#86bc26",
            "@border-radius-base": "2px"
          },
          javascriptEnabled: true
        }
      }
    }
  ]
};