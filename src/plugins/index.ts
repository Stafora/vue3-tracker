import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export function registerPlugins(app) {
    app.component('VueDatePicker', VueDatePicker)
}