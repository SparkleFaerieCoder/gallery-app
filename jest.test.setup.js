// import { setI18nConfig } from './src/utils/language';

// Must mock they keyboard aware or it throws an error
// https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/493#issuecomment-883882392
// jest.mock('react-native-keyboard-aware-scroll-view', () => {
//   return {
//     KeyboardAwareScrollView: jest.fn().mockImplementation(({ children }) => children),
//   };
// });

// jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));

beforeAll(() => {
  //TODO: enable with localization setup
  // setI18nConfig();
});
