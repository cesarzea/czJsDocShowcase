/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'czJsDocShowcase.Application',

    name: 'czJsDocShowcase',

    requires: [
        // This will automatically load all classes in the czJsDocShowcase namespace
        // so that application classes do not need to require each other.
        'czJsDocShowcase.*',
        'Ext.grid.Grid',
        'Ext.panel.Collapser'
    ],

    // The name of the initial view to create.
    //mainView: 'czJsDocShowcase.view.main.Main'
});
