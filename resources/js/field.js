Nova.booting((Vue, router, store) => {
    Vue.component('index-broadcaster-field', require('./components/broadcaster-field/IndexField'));
    Vue.component('detail-broadcaster-field', require('./components/broadcaster-field/DetailField'));
    Vue.component('form-broadcaster-field', require('./components/broadcaster-field/FormField'));

    Vue.component('index-broadcaster-currency-field', require('./components/broadcaster-currency-field/IndexField'));
    Vue.component('detail-broadcaster-currency-field', require('./components/broadcaster-currency-field/DetailField'));
    Vue.component('form-broadcaster-currency-field', require('./components/broadcaster-currency-field/FormField'));

    Vue.component('index-listener-field', require('./components/listener-field/IndexField'));
    Vue.component('detail-listener-field', require('./components/listener-field/DetailField'));
    Vue.component('form-listener-field', require('./components/listener-field/FormField'));
})
