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
 * Created by cesarzea on 2/5/21.
 */
Ext.define('czJsDocShowcase.view.main.components.history.HistoryController', {
    extend: 'czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',
    alias: 'controller.history',

    requires: [
        'Ext.data.Store',
        'czJsDocShowcase.model.History',
        'czJsDocShowcase.store.history'
    ],

    subscribe: {
        'onDocNodeSelected': 'onDocNodeSelected'
    },

    view: null,
    lastNodeVisited: null,
    store: null,
    maxItems: 20,
    menu: null,

    init: function () {

        this.callParent(arguments);
        this.view = this.getView();

        this.store = Ext.create('czJsDocShowcase.store.history');
        this.store.load();

        this.menu = Ext.create({
            xtype: 'menu',
            floated: true,
            maxHeight: '100%',
            scrollable: {
                y: true
            },
            responsiveConfig: {
                'width < 515': {
                    width: '100%'
                },
                'width > 515': {
                    width: 500
                }
            }
        });

        this.addClearHistoryMenuItem();

        for (let i = 0; i < this.store.getData().items.length; i++) {

            this.view.down('#historyNodes').insert(0, {
                xtype: 'button',
                text: this.store.getData().items[i].data.name,
                tooltip: this.store.getData().items[i].data.name,
                iconCls: this.store.getData().items[i].data.iconCls,
                nodeId: this.store.getData().items[i].data.nodeId,
                handler: 'onGoToHistoryElement',
                scope: this,
                maxWidth: 200
            })

            this.menu.insert(0, {
                //xtype: 'button',
                text: this.store.getData().items[i].data.name,
                tooltip: this.store.getData().items[i].data.name,
                iconCls: this.store.getData().items[i].data.iconCls,
                nodeId: this.store.getData().items[i].data.nodeId,
                handler: 'onGoToHistoryElement',
                scope: this
            })

        }

        this.view.down('#historyButton').setMenu(this.menu);


    },

    onDocNodeSelected: function (node) {

        if (this.lastNodeVisited !== null) {

           this.removeHistoryItem(this.lastNodeVisited.id, false);


            // Add the new one.
            let iconCls = this.lastNodeVisited.data.data.iconCls !== undefined ? this.lastNodeVisited.data.data.iconCls : this.lastNodeVisited.data.data.defaultIconCls;
            if (iconCls === undefined || iconCls === null) {
                iconCls = czJsDocShowcase.app.mainConfig.defaultNodeIcon;
            }

            this.view.down('#historyNodes').insert(0, {
                xtype: 'button',

                maxWidth: 200,
                text: this.lastNodeVisited.data.text,
                tooltip:this.lastNodeVisited.data.text,

                iconCls: iconCls,
                nodeId: this.lastNodeVisited.id,

                handler: 'onGoToHistoryElement',
                scope: this
            })

            this.menu.insert(0, {
                text: this.lastNodeVisited.data.text,
                tooltip:this.lastNodeVisited.data.text,
                iconCls:  iconCls,
                nodeId: this.lastNodeVisited.id,
                handler: 'onGoToHistoryElement',
                scope: this
            })

        }

        this.lastNodeVisited = node;

        iconCls = this.lastNodeVisited.data.data.iconCls !== undefined ? this.lastNodeVisited.data.data.iconCls : this.lastNodeVisited.data.data.defaultIconCls;
        if (iconCls === undefined || iconCls === null) {
            iconCls = czJsDocShowcase.app.mainConfig.defaultNodeIcon;
        }

        this.removeItemFromStore(this.lastNodeVisited.id);
        this.store.add({
            name: this.lastNodeVisited.data.text,
            nodeId: this.lastNodeVisited.id,
            iconCls: iconCls
        })

        this.store.sync();

    },

    onGoToHistoryElement: function (btn) {

        let id = btn.nodeId;
        this.removeHistoryItem(id);
        this.publish('goToDocNode', id, '');


    },

    onClearHistory: function() {
        this.store.removeAll();
        this.store.sync();

        this.view.down('#historyNodes').removeAll();
        this.menu.removeAll();

        this.addClearHistoryMenuItem();

    },

    addClearHistoryMenuItem: function () {
        this.menu.add({
            text: 'Clear history',
            handler: 'onClearHistory',
            iconCls: 'fas fa-trash-alt',
            dontRemove: true,
            separator: true,
            scope: this
        });
    },

    removeHistoryItem(id, alsoFromStore = false) {

        if (alsoFromStore)
            this.removeItemFromStore(id);

        this.removeHistoryButton(id);
        this.removeHistoryMenuItem(id);

    },

    removeItemFromStore: function (id) {

        let itemToRemove = [];
        let numItems = 0;

        this.store.getData().items.forEach((d, i) => {
            if (d.data.nodeId === id) {
                itemToRemove.push(d);
            } else {
                numItems++;
                if (numItems > this.maxItems)
                    itemToRemove.push(d);
            }
        })
        if (itemToRemove.length > 0) {

            //console.log(itemToRemove);
            this.store.remove(itemToRemove);
        }

        this.store.sync();

    },

    removeHistoryButton(id) {
        let pnlToRemove = [];
        let numItems = 0;
        this.view.down('#historyNodes').getItems().items.forEach(i => {
            if (i.nodeId === id) {
                pnlToRemove.push(i);
            } else {
                numItems++;
                if (numItems > this.maxItems)
                    pnlToRemove.push(i);
            }

        }, this);

        if (pnlToRemove.length > 0)
            this.view.down('#historyNodes').remove(pnlToRemove, true);

    },

    removeHistoryMenuItem(id) {

        let pnlToRemove = [];
        let numItems = 0;
        this.menu.getItems().items.forEach(i => {
            if (i.nodeId === id) {
                pnlToRemove.push(i);
            } else {
                numItems++;
                if (numItems > this.maxItems &&  !i.dontRemove)
                    pnlToRemove.push(i);
            }

        }, this);

        if (pnlToRemove.length > 0)
            this.menu.remove(pnlToRemove, true);

    }

});