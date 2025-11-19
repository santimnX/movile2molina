// app/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { loginSchema, LoginData } from '../lib/schemas/TextSchemas';
import '../global.css';

export default function LoginScreen() {
  const { setValue, getValues } = useForm<LoginData>();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const onSubmit = () => {
    const result = loginSchema.safeParse(getValues());

    if (result.success) {
      console.log('✅ Datos válidos:', result.data);
      setErrors({});
      setValidFields({ email: true, password: true });
      
      router.push({
        pathname: '/welcome',  // ← Solo el nombre del archivo en app/
        params: { userEmail: getValues().email }
      });
    } else {
      const fieldErrors: Record<string, string[]> = {};
      const fieldValidity: Record<string, boolean> = { email: true, password: true };

      result.error.errors.forEach((err) => {
        const field = err.path[0];
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(err.message);
        fieldValidity[field] = false;
      });

      setErrors(fieldErrors);
      setValidFields(fieldValidity);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-4">
      <View className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <Text className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Iniciar sesión
        </Text>

        <View className="w-full mb-1">
          <TextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChangeText={(text) => setValue('email', text)}
          />
          <Text className="mt-1">
            {validFields.email ? '✅' : errors.email ? '❌' : ''}
          </Text>
          {errors.email?.map((msg, i) => (
            <Text key={i} className="text-red-500 text-sm">
              {msg}
            </Text>
          ))}
        </View>

        <View className="w-full mb-1 mt-4">
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChangeText={(text) => setValue('password', text)}
          />
          <Text className="mt-1">
            {validFields.password ? '✅' : errors.password ? '❌' : ''}
          </Text>
          {errors.password?.map((msg, i) => (
            <Text key={i} className="text-red-500 text-sm">
              {msg}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          className="w-full bg-blue-500 py-3 rounded-lg justify-center items-center mt-6"
          onPress={onSubmit}
        >
          <Text className="text-white font-semibold">Iniciar sesión</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">¿No tienes cuenta?</Text>
          <TouchableOpacity>
            <Text className="ml-1 text-blue-500 font-semibold">Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}