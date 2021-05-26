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
Ext.define('czJsDocShowcase.docViews.markdownfileviewer.MarkdownFileViewer', {
    extend: 'Ext.Container',

    alias: 'markdownViewer',

    requires: [
        'Ext.layout.HBox',
        'czJsDocShowcase.docViews.markdownfileviewer.MarkdownFileViewerController',
        'czJsDocShowcase.docViews.markdownfileviewer.MarkdownFileViewerModel'
    ],

    xtype: 'markdownViewer',

    viewModel: {
        type: 'markdownfileviewer'
    },

    controller: 'markdownfileviewer',

    cls: 'markDownFileViewer',

    layout: 'hbox',
    items: [
        {
            xtype: 'panel',
            itemId: 'docContent',

            padding: 0,
            cls: 'main-doc-title',

            scrollable: {
                y: true
            },

            flex: 1,

            userSelectable: 'text',
            bind: {
                title: '{docInfo.name}',
                html: '{html}',
                iconCls: '{docInfo.iconCls}'
            }
        }
    ]
});