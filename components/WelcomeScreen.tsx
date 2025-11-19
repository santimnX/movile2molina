// components/WelcomeScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const userEmail = params.userEmail as string;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleExplore = () => {
    // Puedes redirigir a donde quieras después
    console.log('Navegar al home principal');
    // router.push('/home');
  };

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-50 to-green-50 px-4">
      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }] 
        }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
      >
        {/* Icono principal */}
        <Text className="text-6xl text-center mb-4">🎉</Text>
        
        {/* Títulos */}
        <Text className="text-3xl font-bold text-center mb-2 text-gray-800">
          ¡Bienvenido!
        </Text>
        
        {userEmail && (
          <Text className="text-lg text-center mb-4 text-blue-600 font-medium">
            {userEmail}
          </Text>
        )}
        
        <Text className="text-base text-center mb-6 text-gray-600">
          Tu sesión ha sido iniciada exitosamente
        </Text>
        
        {/* Comidas animadas */}
        <View className="flex-row justify-center mb-8">
          {['🍕', '🍔', '🍣', '🍦', '☕', '🎂'].map((emoji, index) => (
            <Animated.Text 
              key={index}
              style={{ 
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }}
              className="text-4xl mx-1"
            >
              {emoji}
            </Animated.Text>
          ))}
        </View>
        
        {/* Mensaje de comida */}
        <Text className="text-center text-gray-500 mb-6 italic">
          "¿Hambre? ¡Celebremos con algo delicioso!"
        </Text>
        
        {/* Botón principal */}
        <TouchableOpacity
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-4 rounded-xl justify-center items-center mt-4 shadow-lg"
          onPress={handleExplore}
        >
          <Text className="text-white font-bold text-lg">
            🍽️ Empezar a Explorar
          </Text>
        </TouchableOpacity>
        
        {/* Botón secundario */}
        <TouchableOpacity
          className="w-full border border-gray-300 py-3 rounded-xl justify-center items-center mt-3"
          onPress={() => router.back()}
        >
          <Text className="text-gray-600 font-medium">
            Volver al Login
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}