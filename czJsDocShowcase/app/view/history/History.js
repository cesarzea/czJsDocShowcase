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
 * Created by cesarzea on 2/5/21.
 */
Ext.define('czJsDocShowcase.view.main.components.history.History', {
    extend: 'Ext.Container',

    xtype: 'history',

    requires: [
        'Ext.layout.HBox',
        'czJsDocShowcase.view.main.components.history.HistoryController',
        'czJsDocShowcase.view.main.components.history.HistoryModel',

        'Ext.scroll.Scroller',
        'Ext.layout.overflow.Scroller'
    ],


    viewModel: {
        type: 'history'
    },

    controller: 'history',

    layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'

    },

    border :false,
    items: [
        {
            xtype: 'label',
            padding: '8 10 8 10',
            html: 'History:',
        },
        {
            xtype: 'panel',
            itemId: 'historyNodes',
            cls: 'historyNodes',
            layout: {
                type: 'hbox',
                overflow: 'scroller'
            },
            border: false,
            flex: 1
        },
        {
            xtype: 'button',
            itemId: 'historyButton',
            //padding: 8,
            html: '<i class="fas fa-history"></i>',
        }
    ]
});