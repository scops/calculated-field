import IndexBroadcasterField from './components/broadcaster-field/IndexField'
import DetailBroadcasterField from './components/broadcaster-field/DetailField'
import FormBroadcasterField from './components/broadcaster-field/FormField'

import IndexBroadcasterCurrencyField from './components/broadcaster-currency-field/IndexField'
import DetailBroadcasterCurrencyField from './components/broadcaster-currency-field/DetailField'
import FormBroadcasterCurrencyField from './components/broadcaster-currency-field/FormField'

import IndexBroadcasterNumberField from './components/broadcaster-number-field/IndexField'
import DetailBroadcasterNumberField from './components/broadcaster-number-field/DetailField'
import FormBroadcasterNumberField from './components/broadcaster-number-field/FormField'

import IndexBroadcasterSelectField from './components/broadcaster-select-field/IndexField'
import DetailBroadcasterSelectField from './components/broadcaster-select-field/DetailField'
import FormBroadcasterSelectField from './components/broadcaster-select-field/FormField'

import IndexBroadcasterBelongstoField from './components/broadcaster-belongsto-field/IndexField'
import DetailBroadcasterBelongstoField from './components/broadcaster-belongsto-field/DetailField'
import FormBroadcasterBelongstoField from './components/broadcaster-belongsto-field/FormField'

import IndexListenerField from './components/listener-field/IndexField'
import DetailListenerField from './components/listener-field/DetailField'
import FormListenerField from './components/listener-field/FormField'

Nova.booting((app, store) => {
    app.component('index-broadcaster-field', IndexBroadcasterField)
    app.component('detail-broadcaster-field', DetailBroadcasterField)
    app.component('form-broadcaster-field', FormBroadcasterField)

    app.component('index-broadcaster-currency-field', IndexBroadcasterCurrencyField)
    app.component('detail-broadcaster-currency-field', DetailBroadcasterCurrencyField)
    app.component('form-broadcaster-currency-field', FormBroadcasterCurrencyField)

    app.component('index-broadcaster-number-field', IndexBroadcasterNumberField)
    app.component('detail-broadcaster-number-field', DetailBroadcasterNumberField)
    app.component('form-broadcaster-number-field', FormBroadcasterNumberField)

    app.component('index-broadcaster-select-field', IndexBroadcasterSelectField)
    app.component('detail-broadcaster-select-field', DetailBroadcasterSelectField)
    app.component('form-broadcaster-select-field', FormBroadcasterSelectField)

    app.component('index-broadcaster-belongsto-field', IndexBroadcasterBelongstoField)
    app.component('detail-broadcaster-belongsto-field', DetailBroadcasterBelongstoField)
    app.component('form-broadcaster-belongsto-field', FormBroadcasterBelongstoField)

    app.component('index-listener-field', IndexListenerField)
    app.component('detail-listener-field', DetailListenerField)
    app.component('form-listener-field', FormListenerField)
})
