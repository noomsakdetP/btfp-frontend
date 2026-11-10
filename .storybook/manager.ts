import { addons } from 'storybook/manager-api';
import { storybookTheme } from './theme';

// แถบเมนูซ้ายของ Storybook ใช้ฟอนต์และสีตาม Design Token
addons.setConfig({ theme: storybookTheme });
