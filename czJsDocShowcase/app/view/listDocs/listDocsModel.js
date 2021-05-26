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
 * Created by cesarzea on 20/4/21.
 */
Ext.define('czJsDocShowcase.view.main.components.listDocs.listDocsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.listdocs',

    data: {
        store: null
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});