module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const isDev = /dev(elopment)?/.test(process.env.NODE_ENV);

  return {
    presets: [["@babel/preset-env"], "@babel/preset-react"],
    plugins: [isDev && "react-refresh/babel"].filter(Boolean),
  };
};
