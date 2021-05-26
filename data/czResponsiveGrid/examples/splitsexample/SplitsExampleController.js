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

/**
 * Created by cesarzea on 5/4/21.
 */
Ext.define('examples.splitsexampleSplitsExampleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.examples.splitsexample',

    view: null,

    lastGroup: 0,

    init: function (view) {
        this.view = view;

        view.on('painted', this.onInitialize, this);
        this.callParent(arguments);

    },

    onInitialize: function (element, eOpts) {

        this.view.bodyElement.dom.querySelectorAll('.language-javascript').forEach(e => Prism.highlightElement(e, false));

    },


    onMainGridResponsiveResize: function (grid, plugIn) {


        this.view.down('#codeContainer').getItems().items.forEach(i => i.setMasked(false))

        let activeGroupCodeCmp = this.view.down('#split' + (plugIn.activeSplit + 1));
        activeGroupCodeCmp.setMasked(true);

        let codeContainer = this.view.down("#codeExampleSplits");

        let top =
            (codeContainer.getScrollable().getPosition().y + Ext.get(activeGroupCodeCmp.getId()).getY()) -
            Ext.get(codeContainer.getId()).getY() -
            (Ext.get(codeContainer.getId()).getSize().height / 2) +
            (Ext.get(activeGroupCodeCmp.getId()).getSize().height / 2);

        top = Math.max(0, top);

        codeContainer.getScrollable().scrollTo(null, top, true);


    },



    onGridResize: function(grid, plugIn) {

        this.view.down('#codeContainer').getItems().items.forEach(i => i.setMasked(false))

        let width = grid.getSize().width;
        let innerWidth = grid.getInnerWidth();

        let sizes = plugIn.splitsWidthsCache;

        if (sizes === null)
            return;

        this.lastGroup = plugIn.activeSplit + 1;

        if (this.lastGroup > sizes.length - 1) {
            this.lastGroup = 0;
        }

        let activeGroupCodeCmp = this.view.down('#split' + (plugIn.activeSplit + 1));
        activeGroupCodeCmp.setMasked(true);

        let codeContainer = this.view.down("#codeContainer");

        let top =
            (codeContainer.getScrollable().getPosition().y + Ext.get(activeGroupCodeCmp.getId()).getY()) -
            Ext.get(codeContainer.getId()).getY() -
            (Ext.get(codeContainer.getId()).getSize().height / 2) +
            (Ext.get(activeGroupCodeCmp.getId()).getSize().height / 2);

        top = Math.max(0, top);

        codeContainer.getScrollable().scrollTo(null, top, true);


        if (width < innerWidth)
            this.view.down('#spGridWidth').setHtml("<div style='color:red;'><b>Actual grid width: " + width + ".  Inner width: " + innerWidth + "</b></div>");
        else
            this.view.down('#spGridWidth').setHtml("<div><b>Actual grid width: " + width + ".  Inner width: " + innerWidth + "</b></div>");

    },


    changeGridWidth: function () {

        let plugIn = this.view.down('grid').getPlugin('czresponsivegrid');
        let sizes = plugIn.splitsWidthsCache;

        //console.log(sizes);

        this.lastGroup = plugIn.activeSplit + 1;

        if (this.lastGroup > sizes.length - 1) {
            this.lastGroup = 0;
        }

        let grid = this.view.down("grid");
        let codeBox = this.view.down("#codeExampleSplits");

        let widthToResize = sizes[this.lastGroup][2]+15;

        if (widthToResize > this.view.element.getSize().width - 100)
            widthToResize = this.view.element.getSize().width - 100;

        this.view.down("#resizerRight").setWidth(widthToResize/2);
        //grid.setFlex(null);
        //grid.setWidth();
    }



});