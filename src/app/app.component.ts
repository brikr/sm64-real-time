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
    if (Number.isNaN(num) || num < 0 || num > 60) {
      this.strings.time.seconds = '00';
      this.values.time.seconds = 0;
    } else {
      this.strings.time.seconds = this.padTime(num);
      this.values.time.seconds = num;
    }
  }

  updateCentiseconds(value: string) {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num) || num < 0 || num > 100) {
      this.strings.time.centiseconds = '00';
      this.values.time.centiseconds = 0;
    } else {
      this.strings.time.centiseconds = this.padTime(num);
      this.values.time.centiseconds = num;
    }
  }

  updateLagStart(value: string) {
    const num = this.formatCount(value);
    if (num > this.values.lag.end) {
      this.updateLagEnd(String(num));
    }
    this.strings.lag.start = String(num);
    this.values.lag.start = num;
  }

  updateLagEnd(value: string) {
    let num = this.formatCount(value);
    if (num < this.values.lag.start) {
      num = this.values.lag.start;
    }
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
    const igtFrames = Math.ceil(
        ((this.values.time.minutes * 60) + (this.values.time.seconds) +
         this.values.time.centiseconds / 100) *
        60);

    const lagFrames = this.values.lag.end - this.values.lag.start +
        this.values.fadeouts.baseCount * 4 +
        this.values.fadeouts.ttmCount * 148;

    const realSeconds = (igtFrames + lagFrames) / (60000 / 1001);
    const pad = realSeconds % 60 < 10 ? '0' : '';

    return `${Math.floor(realSeconds / 60).toFixed(0)}:${pad}${
        (realSeconds % 60).toFixed(2)}`;
  }

  private formatCount(value: string): number {
    const num = Number.parseInt(value, 10);
    if (Number.isNaN(num) || num < 0) {
      return 0;
    } else {
      return num;
    }
  }

  private padTime(value: number): string {
    const pad = value < 10 ? '0' : '';
    return pad + value;
  }
}
