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
Ext.define('czJsDocShowcase.docViews.docwithchildren.components.brotherelement.BrotherElement', {
    extend: 'Ext.Container',

    requires: [
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Ext.panel.Header',
        'czJsDocShowcase.docViews.docwithchildren.components.brotherelement.BrotherElementController',
        'czJsDocShowcase.docViews.docwithchildren.components.brotherelement.BrotherElementModel',
        'czJsDocShowcase.view.codeview.view',
    ],


    xtype: 'brotherelement',


    viewModel: 'brotherelement',


    controller: 'brotherelement',

    cls: 'brotherelement',

    border: false,

    items: [
        {
            xtype: 'panel',
            cls: 'brother-doc-title',
            itemId: 'docPanel',

            bind: {
                title: '{jsDocInfo.text}'
            },

            collapsible: {
                animation: false
            },
            titleCollapse: true,
            collapsed: true,

            border: false,

            listeners: {
                collapse: 'onTitleCollapse',
                expand: 'onTitleCollapse'
            },
            header: {
                xtype: 'panelheader',
                layout: 'hbox',
                listeners: {
                    click: function () {
                        //console.log('hola')
                    }
                },
                items: [

                    {
                        xtype: 'container',
                        padding: '10 0 0 0',
                        html: '<div class="link" style="text-decoration: none;color: inherit;">view code</div>',
                        listeners: {
                            element: 'element',
                            delegate: 'div.link',
                            click: function (b) {
                                let c = Ext.Component.from(b);
                                let vm = c.up('brotherelement').getViewModel();
                                codeViewer.showCode(vm.get('jsDocInfo').data.docInfo.file, vm.get('jsDocInfo').data.lineFrom + '-' + vm.get('jsDocInfo').data.lineTo);
                            }

                        }
                    }

                ]

            }
        },
        {
            xtype: 'panel',
            cls: 'brother-doc-subtitle',
            itemId: 'docSubTitlePanel',
            bind: {
                title: '{jsDocInfo.data.description}'
            },

            collapsible: {
                animation: false
            },
            collapsed: true,
            titleCollapse: true,

            layout: {
                type: 'vbox'
            },

            items: [

                {
                    xtype: 'container',
                    cls: 'doc-section',
                    layout: {
                        type: 'vbox'
                    },
                    defaults: {
                        xtype: 'panel',
                        //titleCollapse: true,
                        //collapsible: true
                    },
                    items: [
                        {
                            xtype: 'container',
                            cls: 'clsJsDocDocumentation',
                            width: '100%',
                            bind: {
                                html: '{jsDocInfo.data.description}'
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'documentationPanel',
                            width: '100%',
                            padding: 0,
                            bind: {
                                html: '<div class="clsJsDocDocumentation">{jsDocInfo.data.documentation}</div>'
                            }
                        },
                        {
                            xtype: 'container',
                            cls: 'clsNamespaceSeeAlso',
                            bind: {
                                html: '{jsDocInfo.data.namespaceSeeAlso}'
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'typePanel',
                            width: '100%',
                            cls: 'clsJsDocDefault',
                            padding: '0 0 0 0',
                            layout: 'hbox',
                            items: [
                                {
                                    html: 'Default value:',
                                    padding: '0 20 0 0'
                                },
                                {
                                    flex: 1,
                                    bind: {
                                        html: '{jsDocInfo.data.default}',
                                        padding: '0 20 0 0'
                                    }
                                }
                            ]
                        },
                        {
                            title: 'Example',
                            itemId: 'examplePanel',
                            padding: 20,

                            layout: {
                                type: 'vbox'
                            },
                            bind: {
                               hidden: '{!hasexample}'
                            }

                        }
                    ]
                }
            ]
        }
    ]

});