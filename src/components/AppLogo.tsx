import { Image, StyleSheet, View } from 'react-native';

const logo = require('../../assets/images/logo.jpg');

interface AppLogoProps {
  height?: number;
}

export default function AppLogo({ height = 28 }: AppLogoProps) {
  const width = height * 3.2;

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width, height }}
        resizeMode="contain"
        accessibilityLabel="pritech logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
