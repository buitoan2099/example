module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./'],
        alias: {
          '@assets': './src/assets',
          '@commons': './src/commons',
          '@utils': './src/commons/utils',
          '@defines': './src/commons/defines',
          '@hooks': './src/commons/hooks',
          // "@themes": ["./src/themes"],
          // "@themes/*": ["./src/themes/*"],
          // "@functions": ["./src/app/features"],
          // "@functions/*": ["./src/app/features/*"],
          '@navigations': './src/navigations',
          // "@screens": ["./src/app/features/FeaturesScreen.tsx"],
          // "@screens/*": ["./src/app/features"],
          // "@viewModels": ["./src/app/viewModels"],
          // "@viewModels/*": ["./src/app/viewModels/*"],
          // "@models": ["./src/app/models"],
          // "@models/*": ["./src/app/models/*"],
          '@components': './src/components',
          // "@services": ["./src/app/repositories"],
          // "@services/*": ["./src/app/repositories/*"],
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes', '__scanEkycFace'],
      },
    ],
  ],
};
