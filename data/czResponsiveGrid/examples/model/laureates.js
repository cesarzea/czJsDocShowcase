/*
 * czResponsiveGrid. V1.0b
 *
 * Author & Copyright (c) 2021. César Pedro Zea Gómez <cesarzea@jaunesistemas.com>
 * Contact to request your "free" license, any question or request or to hire me as a freelancer (freelance from 1999)
 *
 * More information at : https://www.cesarzea.com
 * Documentation       : https://www.cesarzea.com/czResponsiveGrid
 * GitHub repo         : https://github.com/cesarzea/czResponsiveGrid
 *
 * Please, use the issues section of the Git repository to report bugs or request improvements.
 *
 */

Ext.define('examples.model.laureates', {
    extend: 'Ext.data.Model',


    fields: [{
        name: 'born',
        type: 'date',
        dateReadFormat: 'Y-m-d'
    }, {
        name: 'died',
        type: 'date',
        dateReadFormat: 'Y-m-d'
    }]

});