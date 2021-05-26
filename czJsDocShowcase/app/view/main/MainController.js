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
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('czJsDocShowcase.view.main.MainController', {
    extend: 'czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',

    alias: 'controller.main',

    requires: [
        'czJsDocShowcase.view.codeview.view'
    ],

    view: null,

    subscribe: {
        onDocNodeSelected: 'onDocNodeSelected',
        setDocsConfig: 'setDocsConfig',
        showMainMenu: 'showMainMenu',
        docLoaded: 'docLoaded'
    },

    doc: null,
    section: null,

    history: [],

    docsConfig: null,

    init: function (view) {

        this.callParent(arguments);
        this.view = view;

        if (this.view.down('#listDocsPanel').getHidden()) {
            this.onMainMenuHide();
            this.view.down('#mainFloatMenu').setHidden(true);
        }

    },

    setDocsConfig: function (docsConfig) {

        this.getViewModel().set("config", docsConfig);

    },

    onDoc: function (doc, section) {

        if (doc === undefined)
            return;

        doc = decodeURI(doc).replaceAll('>', ' > ');
        section = decodeURI(section);

        if (this.doc !== doc || this.section !== section) {
            this.doc = doc;
            this.section = section;

            this.publish('goToDocNode', this.doc, this.section);
        }

    },

    onDocNodeSelected: function (rec) {

        this.redirectTo('doc/' + rec.id.replaceAll(' > ', '>'));

    },

    onHelp: function () {
        codeViewer.showCode('resources/license.md', {dialogConfig: {maxWidth: 900, maxized: false, centered: true}}, 'markdown', 'About czJsDocShowcase');
    },

    showMainMenu: function (tool) {

        let mm = this.getView().down('#mainFloatMenu');

        mm.setHidden(false);
        mm.expand();

    },

    onMainFloatMenuCollapsed: function (cmp) {

        cmp.setHidden(true);

    },

    onMainMenuHide: function(cmd) {

        let ld = this.view.down('listDocs');
        let ldPnl = this.view.down('#listDocsPanel');

        ldPnl.remove(ld, false);

        this.view.down('#mainFloatMenu').add(ld);

    },

    onMainMenuShow: function(cmd) {

        let ld = this.view.down('listDocs');
        let ldPnl = this.view.down('#mainFloatMenu');

        ldPnl.remove(ld, false);

        this.view.down('#listDocsPanel').add(ld);
        this.view.down('#listDocsPanel').expand(false);

    },

    docLoaded: function (el) {

        if (this.view.down('#listDocsPanel').getHidden()) {
            this.view.down('#mainFloatMenu').setHidden(true);
        }

    }

});