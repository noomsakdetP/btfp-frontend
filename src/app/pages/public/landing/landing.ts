import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import {
  BtfpGrantCallCard,
  BtfpHeroBanner,
  BtfpHeroSlide,
  BtfpIcon,
  BtfpNewsCard,
  BtfpProcessStep,
  BtfpResultCard,
  BtfpSectionHeader,
  BtfpShowcaseCard,
} from '../../../shared/ui';

/**
 * หน้าแรกเว็บไซต์สาธารณะ "ระบบประกาศทุนและผลงานทุน กทปส."  Figma: 50:6410
 * หุ่นจำลอง: markup + CSS เท่านั้น ไม่มีตัวแปรและ logic ในคลาสนี้
 */
@Component({
  selector: 'btfp-landing-page',
  imports: [
    RouterLink,
    Button,
    IconField,
    InputIcon,
    InputText,
    Select,
    Tabs,
    TabList,
    Tab,
    BtfpIcon,
    BtfpGrantCallCard,
    BtfpHeroBanner,
    BtfpHeroSlide,
    BtfpNewsCard,
    BtfpProcessStep,
    BtfpResultCard,
    BtfpSectionHeader,
    BtfpShowcaseCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {}
