import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Weather from './pages/Weather';
import TravelAndTodo from './pages/TravelAndTodo';

export default function App() {

  return (
      <>
        {/* <Weather /> */}
        <TravelAndTodo />
      </>
  );
}
