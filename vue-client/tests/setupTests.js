// setupTests.js
import { config } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';
import { vi } from 'vitest'

// Install PrimeVue globally in tests
config.global.plugins = [PrimeVue, ConfirmationService, ToastService];

config.global.directives = {
  tooltip: Tooltip,
  focustrap: FocusTrap,
};