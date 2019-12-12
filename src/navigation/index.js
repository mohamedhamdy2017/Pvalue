import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Home} from '../screens/Home';
import ItemDetails from '../screens/ItemDetails';

const rootNav = createSwitchNavigator({
  Home: {screen: Home},
  ItemDetails: {screen: ItemDetails},
});

export default createAppContainer(rootNav);
