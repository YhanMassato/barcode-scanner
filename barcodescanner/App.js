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
      const {status} = await BarCodeScanner.requestPermissionsAsync();
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
    setScanned(true);
    setData(data);
    alert(`O código de barras é do tipo ${type} e ${data} é o dado que foi escaneado!`);
  }

  const handleOpenLink = () => {
    Linking.openURL(data);
  }

  return(
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="qrcode-scan"
        size={100}
        color="orange"/>
      <Text style={styles.container}>Leitor de QR Code</Text>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && <Button title={'Toque para digitalizar novamente'} onPress={() => setScanned(false)}/>}
      {scanned && <View style={styles.segBotao}><Button title={'Abrir link: '+data} onPress={handleOpenLink}/></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraContainer: {
    width: '90%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkorange',
  },
  segBotao: {
    marginTop: 15,
  }

});
