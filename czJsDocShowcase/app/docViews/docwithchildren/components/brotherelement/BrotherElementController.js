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
Ext.define('czJsDocShowcase.docViews.docwithchildren.components.brotherelement.BrotherElementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.brotherelement',

    view: null,

    init: function () {
        this.callParent(arguments);

        let data = this.view.config.data.data;

        this.view = this.getView();

        this.getViewModel().set('jsDocInfo', data);

        this.view.down('#docPanel').setIconCls(data.iconCls !== undefined  ? data.iconCls : data.defaultIconCls);


        if (data.data['example'] !== undefined) {

            if (Ext.ClassManager.getNameByAlias('widget.' + data.data['example']) === '') {
                console.error('Alias or xtype ' + data.data['example'] + ' not exists.')
            } else {

                this.view.down('#examplePanel').setItems([{
                    xtype: data.data['example']
                }])
                this.getViewModel().set('hasexample', true);
            }
        }
        this.getViewModel().notify();

    },

    onTitleCollapse: function (pnl, eOpts) {
        let p = this.view.down('#docSubTitlePanel');
        p.setCollapsed(!p.getCollapsed());
    }

});