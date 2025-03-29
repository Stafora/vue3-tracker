import type { App } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { createPinia } from 'pinia';

export function registerPlugins(app: App): void {
  app.component('VueDatePicker', VueDatePicker);

  const pinia = createPinia();
  app.use(pinia);
}
