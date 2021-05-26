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
Ext.define('examples.splitsexample.SplitsExample', {

    extend: 'Ext.Container',
    xtype: 'examples.splitsExample',

    requires: [
        'Ext.field.Display',
        'Ext.layout.Box',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'examples.Example1',
        'examples.splitsexample.SplitsExampleModel',
        'examples.splitsexampleSplitsExampleController'
    ],

    viewModel: {
        type: 'examples.splitsexample'
    },

    controller: 'examples.splitsexample',

    padding: 0,
    margin: '20 0 0 0',

    layout: {
        type: 'vbox'
    },

    items: [
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'container',
                    itemId: 'codeContainer',
                    layout: {
                        type: 'vbox'
                    },
                    flex: 1,

                    border: true,
                    style: 'border: 1px solid #025b80;',
                    scrollable: {y: true},
                    defaults: {
                        margin: 0,
                        padding: 0,
                        bodyPadding: 0,
                        xtype: 'container',
                        width: 800
                    },
                    items: [
                        {
                            html:
                                '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "{\n" +
                                "   xtype: 'grid',\n" +
                                "   ...\n" +
                                "   plugins: {\n" +
                                "      czresponsivegrid: {\n" +
                                "        splits: [ \n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split1',
                            html:
                                '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 0\n" +
                                "           ['born'],\n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split2',
                            html:
                                '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 1\n" +
                                "           ['born', 'died'],\n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split3',
                            html:
                                '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 2\n" +
                                "           ['born', 'bornCountry', '|', 'died', 'diedCountry'],\n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split4',
                            html:
                                '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 3\n" +
                                "           [\n" +
                                "              ['born', 'bornCountry', 'bornCountryCode'],\n" +
                                "              '-',\n" +
                                "              ['died', 'diedCountry', 'diedCountryCode']\n" +
                                "           ],\n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split5',
                            html: '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 4\n" +
                                "           [\n" +
                                "              ['born', 'bornCountry'],\n" +
                                "              ['bornCountryCode', 'bornCity'],\n" +
                                "              '-',\n" +
                                "              ['died', 'diedCountry'],\n" +
                                "              ['diedCountryCode', 'diedCity']\n" +
                                "           ],\n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split6',
                            html: '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 5\n" +
                                "           [\n" +
                                "               ['born', 'bornCountryCode'],\n" +
                                "               ['bornCountry'],\n" +
                                "               ['bornCity'],\n" +
                                "               '-',\n" +
                                "               ['died', 'diedCountryCode'],\n" +
                                "               ['diedCountry'],\n" +
                                "               ['diedCity']\n" +
                                "           ],\n" +
                                "</code></pre>"
                        },

                        {
                            itemId: 'split7',
                            html: '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 6\n" +
                                "           [\n" +
                                "               ['born'],\n" +
                                "               ['bornCountryCode'],\n" +
                                "               ['bornCountry'],\n" +
                                "               ['bornCity'],\n" +
                                "               '-',\n" +
                                "               ['died'],\n" +
                                "               ['diedCountryCode'],\n" +
                                "               ['diedCountry'],\n" +
                                "               ['diedCity']\n" +
                                "           ],\n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split8',
                            html: '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 7\n" +
                                "           [\n" +
                                "               ['gender'],\n" +
                                "               '-',\n" +
                                "               ['born'],\n" +
                                "               ['bornCountryCode'],\n" +
                                "               ['bornCountry'],\n" +
                                "               ['bornCity'],\n" +
                                "               '-',\n" +
                                "               ['died'],\n" +
                                "               ['diedCountryCode'],\n" +
                                "               ['diedCountry'],\n" +
                                "               ['diedCity']\n" +
                                "           ],\n" +
                                "</code></pre>"
                        },
                        {
                            itemId: 'split9',
                            html: '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "           // Possible split 8\n" +
                                "           [\n" +
                                "               ['firstname'],\n" +
                                "               '-',\n" +
                                "               ['gender'],\n" +
                                "               '-',\n" +
                                "               ['born'],\n" +
                                "               ['bornCountryCode'],\n" +
                                "               ['bornCountry'],\n" +
                                "               ['bornCity'],\n" +
                                "               '-',\n" +
                                "               ['died'],\n" +
                                "               ['diedCountryCode'],\n" +
                                "               ['diedCountry'],\n" +
                                "               ['diedCity']\n" +
                                "           ]\n" +
                                "</code></pre>"
                        },
                        {
                            html: '<pre style="margin-bottom: 0px; margin-top: 0px;"><code id="fmtcode" class="language-javascript">' +
                                "        ],\n" +
                                "    }\n" +
                                "}\n" +
                                "</code></pre>"
                        }
                    ]
                },
            ]
        },
        {
            xtype: 'container',
            height: 40,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'displayfield',
                    itemId: 'spGridWidth',
                    html: '.'
                }
            ]
        },

        {
            xtype: 'examples.example1',
            //height: 500,
            flex: 1,
            listeners: {
                czGridResize: 'onGridResize'
            }
        }


    ]


})
