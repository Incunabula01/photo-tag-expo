import Head from "expo-router/head";
import { ResponsiveNavigator } from "@/components/navigator";

import * as Facebook from 'expo-facebook';

// Initialize Facebook SDK
Facebook.initializeAsync({
  appId: process.env.EXPO_PUBLIC_API_FACEBOOK_CLIENT_ID,
});


export default function Layout() {
  return (
    <>
      <Head>
        <title>Expogram</title>
        <meta
          name="description"
          content="Expo Router Instagram responsive layout demo using SCSS"
        />
      </Head>
      <ResponsiveNavigator />
    </>
  );
}
