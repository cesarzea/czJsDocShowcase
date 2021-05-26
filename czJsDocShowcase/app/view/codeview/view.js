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
 * Created by cesarzea on 21/4/21.
 */
Ext.define('czJsDocShowcase.view.codeview.view', {
    requires: [
        'czJsDocShowcase.view.codeview.codedialog.CodeDialog'
    ],

    alternateClassName: 'codeViewer',

    singleton: true,


    text: null,
    dialog: null,

    init: function () {

    },

    loadText: function(text) {
        this.text = text;
    },

    showCode(source, config, type = 'javascript', title = '') {

        if (this.dialog === null) {
            this.dialog = Ext.create('czJsDocShowcase.view.codeview.codedialog.CodeDialog');
        }

        this.dialog.getController().showFile(source, config, type , title);
    }

})