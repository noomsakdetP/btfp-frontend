import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { BtfpSidebar } from './sidebar/sidebar';
import { BtfpTopbar } from './topbar/topbar';

const meta: Meta = {
  title: 'Layout/Sidebar และ TopBar',
  id: 'layout-shell',
  decorators: [moduleMetadata({ imports: [BtfpSidebar, BtfpTopbar] })],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Sidebar: StoryObj = {
  name: 'Sidebar (เจ้าหน้าที่)',
  render: () => ({ template: `<div style="height:640px; display:flex"><btfp-sidebar /></div>` }),
};

export const TopBar: StoryObj = {
  name: 'TopBar',
  render: () => ({ template: `<btfp-topbar />` }),
};
