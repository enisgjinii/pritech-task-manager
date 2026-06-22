import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent';
import { colors } from '../constants/colors';
import TabNavigator from './TabNavigator';
import { DrawerParamList } from '../types/task';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
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
        overlayColor: 'rgba(10, 17, 40, 0.45)',
        swipeEdgeWidth: 48,
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}
