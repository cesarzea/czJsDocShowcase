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
Ext.define('examples.Example1Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.examples.example1',

    view: null,

    init: function (view) {
        this.view = view;
    },

    onResizerLeft: function (cmp) {
        let width = cmp.getSize().width;
        this.view.down('#resizerRight').setWidth(width);
    },

    onResizerRight: function (cmp) {
        let width = cmp.getSize().width;
        this.view.down('#resizerLeft').setWidth(width);
    },

    onMainGridResize: function (grid, plugIn) {

        this.view.fireEvent('czGridResize', grid, plugIn);

    }

});