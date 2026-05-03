import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colors, Radius, Spacing } from '../theme';

const BackButton = ({ onPress }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.arrow}>{'←'}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  arrow: {
    fontSize: 20,
    color: Colors.white,
  },
});

export default BackButton;
