import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BtfpRowActions } from './row-actions';

const meta: Meta<BtfpRowActions> = {
  title: 'Components/Actions/Row Actions',
  component: BtfpRowActions,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ConfirmDialog] })],
  parameters: {
    docs: {
      description: {
        component: [
          'ปุ่มจัดการท้ายแถวตาราง (Figma: Domain/Table Row Actions)',
          '',
          '- ลำดับ **ดู แก้ไข ลบ** เสมอ ส่งมาลำดับไหน component จะเรียงให้เอง',
          '- กด **ลบ** จะเปิดป๊อปอัปยืนยันก่อนทุกครั้ง event `delete` จะส่งออกมาหลังผู้ใช้กดยืนยันเท่านั้น',
          '- ต้องมี `<p-confirmdialog />` ใน layout (มีแล้วใน btfp-staff-layout)',
        ].join('\n'),
      },
    },
  },
  args: { actions: 'view,edit,delete', itemLabel: 'ข้อเสนอ 2569/0042' },
  render: (args) => ({
    props: { ...args, log: (msg: string) => console.log(msg) },
    template: `
      <btfp-row-actions [actions]="actions" [itemLabel]="itemLabel"
        (view)="log('view')" (edit)="log('edit')" (delete)="log('deleted')" />
      <p-confirmdialog [style]="{ width: '440px' }" />`,
  }),
};
export default meta;
type Story = StoryObj<BtfpRowActions>;

export const ViewEditDelete: Story = { name: 'ดู แก้ไข ลบ' };
export const ViewOnly: Story = { name: 'ดูอย่างเดียว (ใช้ใน B-21)', args: { actions: 'view' } };
export const WrongOrder: Story = {
  name: 'ส่งลำดับผิด ระบบเรียงให้',
  args: { actions: 'delete,view,edit' },
};
