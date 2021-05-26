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
Ext.define('czJsDocShowcase.view.abstractviewcontroller.eventmanager.EventManager', {
    extend: 'Ext.Mixin',
    requires: ['eventManagerMediator'],

    alternateClassName: 'eventManager',
    alias: 'eventManager',
    xtype: 'eventManager',

    mixinConfig: {
        id: 'eventmanager',
        before: {
            init: 'doInit'
        }
    },


    doInit: function () {

        var me = this;

        if (Ext.isObject(me.subscribe)) {
            Ext.Object.each(me.subscribe, me.addSubscription, me);
        }

    },

    publish: function () {
        return eventManagerMediator.fireEvent.apply(eventManagerMediator, arguments);
    },

    addSubscription: function (name, fn) {

        var me = this;
        if (Ext.isString(fn)) {
            if (Ext.isFunction(me[fn])) {
                fn = me[fn]
            } else {
                //<debug>
                console.warn('Creating Unknown Subscription', fn);
                //</debug>
                fn = me.warnFn;
            }
        }
        if (!Ext.isString(name)) {
            name = name.toString();
        }
        me.addManagedListener(eventManagerMediator, name, fn, me);
    },

    warnFn: function () {
        //<debug>
        console.warn('Unknown Subscription', arguments, this);
        //</debug>
    }

});