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
Ext.define('czJsDocShowcase.docViews.defaultdoc.DefaultDocController', {
    extend: 'czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',
    alias: 'controller.defaultdoc',

    requires: [
        'czJsDocShowcase.view.codeview.view'
    ],

    view: null,

    init: function (view) {
        this.callParent(arguments);
        this.view = view;
    },

    loadDoc: function (elNode) {

        let el = elNode.data;

        let model = this.getViewModel();

        model.set('jsDocInfo', el);

        let vars = [
            ['documentation', this.formatMarkUp],
            ['example', (c) => {
                return {xtype: c};
            }]
        ]

        vars.forEach(v => {

            if (el.data[v[0]] === undefined) {
                model.set(v[0], null);
                model.set('has' + v[0], false);
            } else {
                model.set(v[0], v[1](el.data[v[0]]));
                model.set('has' + v[0], true);
            }

        }, this);

        if (el.data['example'] === undefined) {
            this.view.down('#examplePanel').setItems([]);
        } else {
            this.view.down('#examplePanel').setItems([{
                xtype: el.data['example']
            }])
        }

        model.notify();

        this.view.bodyElement.dom.querySelectorAll('.language-javascript').forEach(e => Prism.highlightElement(e, false));

        model.set('title', '(' + el.data.memberOf + ') :: ' + el.data.name);

        this.publish('docLoaded', el);
    },

    formatMarkUp: function (text) {
        return text;

        text = text.replaceAll('<code=javascript>', '<pre><code class="language-javascript">');
        text = text.replaceAll('</code>', '</code></pre>');
        return czJsDocShowcase.app.converter.makeHtml(text);

    },

    onViewCode: function (btn) {
        codeViewer.showCode(this.getViewModel().get('jsDocInfo').data.lineFrom + '-' + this.getViewModel().get('jsDocInfo').data.lineTo);
    },


});