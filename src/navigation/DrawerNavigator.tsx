import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent';
import { useTheme } from '../context/ThemeContext';
import TabNavigator from './TabNavigator';
import { DrawerParamList } from '../types/task';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '82%',
          backgroundColor: colors.surface,
        },
        overlayColor: colors.overlay,
        swipeEdgeWidth: 48,
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}
