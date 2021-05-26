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
Ext.define('czJsDocShowcase.view.codeview.codedialog.codeDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.codedialog',


    visible: false,

    type: null,
    text: null,
    linesToMark: null,
    callConfig: null,

    onShow: function () {

        if (this.callConfig !== null)
            if (this.callConfig.dialogConfig !== undefined) {
                if (this.callConfig.dialogConfig.centered === true)
                    this.getView().center();
            }

        if (this.type !== null && !this.visible) {
            this.visible = true;
            this.showFile(this.file, this.linesToMark, this.type, this.title);
        }

        this.visible = true;
    },


//    showInfo: function (source, config, type, title) {
//
//        this.callConfig = config;
//
//        if (config.dialogConfig !== undefined) {
//            this.getView().setConfig(config.dialogConfig);
//        }
//
//        this.getView().show();
//        this.getView().setHidden(false);
//        this.type = type;
//
//        this.getView().setTitle(title);
//
//        this.setStatus(type);
//
//        switch (type) {
//
//            case 'javascript':
//                this.showFile(source, config, type, title);
//                break;
//
//            case 'markdown':
//                this.showFile(source, config, type, title);
//                break;
//
//            case 'extjsitems':
//                this.getView().show();
//                this.getView().setHidden(false);
//                if (config.fullScreen === true) {
//                    this.getView().maximize(false);
//                }
//                if (config.title !== undefined) {
//                    this.getView().setTitle(config.title);
//                } else {
//                    this.getView().setTitle(title);
//                }
//                this.getView().down('#items').add(source);
//                break;
//
//           default:
//               this.getView().setHidden(false);
//                this.showFile(source, config, type, title);
//
//        }
//    },

    showFile: function (file, linesToMark, type, title) {

        this.file = file;
        this.linesToMark = linesToMark;
        this.type = type;
        this.title = title;

        if (!this.visible) {
            this.getView().show();
            return;
        }

        this.getView().show();
        this.getView().down('#sourceCode').setHtml('');
        this.getView().down('#sourceCode').setHidden(true);

        if (title === undefined || title === null || title.trim() === '')
            this.getView().setTitle(file);

        this.getView().down('#sourceCode').up().setMasked('loading');

        Ext.Ajax.request({
            url: file,
            success: function (response, opts) {
                this.text = response.responseText;

                switch (type) {

                    case 'javascript':
                        this.showTheCode(response.responseText, linesToMark, this.type);
                        break;

                    case 'markdown':
                        this.showMarkDown(response.responseText);
                        break;

                    default:
                        this.showFileByType(response.responseText, this.type);
                        break;
                }

            },
            scope: this
        })

    },

    setStatus: function (status) {

        if (status === 'extjsitems') {
            this.getView().down('#sources').setHidden(true);
            this.getView().down('#items').setHidden(false);
            this.getView().down('#items').removeAll(true);
        } else {
            this.getView().down('#sources').setHidden(false);
            this.getView().down('#items').setHidden(true);
            this.getView().down('#items').removeAll(true);
        }

    },

    showFileByType(text, type) {

        if (text === null || !this.visible)
            return;

        this.getView().setTitle(this.title);

        // Scaping
        text = text.replaceAll('<', '&lt;');
        text = text.replaceAll('>', '&gt;');

        let preCnf = '<pre>';

        this.getView().down('#sourceCode').setHtml('');

        this.getView().down('#sourceCode').setHtml(
            preCnf + '<code class="language-' + type + '">'
            + text
            + '</code></pre>'
        );

        let pre = this.getView().el.query('code')[0];

        Prism.highlightElement(pre, true, this.scrollToLines, this);

    },

    showMarkDown: function (text) {

        this.getView().down('#sourceCode').setHtml('<div class="markdown">' + czJsDocShowcase.app.converter.makeHtml(text) + '</div>')
        this.getView().down('#sourceCode').setHidden(false);
        this.getView().down('#sourceCode').up().setMasked(false);
    },

    showTheCode: function (text, linesToMark) {

        if (text === null || !this.visible)
            return;

        // Scaping
        text = text.replaceAll('<', '&lt;');

        let preCnf = '<pre class="line-numbers">';

        if (linesToMark !== undefined && linesToMark !== null)
            preCnf = '<pre class="line-numbers" data-line="' + linesToMark + '">';

        this.getView().down('#sourceCode').setHtml('');

        this.getView().down('#sourceCode').setHtml(
            preCnf + '<code class="language-javascript">'
            + text
            + '</code></pre>'
        );

        let pre = this.getView().el.query('code')[0];

        Prism.highlightElement(pre, true, this.scrollToLines, this);

    },

    scrollToLines: function () {

        let prediv = Ext.ComponentManager.fromElement(this);

        if (prediv !== null) {
            let view = prediv.up('dialog');

            view.down('#sourceCode').setHidden(false);

            let scrollCmp = view.down('#sourceCode').bodyElement.dom;

            let lines = this.parentElement.querySelector('.line-highlight');

            if (lines !== null) {
                linesHeight = lines.offsetHeight,
                    pre = scrollCmp.scrollHeight > scrollCmp.clientHeight ? this : document.body,
                    preHeight = pre === document.body ? window.innerHeight : scrollCmp.offsetHeight;

                lines.scrollIntoView();

                if (preHeight > linesHeight && pre.scrollTop < (pre.scrollHeight - preHeight)) {
                    scrollCmp.scrollTop = scrollCmp.scrollTop - (preHeight / 2) + (linesHeight / 2);
                }
            }

            view.down('#sourceCode').up().setMasked(false);
        }
    },

    onHide: function () {

        this.getView().setHidden(true);
        this.setStatus('javascript');
    }
});