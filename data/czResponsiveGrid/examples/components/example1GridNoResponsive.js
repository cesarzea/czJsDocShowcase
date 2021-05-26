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

Ext.define('examples.components.example1GridNoResponsive', {

    extend: 'Ext.grid.Grid',
    xtype: 'examples.example1GridNoResponsive',

    requires: [
        'Ext.layout.Fit',
        'examples.store.laureates'
    ],

    layout: 'fit',
    panel: true,

    title: 'No czResponsiveGrid Grid',

    variableHeights: true,
    columnLines: true,

    store: {
        type: 'examples.laureates'
    },


    columns: [
        //Name
        {
            text: 'First Name',
            dataIndex: 'firstname',
            flex: 1,
            minWidth: "10em"
        }, {
            text: 'Surname',
            dataIndex: 'surname',
            flex: 1,
            minWidth: "10em"
        },
        //Born

        {
            xtype: 'datecolumn',
            text: "Born",
            dataIndex: "born",
            align: 'center',
            width: '7.5em',
            czresponsive: {
                value: '{born:date("m-d-Y")}'
            }
        },
        {
            text: 'Country',
            dataIndex: 'bornCountry',
            flex: 1,
            minWidth: '13em'
        },
        {
            text: 'Country<br/>Code',
            width: '7em',
            align: 'center',
            dataIndex: "bornCountryCode",
            czresponsive: {
                label: 'C. Code'
            }
        },
        {
            text: 'City',
            dataIndex: "bornCity",
            flex: 1,
            minWidth: '13em'
        },

        {
            xtype: 'datecolumn',
            text: 'Died',
            dataIndex: "died",
            align: 'center',
            width: '7.5em',
            czresponsive: {
                value: '{born:date("m-d-Y")}'
            }
        }, {
            text: ' Country',
            dataIndex: "diedCountry",
            flex: 1,
            minWidth: '13em'
        }, {
            text: 'Country<br/>Code',
            dataIndex: "diedCountryCode",
            width: '7em',
            align: 'center',
            czresponsive: {
                label: 'C. Code'
            }

        }, {
            text: 'City',
            dataIndex: "diedCity",
            flex: 1,
            minWidth: '13em'
        },

        //Others
        {
            text: 'Gender',
            dataIndex: "gender",
            width: '7em',
            align: 'center'
        }
    ]

})