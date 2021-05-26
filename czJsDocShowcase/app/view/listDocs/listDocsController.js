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
 * Created by cesarzea on 6/4/21.
 */
Ext.define('czJsDocShowcase.view.main.components.listDocs.listDocsController', {
    extend: 'czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',
    alias: 'controller.listdocs',

    requires: [
        'Ext.data.TreeStore',
        'czJsDocShowcase.docProcessors.markdownReader.markdownReader'
    ],

    subscribe: {
        goToDocNode: 'goToDocNode',
        loadDocFile: 'loadDocFile',
        endLoadDocs: 'endLoadDocsReceived'
    },

    view: null,
    grid: null,
    store: null,
    panelTarget: null,

    apiSelected: null,
    sectionSelected: null,

    docsToLoad: [],
    ordersToLoadDocsEnded: false,


    init: function (view) {

        this.callParent(arguments);

        this.view = view;
        this.grid = this.view.down('grid');
        this.panelTarget = this.view.up('#centerPanel').down('#docPanel');

        this.store = Ext.create('Ext.data.TreeStore', {
            rootVisible: false,
            root: {
                text: 'Root',
                id: 'data',
                expanded: true
            }
        });

        this.getViewModel().set('store', Ext.create('Ext.data.TreeStore', {
                rootVisible: false,
                root: {
                    text: 'Root',
                    id: 'data',
                    expanded: true
                }
            })
        )

    },

    loadDocFile: function (docInfo) {

        this.docsToLoad.push(false);
        let pos = this.docsToLoad.length;

        let reader = Ext.create(docInfo.type + 'Reader');
        reader.read(pos, docInfo.file, docInfo, this.setJsDocData, this);

    },

    setJsDocData: function (numDoc, data, docInfo) {

        // First the docInfo node.

        this.setExpandedConfig(true);

        let path = docInfo.name;

        if (docInfo.memberOf !== undefined && docInfo.memberOf.trim() !== '') {
            path = docInfo.memberOf.trim() + ' > ' + docInfo.name.trim();
        }

        path = path.split('>');
        path.forEach((p, i) => path[i] = p.trim());

        this.addNodeToTreeStore(docInfo, this.store, path, docInfo, 0);

        // Add their nodes.

        data.forEach(d => {

            let name = d.name;

            if (d.memberOf !== undefined) {
                path = d.memberOf + ' > ' + d.name;
            } else {
                path = d.name;
            }


            d.docInfo = docInfo;

            path = path.split('>');
            path.forEach((p, i) => path[i] = p.trim());

            this.addNodeToTreeStore(docInfo, this.store, path, d, 0);

        }, this);

        this.docsToLoad[numDoc-1] = true;
        if (this.docsToLoad.find(e => !e) === undefined && this.ordersToLoadDocsEnded)
            this.endLoadDocs();

    },

    setExpandedConfig: function (expanded) {

        this.store.getData().items.forEach(c => {
            if (expanded)
                c.expand();
            else
                if (c.data.data.expanded !== undefined && ! c.data.data.expanded) {
                    c.collapse();
                }
        })

    },

    endLoadDocsReceived: function() {
        this.ordersToLoadDocsEnded = true;
        if (this.docsToLoad.find(e => !e) === undefined)
            this.endLoadDocs();
    },

    endLoadDocs: function () {

        this.view.down('#docsTreeList').setStore(null);


        this.store.sort('docNum', 'ASC');

        this.store.getRoot().expand(true);

        this.setExpandedConfig(false);

        this.view.down('#docsTreeList').setStore(this.store);

        if (this.apiSelected !== null)
            this.goToDocNode(this.apiSelected, this.sectionSelected);


    },

    addNodeToTreeStore: function (docInfo, store, path, data, pos = 0, strPath = '') {


        let iconCls = data.iconCls;
        if (iconCls === undefined) {
            iconCls = data.defaultIconCls;
        }

        if (iconCls === undefined || iconCls === null) {
            iconCls = czJsDocShowcase.app.mainConfig.defaultNodeIcon;
        }
        data.iconCls = iconCls;

        // If the path has been created.
        if ((pos + 1) >= path.length) {

            let r = store.find('id', strPath);

            if (r >= 0) {

                //console.log("Agrego FINAL " + strPath + ' > ' + path[pos].trim());

                this.store.getAt(r).appendChild({
                    text: path[path.length - 1],
                    id: strPath.trim() + ' > ' + path[pos].trim(),
                    expanded: true, // data.expanded,
                    data: data,
                    iconCls: iconCls,
                    docNum: docInfo.docNum,
                    children: []
                });

            } else {

                if (pos === 0) {

                    //console.log("Agrego FINAL " + strPath + ' > ' + path[pos].trim());

                    this.store.getRoot().appendChild({
                        text: path[path.length - 1],
                        id: path[pos].trim(),
                        expanded: true,
                        data: data,
                        iconCls: iconCls,
                        docNum: docInfo.docNum,
                        children: []
                    });

                } else {
                    //   debugger;
                }
            }

        } else {


            // Add the path node.
            let pathToAdd = strPath !== '' ? strPath + ' > ' + path[pos].trim() : path[pos].trim();

            //console.log("Busco :" + pathToAdd + ":")


            let r = store.find('id', pathToAdd);

            if (r < 0) {

                //console.log("Agrego :" +  strPath.trim() + ' > ' + path[pos].trim() + ":")

                if (strPath.trim() !== '') {

                    r = store.find('id', strPath.trim());
                    //console.log("Agrego " + strPath)
                    store.getAt(r).appendChild({
                        text: path[pos].trim(),
                        id: strPath.trim() + ' > ' + path[pos].trim(),
                        data: null,
                        expanded: true,
                        docNum: docInfo.docNum,
                        children: []
                    });

                    //console.log("Agregado :" +  strPath.trim() + ' > ' + path[pos].trim() + ":")

                } else {

                    store.getRoot().appendChild({
                        text: path[pos].trim(),
                        id: pathToAdd,
                        data: null,
                        expanded: true,
                        docNum: docInfo.docNum,
                        children: []
                    });

                }

            } else {
                //console.log("Ya existe el :" + pathToAdd)
            }

            this.addNodeToTreeStore(docInfo, store, path, data, pos + 1, pathToAdd);
        }

    },

    onSelectionChange: function (grid, selected, eOpts) {

        if (selected === null)
            return;

        let rec = selected;

        rec.expand();

        if (rec.data.data['noContent'] !== undefined && rec.data.data.noContent) {
            if (rec.getChildAt(0) !== undefined)
                grid.setSelection(rec.getChildAt(0));
        } else {

            let viewer = rec.data.data.type + 'Viewer';

            if (rec.data.data['displayDocAs'] !== undefined) {
                viewer = rec.data.data.displayDocAs;
            }

            if (Ext.ClassManager.getNameByAlias('widget.' + viewer) === '') {
                if (rec.getChildAt(0) !== undefined)
                    grid.setSelection(rec.getChildAt(0));

            } else
                this.publish('onDocNodeSelected', rec);
        }
    },

    goToDocNode: function (api, section) {

        if (this.store !== null) {

            let rec = this.findIdInTreeStore(this.store, api);
            //let rec = this.store.findRecord('id', api);
            if (rec === null) {
                for (let i = 0, len = this.store.count(); i < len; i++) {
                    if (this.store.getAt(i).data.text.trim() === api.trim()) {
                        rec = this.store.getAt(i);
                    }
                }
            }

            let tr = this.getView().down('treelist');

            if (tr.getStore() === null) {

                this.apiSelected = api;
                this.sectionSelected = section;

            } else if (rec !== null) {

                if (tr.getSelection() !== null && tr.getSelection().data.id !== rec.data.id) {

                    tr.setSelection(null);
                    tr.setSelection(rec);

                } else {

                    tr.setSelection(rec);

                }

            }

        } else {

            this.apiSelected = api;
            this.sectionSelected = section;

        }

    },

    findIdInTreeStore(store, id, node = null) {

        if (node === null) {
            node = store.getRootNode();
        }

        for(let i = 0; i < node.childNodes.length; i++) {

            let n = node.childNodes[i];
            if (n.id === id)
                return n;

            let ret = this.findIdInTreeStore(store, id, n);
            if (ret !== null)
                return ret;

        }

        return null;

    }


})


//# sourceURL=listDocsController.js