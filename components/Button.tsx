import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
interface ButtonsProps extends TouchableOpacityProps {
  variante: 'primary' | 'secundary' | 'tertiary';
  icon?: 'arrowleft' | 'save' | 'logout' | 'clouduploado' | 'upload' | 'reload1';

  children?: string;
}

export default function Button({ children, variante, icon, ...rest }: ButtonsProps) {
  const colorScheme = useColorScheme();
  if (variante === 'primary') {
    return (
      <TouchableOpacity {...rest}>
        <LinearGradient
          style={{ height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}
          colors={['#D500F9', '#4A148C']}
        >
          <Text style={{ color: Colors[colorScheme].white, fontSize: 16, marginHorizontal: 75 }}>
            {children}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else if (variante === 'secundary') {
    return (
      <TouchableOpacity
        style={[
          {},
          { backgroundColor: rest.disabled ? Colors[colorScheme].text : Colors[colorScheme].text },
        ]}
        {...rest}
      >
        {icon && <Icon name={icon} size={25} color={Colors[colorScheme].text} />}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 55,
          height: 55,
          backgroundColor: Colors[colorScheme].text,

          borderRadius: 16,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            name={icon}
            size={25}
            color={Colors[colorScheme].text}
            style={{ fontWeight: '900' }}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    marginHorizontal: 75,
  },
});
