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

Ext.define('czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',{
    extend: 'Ext.app.ViewController',

    alias: 'czJsDocControllerBase',

    mixins: ['czJsDocShowcase.view.abstractviewcontroller.eventmanager.EventManager']
});