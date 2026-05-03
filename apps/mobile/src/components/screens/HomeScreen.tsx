import { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { styled } from 'nativewind';
import { Button, Card, Input } from '@components/common';

const StyledScrollView = styled(ScrollView);
const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    setMessage('Form submitted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="items-center justify-center py-12 px-4">
        <StyledText className="text-3xl font-bold text-gray-800 mb-2">Welcome to ORA</StyledText>
        <StyledText className="text-base text-gray-600">Your mobile app starts here</StyledText>
      </StyledView>

      <Card elevated>
        <StyledText className="text-xl font-semibold text-gray-800 mb-4">Get Started</StyledText>
        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        <Button
          title="Submit"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleSubmit}
        />
      </Card>

      {message && (
        <StyledView className="bg-green-100 rounded-lg p-4 mx-4 my-4">
          <StyledText className="text-green-700">{message}</StyledText>
        </StyledView>
      )}

      <Card outlined>
        <StyledText className="text-xl font-semibold text-gray-800 mb-4">Features</StyledText>
        <StyledView className="gap-2">
          <StyledText className="text-gray-700">✓ React Native + Expo</StyledText>
          <StyledText className="text-gray-700">✓ Tailwind CSS (NativeWind)</StyledText>
          <StyledText className="text-gray-700">✓ TypeScript</StyledText>
          <StyledText className="text-gray-700">✓ Redux State Management</StyledText>
        </StyledView>
      </Card>
    </StyledScrollView>
  );
}
