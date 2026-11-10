import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import * as layout from './layout-parts';

const meta: Meta = {
  title: 'Layout/Sidebar และ TopBar',
  id: 'layout-shell',
  decorators: [moduleMetadata({ imports: [layout.Sidebar, layout.Topbar] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Sidebar: StoryObj = {
  name: 'Sidebar (เจ้าหน้าที่)',
  render: () => ({ template: `<div style="height:640px; display:flex"><p-sidebar /></div>` }),
};

export const TopBar: StoryObj = {
  name: 'TopBar',
  render: () => ({ template: `<p-topbar />` }),
};
