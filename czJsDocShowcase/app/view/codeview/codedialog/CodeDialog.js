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
 * Created by cesarzea on 23/4/21.
 */
Ext.define('czJsDocShowcase.view.codeview.codedialog.CodeDialog', {
    extend: 'Ext.Dialog',

    xtype: 'codedialog',

    requires: [
        'Ext.layout.VBox',
        'Ext.panel.Resizer',
        'czJsDocShowcase.view.codeview.codedialog.codeDialogController'
    ],

    controller: 'codedialog',

    defaultFocus: '#sourceCode',

    closeAction: 'onHide' ,

    modal: true,
    maximizable: true,
    centered: true,
    resizable: true,
    padding: 6,
    width: '80%',
    height: '80%',

    layout: 'vbox',

    cls: 'codedialog',

    listeners: {
        show: 'onShow'
    },

    items: [
        {
            xtype: 'container',
            itemId: 'items',
            hidden: true,
            flex: 1,
            layout: 'vbox'
        },
        {
            xtype: 'panel',
            itemId: 'sources',
            flex: 1,
            layout: 'vbox',
            items: [
                {
                    xtype: 'panel',
                    itemId: 'sourceCode',
                    scrollable: {y: true},
                    flex: 1
                }
            ]
        }
    ],
    buttons: {
        ok: {
            text: 'Close',
            handler: 'onHide'
        }
    }
});