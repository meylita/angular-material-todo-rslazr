import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import 'jasmine-core/lib/jasmine-core/boot.js';

declare var jasmine: any;

import './polyfills';
import 'zone.js/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { TestBed } from '@angular/core/testing';

import './app/app.component.spec.ts';
import { AppModule } from './app/app.module';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
});

platformBrowserDynamicTesting()
  .bootstrapModule(AppModule)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));

(function bootstrap() {
  if (window['jasmineRef']) {
    location.reload();

    return;
  }

  window.onload(new Event('anything'));
  window['jasmineRef'] = jasmine.getEnv();
})();
