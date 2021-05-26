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
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('czJsDocShowcase.view.main.Main', {

    xtype: 'app-main',

    extend: 'Ext.Panel',


    requires: [
        'Ext.layout.Fit',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Ext.Label',
        'czJsDocShowcase.*',
        'czJsDocShowcase.view.main.MainController'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: 'vbox',

    border: false,

    items: [
        {
            xtype: 'panel',
            itemId: 'historyPanel',
            cls: 'main-page-title',
            bind: {
                title: '{config.topBarTitle}'
            },
            border: false,
            tools: [
                {
                    itemId: 'mainMenuTool',
                    docked: 'left',
                    padding: '0 20 0 20',
                    style: 'border-right: #827d7d 1px solid;',
                    iconCls: 'fas fa-bars',
                    handler: 'showMainMenu',

                    responsiveConfig: {
                        'width < 1199': {
                            hidden: false
                        },
                        'width > 1199': {
                            hidden: true
                        }
                    },

                },
                {
                    itemId: 'aboutTool',
                    padding: '0 20 0 20',
                    iconCls: 'far fa-question-circle',
                    tooltip: 'About',
                    handler: 'onHelp'
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    cls: 'list-examples',
                    bind: {
                        title: '{config.treeBarTitle}',
                        width: '{config.treeBarWidth}'
                    },

                    itemId: 'mainFloatMenu',

                    floated: true,
                    height: '100%',
                    hidden: false,
                    titleCollapse: true,
                    layout: 'fit',

                    responsiveConfig: {
                        'width > 1199': {
                            hidden: true
                        }
                    },

                    collapsible: {
                        direction: 'left',
                        animation: false
                    },

                    listeners: {
                        collapse: 'onMainFloatMenuCollapsed'
                    }
                },
                {
                    xtype: 'history'
                }
            ]
        },
        {
            xtype: 'panel',
            itemId: 'centerPanel',
            flex: 1,
            layout: 'hbox',
            border: false,


            items: [
                {
                    xtype: 'panel',
                    itemId: 'listDocsPanel',
                    cls: 'list-examples',

                    bind: {
                        title: '{config.treeBarTitle}',
                        width: '{config.treeBarWidth}'
                    },

                    titleCollapse: true,

                    responsiveConfig: {

                        'width < 1199': {
                            hidden: true
                        },

                        'width > 1199': {
                            hidden: false
                        }

                    },

                    listeners: {
                        hide: 'onMainMenuHide',
                        show: 'onMainMenuShow'
                    },

                    collapsible: {
                        direction: 'left',
                        animation: false
                    },
                    border: true,

                    resizable: {
                        dynamic: false,
                        edges: 'e'
                    },


                    layout: 'fit',
                    items: [{
                        xtype: 'listDocs',
                        flex: 1
                    }]
                },
                {
                    xtype: 'doc',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
            cls: 'bottom-bar',
            height: 25,
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                html: '<a style="text-decoration: none; color: white;" href="https://www.cesarzea.com" target="_blank">© César Pedro Zea Gómez</a>'
            },
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'container',
                    html: '<a style="text-decoration: none; color: white;" href="javascript:codeViewer.showCode(\'resources/license.md\', {dialogConfig:{maxWidth: 900, maxized: false, centered: true}}, \'markdown\', \'About czJsDocShowcase\');">About czJsDocShowcase V1.0b</a>'
                }]


        },
    ]

})