import {Component} from '@angular/core';

interface InputValues {
  time: {minutes: string; seconds: string; centiseconds: string;};
  lag: {start: string; end: string;};
  fadeouts: {baseCount: string; ttmCount: string;};
}

interface ActualValues {
  time: {minutes: number; seconds: number; centiseconds: number;};
  lag: {start: number; end: number;};
  fadeouts: {baseCount: number; ttmCount: number;};
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  ttmSlide = false;
  strings: InputValues = {
    time: {minutes: '', seconds: '', centiseconds: ''},
    lag: {start: '', end: ''},
    fadeouts: {baseCount: '', ttmCount: ''},
  };
  values: ActualValues = {
    time: {minutes: 0, seconds: 0, centiseconds: 0},
    lag: {start: 0, end: 0},
    fadeouts: {baseCount: 0, ttmCount: 0},
  };

  updateMinutes(value: string) {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num) || num < 0) {
      this.strings.time.minutes = '0';
      this.values.time.minutes = 0;
    } else {
      this.strings.time.minutes = String(num);
      this.values.time.minutes = num;
    }
  }

  updateSeconds(value: string) {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num) || num < 0) {
      this.strings.time.seconds = '00';
      this.values.time.seconds = 0;
    } else {
      this.strings.time.seconds = this.padTime(num, true);
      this.values.time.seconds = num;
    }
  }

  updateCentiseconds(value: string) {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num) || num < 0) {
      this.strings.time.centiseconds = '00';
      this.values.time.centiseconds = 0;
    } else {
      this.strings.time.centiseconds = this.padTime(num, false);
      this.values.time.centiseconds = num;
    }
  }

  updateLagStart(value: string) {
    const num = this.formatCount(value);
    this.strings.lag.start = String(num);
    this.values.lag.start = num;
  }

  updateLagEnd(value: string) {
    const num = this.formatCount(value);
    this.strings.lag.end = String(num);
    this.values.lag.end = num;
  }

  updateFadeoutsBase(value: string) {
    const num = this.formatCount(value);
    this.strings.fadeouts.baseCount = String(num);
    this.values.fadeouts.baseCount = num;
  }

  updateFadeoutsTTM(value: string) {
    const num = this.formatCount(value);
    this.strings.fadeouts.ttmCount = String(num);
    this.values.fadeouts.ttmCount = num;
  }

  toggleTTMSlide(value: boolean) {
    this.ttmSlide = value;
    if (!value) {
      this.strings.fadeouts.ttmCount = '';
      this.values.fadeouts.ttmCount = 0;
    }
  }

  getRealTime(): string {
    return `${this.values.time.minutes}:${
        this.padTime(
            this.values.time.seconds,
            true)}.${this.padTime(this.values.time.centiseconds, false)}`;
  }

  private formatCount(value: string): number {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num) || num < 0) {
      return 0;
    } else {
      return num;
    }
  }

  private padTime(value: number, lead: boolean): string {
    const pad = value < 10 ? '0' : '';
    if (lead) {
      return pad + value;
    } else {
      return value + pad;
    }
  }
}
