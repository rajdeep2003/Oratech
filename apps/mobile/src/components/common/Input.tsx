import { View, TextInput, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
}

/**
 * Reusable Input Component with NativeWind styling
 * 
 * Includes error handling and custom styling
 * 
 * @example
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={emailError}
 * />
 */
export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  multiline = false,
}: InputProps) {
  return (
    <StyledView className="mb-4">
      {label && <StyledText className="text-gray-700 font-semibold mb-2">{label}</StyledText>}
      <StyledTextInput
        className={`border border-gray-300 rounded-lg px-4 py-3 ${error ? 'border-red-500 bg-red-50' : 'bg-white'} ${disabled ? 'opacity-50 bg-gray-100' : ''}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        multiline={multiline}
        placeholderTextColor="#999"
      />
      {error && <StyledText className="text-red-600 text-sm mt-1">{error}</StyledText>}
    </StyledView>
  );
}
