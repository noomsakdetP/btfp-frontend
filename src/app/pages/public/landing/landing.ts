import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import {
  GrantCallCard,
  HeroBanner,
  HeroSlide,
  UiIcon,
  NewsCard,
  ProcessStep,
  ResultCard,
  SectionHeader,
  ShowcaseCard,
} from '../../../shared/ui';

/**
 * หน้าแรกเว็บไซต์สาธารณะ "ระบบประกาศทุนและผลงานทุน กทปส."  Figma: 50:6410
 * หุ่นจำลอง: markup + CSS เท่านั้น ไม่มีตัวแปรและ logic ในคลาสนี้
 */
@Component({
  selector: 'p-landing-page',
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
    UiIcon,
    GrantCallCard,
    HeroBanner,
    HeroSlide,
    NewsCard,
    ProcessStep,
    ResultCard,
    SectionHeader,
    ShowcaseCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingPage {}
