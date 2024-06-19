module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      [
        "module-resolver",
        {
          root: ".",
          alias: {
            assets: "./assets",
            lottie: "./assets/lottie",
            jpg: "./assets/jpg",
            svg: "./assets/svg",
            src: "./src",
            api: "./src/api",
            components: "./src/components",
            hooks: "./src/hooks",
            modules: "./src/modules",
            navigation: ".src/navigation",
            store: ".src/store",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
