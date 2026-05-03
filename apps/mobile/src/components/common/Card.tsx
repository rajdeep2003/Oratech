import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface CardProps {
  title?: string;
  children: React.ReactNode;
  elevated?: boolean;
  outlined?: boolean;
}

/**
 * Reusable Card Component with NativeWind styling
 * 
 * Provides container with shadow and border options
 * 
 * @example
 * <Card title="User Info" elevated>
 *   <Text>Card content here</Text>
 * </Card>
 */
export default function Card({
  title,
  children,
  elevated = false,
  outlined = false,
}: CardProps) {
  const cardClass = `bg-white rounded-lg p-4 ${elevated ? 'shadow-lg' : 'shadow'} ${outlined ? 'border border-gray-200' : ''}`;

  return (
    <StyledView className={cardClass}>
      {title && <StyledText className="text-lg font-bold text-gray-800 mb-3">{title}</StyledText>}
      <View>{children}</View>
    </StyledView>
  );
}
