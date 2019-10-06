import { FOREGROUND, BACKGROUND, INACTIVE } from 'redux-enhancer-react-native-appstate';

function reducer(state = '', action) {
  switch (action.type) {
    case FOREGROUND:
      return 'back to foreground';
    case BACKGROUND:
      return 'background';
    case INACTIVE:
      return 'inactive';
    default:
      return state
  }
}