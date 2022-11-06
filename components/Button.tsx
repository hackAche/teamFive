import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
interface ButtonsProps extends TouchableOpacityProps {
  variante: 'primary' | 'secundary' | 'tertiary';
  icon?: 'arrowleft' | 'save' | 'logout' | 'clouduploado' | 'upload' | 'refresh-cw';

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
      <TouchableOpacity {...rest}>
        <LinearGradient
          style={styles.iconTabRound}
          colors={['#D500F9', '#4A148C']}
        >
          <Text style={{ color: Colors[colorScheme].white, fontSize: 16 }}>
          <Icon name={icon || 'info'} size={22} color={Colors[colorScheme].white} />
          
          </Text>
        </LinearGradient>
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
  iconTabRound: {
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
