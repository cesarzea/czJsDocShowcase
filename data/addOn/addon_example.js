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
Ext.define('myAddOn', {

    extend: 'Ext.mixin.Observable',
    mixins: ['eventManager'],

    requires: [
        'czJsDocShowcase.view.abstractviewcontroller.eventmanager.EventManagerMediator'
    ],

    subscribe: {
        'onDocNodeSelected': 'onDocNodeSelected',
        'goToDocNode': 'goToDocNode',
        'loadDocFile': 'loadDocFile',
        'endLoadDocs': 'endLoadDocs'
    },

    constructor: function () {

        this.callParent(arguments);
        this.doInit();

        /**
         * Uncomment that code to observe all czJsDocShowcase events.
         */
        /*
        Ext.mixin.Observable.capture(eventManagerMediator, function() {
            console.group("Event", arguments[0], ' received');
            console.log("Arguments", arguments[1]);
            console.groupEnd();
        });
        */
    },

    onDocNodeSelected: function(record) {
        console.log('onDocNodeSelected event reveived.', record);
    },

    goToDocNode: function(itemId, section) {
        console.log('goToDocNode event reveived.', itemId, section);
    },

    loadDocFile: function(docInfo) {
        console.log('loadDocFile event reveived.', docInfo);
    },

    endLoadDocs: function() {
        console.log('endLoadDocs event reveived.');
    }

});

var addon = new myAddOn();


