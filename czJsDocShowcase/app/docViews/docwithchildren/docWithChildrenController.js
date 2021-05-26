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
Ext.define('czJsDocShowcase.docViews.docwithchildren.docWithChildrenController', {
    extend: 'czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',
    alias: 'controller.docwithchildren',

    requires: [
        'Ext.util.DelayedTask',
        'czJsDocShowcase.docViews.docwithchildren.components.brotherelement.BrotherElement'
    ],

    view: null,
    scrollTask: null,
    el: null,

    init: function (view) {
        this.callParent(arguments);
        this.view = view;

        this.scrollTask = new Ext.util.DelayedTask(this.scrollToEl, this);
    },

    loadDoc: function (el) {

        if ((this.el === null || this.el.parentNode.id !== el.parentNode.id)
            || (el.childNodes.length !== this.el.childNodes.length )
            || (el.childNodes.length > 0 && this.el.childNodes.length > 0 && el.childNodes[0].data.id !== this.el.childNodes[0].data.id)
            ) {
            let childNodes = el.parentNode.childNodes;
            let namespaceNode = el.parentNode;

            if (el.data.data['namespace'] !== undefined) {
                childNodes = el.childNodes;
                namespaceNode = el;
            }

            let model = this.getViewModel();
            let listElements = this.view.down('#listElements');

            listElements.removeAll(true);

            let items = [];

            childNodes.forEach(ch => {

                items.push({
                    xtype: 'brotherelement',
                    itemId: ch.data.text,
                    data: ch
                });

            }, this);

            listElements.setItems(items);

            this.loadNode(namespaceNode);

        }

        this.el = el;
        this.scrollTask.delay(500);

        this.publish('docLoaded', el);

    },

    loadNode: function (el) {

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

        if (el.data['example'] === undefined)
            model.set('example', []);

        //model.set('source', 'view source');
        model.notify();

        this.view.bodyElement.dom.querySelectorAll('.language-javascript').forEach(e => Prism.highlightElement(e, false));

        model.set('title', '(' + el.data.memberOf + ') :: ' + el.data.name);


    },

    formatMarkUp: function (text) {

        text = text.replaceAll('<code=javascript>', '<pre><code class="language-javascript">');
        text = text.replaceAll('</code>', '</code></pre>');
        return czJsDocShowcase.app.converter.makeHtml(text);

    },

    scrollToEl: function () {

        if (this.el.data.data['namespace'] !== undefined) {

            this.view.down('#docContent').getScrollable().scrollTo(0, 0, true);

        } else {

            this.view.down('#docContent').getScrollable().scrollTo(
                0,
                -this.view.down('#docContent').element.getTop() +
                this.view.down('#' + this.el.data.text).element.getTop() +
                this.view.down('#docContent').getScrollable().getPosition().y,
                true
            )

            this.view.down('#' + this.el.data.text).down('#docSubTitlePanel').setCollapsed(false);
        }

    },

    onExpandAll: function(tool) {
        if (tool.action === 'expand') {
            this.view.down('#listElements').query('panel').forEach(p => {
                if (p.getCollapsible()) p.expand(false);
            });
            tool.action = 'collapse';

            this.view.down('#expandAllTool').setIconCls('fa fa-minus');

        } else {
            this.view.down('#listElements').query('panel').forEach(p => {
                if (p.getCollapsible()) p.collapse(false);
            });
            tool.action = 'expand';
            this.view.down('#expandAllTool').setIconCls('fa fa-plus');
        }
    }
});