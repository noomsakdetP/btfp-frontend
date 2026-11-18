import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { PublicFooter } from '../../../layout/public-layout/public-footer';
import { AutoRotate, CountUp, Reveal, ScrollRow, ScrollState, UiIcon } from '../../../shared/ui';

/** หน้าแรก แนวใหม่ (ทดลอง รอลูกค้าเลือก)  Figma: แนวใหม่ (ทดลอง) > Topbar เลื่อนจริง A: บนสุด 827:61 */
@Component({
  selector: 'p-landing-new-page',
  imports: [
    RouterLink,
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionPanel,
    Button,
    IconField,
    InputIcon,
    InputText,
    Select,
    Tab,
    TabList,
    Tabs,
    PublicFooter,
    CountUp,
    ScrollState,
    ScrollRow,
    Reveal,
    AutoRotate,
    UiIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing-new.html',
  styleUrl: './landing-new.scss',
})
export class LandingNewPage {}
