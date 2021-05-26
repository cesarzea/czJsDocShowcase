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
 * Created by cesarzea on 5/4/21.
 */
Ext.define('czJsDocShowcase.view.doc.doc', {

    extend: 'Ext.Container',
    xtype: 'doc',

    requires: [
        'Ext.layout.Fit',
        'czJsDocShowcase.view.doc.docController',
        'czJsDocShowcase.view.doc.docModel'
    ],

    viewModel: {
        type: 'doc'
    },

    controller: 'doc',

    padding: 0,
    margin: 0,

    layout: 'fit'
})
