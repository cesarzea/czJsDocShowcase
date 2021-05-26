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
Ext.define('czJsDocShowcase.docViews.defaultdoc.DefaultDoc', {
    extend: 'Ext.Container',

    requires: [
        'Ext.field.Display',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'czJsDocShowcase.docViews.defaultdoc.DefaultDocController',
        'czJsDocShowcase.docViews.defaultdoc.DefaultDocModel',
        'czJsDocShowcase.view.codeview.view',
    ],

    xtype: 'defaultdoc',
    alias: 'defaultdocViewer',


    viewModel: {
        type: 'defaultdoc'
    },

    controller: 'defaultdoc',

    padding: 0,
    margin: 0,

    layout: 'vbox',

    cls: 'defaultdoc',

    items: [
        {
            xtype: 'panel',
            cls: 'main-doc-title',
            itemId: 'docPanel',

            bind: {
                title: '{title}'
            },
            border: false,

            layout: 'vbox',
            flex: 1,

            items: [
                {
                    xtype: 'panel',
                    cls: 'subtitle-tags',
                    padding: 5,
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
                            padding: 5,
                            layout: {
                                type:'vbox',
                                align: 'center',
                                pack: 'center'
                            },

                            items: [
                                {
                                    xtype: 'container',
                                    html: '<div class="link" style="text-decoration: none;color: inherit;">view code</div>',
                                    listeners: {
                                        element: 'element',
                                        delegate: 'div.link',
                                        click: function (b) {
                                            let c = Ext.Component.from(b);
                                            let vm = c.up('defaultdoc').getViewModel();
                                            codeViewer.showCode(vm.get('jsDocInfo').data.docInfo.file, vm.get('jsDocInfo').data.lineFrom + '-' + vm.get('jsDocInfo').data.lineTo);
                                        }

                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    scrollable: 'y',
                    flex: 1,
                    layout: {
                        type: 'vbox'
                    },
                    defaults: {
                        xtype: 'panel',
                        cls: 'doc-section',
                        titleCollapse: true,
                        collapsible: true
                    },
                    items: [
                        {
                            xtype: 'container',
                            title: 'Documentation',
                            itemId: 'documentationPanel',
                            padding: 0,
                            bind: {
                                html: '<div class="clsJsDocDocumentation">{documentation}</div>',
                                hidden: '{!hasdocumentation}'
                            }
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