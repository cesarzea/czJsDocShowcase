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
Ext.define('czJsDocShowcase.docViews.defaultdoc.DefaultDocModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.defaultdoc',

    stores: {

    },

    data: {

    },

    formulas: {
        lang: {
            get: function (get) {
                return this.get('i810n.' + sessionStorage.getItem('modName'));
            }
        }
    }


});