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
Ext.define('czJsDocShowcase.view.main.components.listDocs.listDocs', {
    extend: 'Ext.Container',

    xtype: 'listDocs',

    controller: 'listdocs',
    viewModel: 'listdocs',

    requires: [
        'Ext.grid.column.Tree',
        'Ext.layout.VBox',
        'Ext.list.Tree',
        'czJsDocShowcase.view.main.components.listDocs.listDocsController',
        'czJsDocShowcase.view.main.components.listDocs.listDocsModel'
    ],

    layout: 'vbox',

    items: [
        {
            xtype: 'treelist',
            itemId: 'docsTreeList',

            flex: 1,
            scrollable: {y: true},
            striped: false,
            listeners: {
                selectionchange: 'onSelectionChange'
            },
            hideHeaders: true,
            columns: [
                {
                    xtype: 'treecolumn',
                    dataIndex: 'text',
                    width: '100%'
                }
            ]
        }
    ]
})