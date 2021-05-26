/*
 * czJsDocShowcase. V1.0b
 *
 * Author & Copyright (c) 2021. César Pedro Zea Gómez <cesarzea@jaunesistemas.com>
 * Contact to request your "free" license, any question or request or to hire me as a freelancer (freelance from 1999)
 *
 * More information at : https://www.cesarzea.com
 * Documentation       : https://www.cesarzea.com/czJsDocShowcase
 * GitHub repo         : https://github.com/cesarzea/czJsDocShowcase
 *
 * Please, use the issues section of the Git repository to report bugs or request improvements.
 *
 */

/**
 * Created by cesarzea on 5/5/21.
 */
Ext.define('czJsDocShowcase.store.history', {
    extend: 'Ext.data.Store',

    alias: 'store.history',
    storeId: 'history',

    requires: [
        'Ext.data.proxy.LocalStorage',
        'czJsDocShowcase.model.History'
    ],

    model: 'czJsDocShowcase.model.History',

    proxy: {
        type: 'localstorage',
        id: 'nodeId'
    }

});