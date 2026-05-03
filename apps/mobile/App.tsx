import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { styled } from 'nativewind';

import store from '@store';
import RootNavigator from '@navigation/RootNavigator';

const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StyledSafeAreaView className="flex-1">
          <RootNavigator />
        </StyledSafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}