import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { BtfpRowActions } from '../row-actions/row-actions';
import { BtfpStatusTag } from '../status-tag/status-tag';

/**
 * ตาราง (Figma: Domain/Data Table, Table Header Cell, Table Cell)
 * ไม่ใช่ component แต่เป็น class ใน src/styles.scss หน้า Docs อยู่ใน table.mdx
 */
const meta: Meta = {
  title: 'Components/Data Display/Table',
  id: 'components-data-display-table',
  decorators: [moduleMetadata({ imports: [BtfpStatusTag, BtfpRowActions, ConfirmDialog] })],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  name: 'ตารางพื้นฐาน',
  render: () => ({
    template: `
<div class="overflow-x-auto">
  <table class="btfp-table min-w-[880px]">
    <colgroup>
      <col class="w-14" />
      <col class="w-[130px]" />
      <col />
      <col class="w-[170px]" />
      <col class="w-[216px]" />
      <col class="w-28" />
    </colgroup>
    <thead>
      <tr>
        <th class="btfp-table__check"><input type="checkbox" class="btfp-checkbox is-indeterminate" aria-label="เลือกทั้งหมด" /></th>
        <th>เลขที่คำขอ</th>
        <th>ชื่อโครงการ</th>
        <th class="btfp-table__money">วงเงิน (บาท)</th>
        <th>สถานะ</th>
        <th class="btfp-table__actions">จัดการ</th>
      </tr>
    </thead>
    <tbody>
      <tr class="is-selected">
        <td class="btfp-table__check"><input type="checkbox" class="btfp-checkbox" checked aria-label="เลือก 2569/0042" /></td>
        <td>2569/0042</td>
        <td title="ศูนย์ทดสอบอุปกรณ์โทรคมนาคมชุมชน">ศูนย์ทดสอบอุปกรณ์โทรคมนาคมชุมชน</td>
        <td class="btfp-table__money">1,250,000.00</td>
        <td><btfp-status-tag status="review" /></td>
        <td class="btfp-table__actions"><btfp-row-actions actions="view,edit,delete" itemLabel="2569/0042" /></td>
      </tr>
      <tr>
        <td class="btfp-table__check"><input type="checkbox" class="btfp-checkbox" aria-label="เลือก 2569/0043" /></td>
        <td>2569/0043</td>
        <td title="ระบบเตือนภัยพิบัติผ่านโครงข่ายโทรคมนาคมสำหรับพื้นที่ห่างไกลและชุมชนชายขอบ">ระบบเตือนภัยพิบัติผ่านโครงข่ายโทรคมนาคมสำหรับพื้นที่ห่างไกลและชุมชนชายขอบ</td>
        <td class="btfp-table__money">3,480,000.00</td>
        <td><btfp-status-tag status="docs-incomplete" /></td>
        <td class="btfp-table__actions"><btfp-row-actions actions="view,edit,delete" itemLabel="2569/0043" /></td>
      </tr>
      <tr>
        <td class="btfp-table__check"><input type="checkbox" class="btfp-checkbox" aria-label="เลือก 2569/0044" /></td>
        <td>2569/0044</td>
        <td title="พัฒนาทักษะดิจิทัลสำหรับผู้สูงอายุ">พัฒนาทักษะดิจิทัลสำหรับผู้สูงอายุ</td>
        <td class="btfp-table__money">820,500.00</td>
        <td><btfp-status-tag status="submitted" /></td>
        <td class="btfp-table__actions"><btfp-row-actions actions="view,edit,delete" itemLabel="2569/0044" /></td>
      </tr>
    </tbody>
  </table>
</div>
<p-confirmdialog />`,
  }),
};

export const TwoLine: Story = {
  name: 'เซลล์ 2 บรรทัด',
  render: () => ({
    template: `
<div class="overflow-x-auto">
  <table class="btfp-table min-w-[640px]">
    <colgroup>
      <col />
      <col class="w-[216px]" />
      <col class="w-28" />
    </colgroup>
    <thead>
      <tr>
        <th>โครงการ</th>
        <th>สถานะ</th>
        <th class="btfp-table__actions">จัดการ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="btfp-table__2line">
          <span title="ศูนย์ทดสอบอุปกรณ์โทรคมนาคมชุมชน">ศูนย์ทดสอบอุปกรณ์โทรคมนาคมชุมชน</span>
          <span class="btfp-table__sub">มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี</span>
        </td>
        <td><btfp-status-tag status="review" /></td>
        <td class="btfp-table__actions"><btfp-row-actions actions="view" itemLabel="2569/0042" /></td>
      </tr>
      <tr>
        <td class="btfp-table__2line">
          <span title="พัฒนาทักษะดิจิทัลสำหรับผู้สูงอายุ">พัฒนาทักษะดิจิทัลสำหรับผู้สูงอายุ</span>
          <span class="btfp-table__sub">มูลนิธิเพื่อการพัฒนาชุมชน</span>
        </td>
        <td><btfp-status-tag status="draft" /></td>
        <td class="btfp-table__actions"><btfp-row-actions actions="view" itemLabel="2569/0044" /></td>
      </tr>
    </tbody>
  </table>
</div>`,
  }),
};
