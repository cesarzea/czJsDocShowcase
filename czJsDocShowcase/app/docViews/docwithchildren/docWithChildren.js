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
Ext.define('czJsDocShowcase.docViews.docwithchildren.docWithChildren', {
    extend: 'Ext.Panel',

    xtype: 'docWithChildren',
    alias:'docWithChildrenViewer',

    requires: [
        'Ext.field.Display',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'czJsDocShowcase.docViews.docwithchildren.docWithChildrenController',
        'czJsDocShowcase.docViews.docwithchildren.docWithChildrenModel',
        'czJsDocShowcase.view.codeview.view'
    ],


    viewModel: 'docwithchildren',


    //cls: 'main-doc-title',
    itemId: 'docPanel',

    controller: 'docwithchildren',

    layout: 'vbox',

    bodyCls: 'docWithChildren',

    items: [
        {
            xtype: 'panel',
            cls: 'main-doc-title',
            itemId: 'docPanel',

            bind: {
                title: '{jsDocInfo.text}',
                iconCls: '{jsDocInfo.data.iconCls || jsDocInfo.data.defaultIconCls}'
            },
            tools: [
                {
                    itemId: 'expandAllTool',
                    iconCls: 'fa fa-plus',
                    tooltip: 'Expand all',
                    handler: 'onExpandAll',
                    action: 'expand'
                }
            ],

            border: false,

            layout: 'vbox',
            flex: 1,

            items: [
                {
                    xtype: 'panel',
                    cls: 'subtitle-tags',
                    padding: '5px 0 0 0',
                    layout: {
                        type: 'hbox',
                        pack: 'strech'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            encodeHtml: false,
                            flex: 1,
                            bind: {
                                value: '<div class="clsJsDocDescription">{jsDocInfo.data.description}</div>'
                            }
                        },
                        {
                            xtype: 'container',
                            //padding: 5,
                            layout: {
                                type: 'vbox',
                                align: 'center',
                                pack: 'center'
                            },

                            items: [
                                {
                                    xtype: 'container',
                                    padding: '0 20px 0 20px',
                                    html: '<div class="link" style="text-decoration: none;color: inherit; cursor: pointer !important;">view code</div>',
                                    listeners: {
                                        element: 'element',
                                        delegate: 'div.link',
                                        click: function (b) {
                                            let c = Ext.Component.from(b);
                                            let vm = c.up('docWithChildren').getViewModel();

                                            codeViewer.showCode(vm.get('jsDocInfo').data.data.docInfo.file, vm.get('jsDocInfo').data.data.lineFrom + '-' + vm.get('jsDocInfo').data.data.lineTo);
                                        }

                                    }
                                }
                            ]
                        }
                    ]
                },


                {
                    xtype: 'panel',
                    itemId: 'docContent',
                    cls: 'docContent',
                    scrollable: 'y',
                    flex: 1,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'panel',
                                cls: 'doc-section',
                                //titleCollapse: true,
                                //collapsible: true
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'documentationPanel',
                                    padding: 0,
                                    bind: {
                                        html: '<div class="clsJsDocDocumentation">{jsDocInfo.data.documentation}</div>'
                                    }
                                },
                                {
                                    title: 'Example',
                                    itemId: 'examplePanel',
                                    padding: 20,

                                    bind: {
                                        hidden: '{!hasexample}'
                                    }

                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            itemId: 'listElements',
                            cls: 'listElements'
                        }
                    ]
                }

            ]
        }
    ]

});