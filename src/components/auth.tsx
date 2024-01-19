import React from 'react';
import { View, Button } from 'react-native';
import * as Facebook from 'expo-facebook';
import { useAuthStore } from 'store/authStore';

const FacebookLoginButton: React.FC = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    console.log('auth state', useAuthStore);

    const handleFacebookLogin = async () => {
        try {
            const response = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (response) {
                if (response.type === 'success') {
                    login();
                } else {
                    logout();
                }
            }

        } catch (error) {
            console.error('Facebook login error:', error);
        }
    };

    return (
        <View>
            <Button title={isAuthenticated ? 'Logout' : 'Login with Facebook'} onPress={handleFacebookLogin} />
        </View>
    );
};

export default FacebookLoginButton;
