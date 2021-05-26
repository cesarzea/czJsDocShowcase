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
Ext.override(czJsDocShowcase.docViews.markdownfileviewer.MarkdownFileViewerController, {

    init: function(view) {
        this.callParent(arguments);
        this.view = view;

        this.view.down('#docContent').setTools([
            {
                itemId: 'expandAllTool',
                //iconCls: 'fa fa-plus',
                html: '<div style="color: white;text-align: center;">View<br/>Markdown</div>',
                tooltip: 'Added by an AddOn',
                handler: 'onViewMarkDown'
            }
        ])
    },

    onViewMarkDown: function() {
        codeViewer.showCode(
            this.file,
            {},
            'markup',
            this.file + '<br/>(the button that shows that markdown content has been added by an optional AddOn)'
        );
    }

})