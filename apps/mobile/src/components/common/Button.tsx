import { Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-blue-600 active:bg-blue-700',
  secondary: 'bg-gray-400 active:bg-gray-500',
  danger: 'bg-red-600 active:bg-red-700',
  success: 'bg-green-600 active:bg-green-700',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

/**
 * Reusable Button Component with NativeWind styling
 * 
 * @example
 * <Button 
 *   title="Submit" 
 *   variant="primary" 
 *   size="lg"
 *   onPress={() => handleSubmit()}
 * />
 */
export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const buttonClass = `${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} rounded-lg items-center justify-center ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50' : ''}`;

  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={buttonClass}
    >
      <StyledText className="text-white font-semibold">{title}</StyledText>
    </StyledTouchableOpacity>
  );
}
