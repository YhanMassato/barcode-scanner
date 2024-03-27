import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, Linking} from 'react-native';
import { BarCodeScanner} from 'expo-barcode-scanner';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async() => {
      cost {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  if(hasPermission === null) {
    return <Text>Solicitamos a permissão para usar a câmera.</Text>;
  }
  if (hasPermission === false) {
    return <Text>Precisamos do acesso à câmera para que o app funcione!</Text>;
  }

  const handleBarCodeScanned = ({ type, data}) => {
    
  
  }

