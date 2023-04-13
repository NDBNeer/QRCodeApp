import React, { useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [orgId, setOrgId] = useState('123');
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  const handleScannerResult = ({ type, data }) => {
    setScannedData(data);
    setShowScanner(false);
  };

  const handleScanAgain = () => {
    setScannedData(null);
    setShowScanner(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Organization ID: {orgId}</Text>
      {scannedData ? (
        <>
          <Text style={{ fontSize: 16, marginVertical: 10 }}>Scanned data:</Text>
          <Text>{scannedData}</Text>
          <Button title="Scan again" onPress={handleScanAgain} />
        </>
      ) : (
        <>
          <QRCode
            value={orgId}
            size={200}
            backgroundColor='white'
            color='black'
            logoSize={50}
            logoBackgroundColor='transparent'
          />
          <Button title="Scan QR code" onPress={() => setShowScanner(true)} />
        </>
      )}
      {showScanner && (
        <BarCodeScanner
          onBarCodeScanned={handleScannerResult}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      )}
    </View>
  );
}
