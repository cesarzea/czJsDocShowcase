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
Ext.define('czJsDocShowcase.view.doc.docController', {
    extend: 'czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',
    alias: 'controller.doc',

    view: null,

    lastGroup: 0,
    activeViewer: null,

    subscribe: {
        'onDocNodeSelected': 'onDocNodeSelected'
    },

    init: function (view) {
        this.callParent(arguments);
        this.view = view;
    },

    onDocNodeSelected:  function (el) {

        this.view.setMasked(true);

        let viewer = el.data.data.type + 'Viewer';
        if (el.data.data['displayDocAs'] !== undefined) {
            viewer = el.data.data.displayDocAs;
        }

        if (this.activeViewer !== viewer) {

            //Destroy existing elements.
            this.view.removeAll(true, true);

            this.view.setItems([
                {
                    xtype: viewer,
                    itemId: 'activeDoc',
                    data: el
                }
            ]);

            this.getViewModel().notify();
            this.activeViewer = viewer;
        }

        this.view.down('#activeDoc').getController().loadDoc(el);

        this.view.setMasked(false);

    }


});