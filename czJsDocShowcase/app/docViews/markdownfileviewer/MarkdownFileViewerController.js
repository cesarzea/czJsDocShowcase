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
Ext.define('czJsDocShowcase.docViews.markdownfileviewer.MarkdownFileViewerController', {

    extend: 'czJsDocShowcase.view.abstractviewcontroller.AbstractViewController',
    alias: 'controller.markdownfileviewer',

    requires: [
        'czJsDocShowcase.view.codeview.view'
    ],

    view: null,
    file: null,


    init: function (view) {

        this.callParent(arguments);
        this.view = view;

    },

    loadDoc: function (el) {

        let docInfo = el.data.data;

        this.getViewModel().set('docInfo', docInfo);

        if (this.file !== el.data.data.file) {

            this.file = el.data.data.file;

            Ext.Ajax.request({
                url: el.data.data.file,
                success: function (response, opts) {

                    this.getViewModel().set('html', this.formatMarkUp(response.responseText));
                    this.getViewModel().notify();

                    this.view.bodyElement.dom.querySelectorAll('code').forEach(e => Prism.highlightElement(e, false));

                    Prism.fileHighlight(this.view.bodyElement.dom);

                    let task = new Ext.util.DelayedTask(function () {
                        this.scrollToEl(this.validId(el.data.data.name));
                    }, this);
                    task.delay(250);


                    this.publish('docLoaded', el);

                },
                scope: this
            })
        } else {
            this.scrollToEl(this.validId(el.data.data.name));
        }

    },

    validId: function (name) {
        return name.replace(/\W/g, '').toLowerCase(); //cleanedId is "What_ever_your_id_is__________"
    },

    formatMarkUp: function (text) {

        text = text.replace(/^([ \t]*)```[a-zA-Z]*$/gm, function (match, offset, str) {
                if (match.trim() !== '```')
                    return "<pre><code class='language-" + match.trim().substring(3) + "'>";
                else
                    return match;
            }
        );

        text = text.replaceAll('```', '</code></pre>');


        text = text.replaceAll('<code=javascript>', '<pre><code class="language-javascript">');
        text = text.replaceAll('</code>', '</code></pre>');

        //text = text.replaceAll('```javascript', '<pre><code class="language-javascript">');

        text = czJsDocShowcase.app.converter.makeHtml(text);

        return '<div class="markdown">' + text + '</div>';

    },

    scrollToEl: function (elementId) {

        if (Ext.Element.cache.hasOwnProperty('docContent')) {
            Ext.Element.cache['docContent'].destroy();
        }

        if (elementId === null) {

            this.view.down('#docContent').getScrollable().scrollTo(0, 0, true);

        } else {

            delete Ext.dom.Element.cache[elementId];

            if (this.view.element.down('#' + elementId) === null) {
                //console.error('Unable to find the element #' + elementId);
            } else {

                let el = this.view.element.down('#' + elementId);

                if (el !== null) {
                    this.view.down('#docContent').getScrollable().scrollTo(
                        0,
                        -this.view.down('#docContent').bodyElement.getTop() +
                        el.getTop() +
                        this.view.down('#docContent').getScrollable().getPosition().y - 20,
                        true
                    )


                    el.retries = 0;
                    el.out = false;

                    let task = new Ext.util.DelayedTask(function () {
                        el.setStyle('opacity', el.getStyle('opacity') === '1' ? '0' : '1');
                        if (el.retries++ < 4) {
                            task.delay(400);
                        } else {
                            el.setStyle('opacity', 1);
                        }
                    });
                    task.delay(250);


                }
            }

        }

    }

});