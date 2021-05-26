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
Ext.define('czJsDocShowcase.docProcessors.markdownReader.markdownReader', {

    alias: 'markdownReader',

    records: [],
    callBackFn: null,
    callBackScope: null,
    docInfo: null,
    numDoc: null,

    read: function (numDoc, url, docInfo, callBackFn, scope) {
        this.numDoc = numDoc;
        this.docInfo = docInfo;
        this.callBackFn = callBackFn;
        this.callBackScope = scope;
        this.records = [];


        if (docInfo.levelsToShowInTree !== undefined && docInfo.levelsToShowInTree > 0) {

            Ext.Ajax.request({
                url: url,
                success: function (response, opts) {
                    this.processInputDoc(response.responseText);
                },
                scope: this
            })

        } else
            Ext.callback(this.callBackFn, this.callBackScope, [this.numDoc, this.records, this.docInfo]);
    },

    processInputDoc: function (text) {

        let levels = [];

        let memberOf = this.docInfo.name;
        if (this.docInfo.memberOf !== undefined && this.docInfo.memberOf.trim() !== '') {
            memberOf = this.docInfo.memberOf.trim() + ' > ' + this.docInfo.name;
        }
        let allLines = text.split('\n');
        let lineN = 0;

        while (lineN < allLines.length) {
            let line = allLines[lineN].trim();

            let level = 0;

            while (line.substring(level, level+1) === '#') {
                level++;
            }

            if (level > 0 && level <= this.docInfo.levelsToShowInTree) {
                let name = line.substring(level+1);
                let elementMemberOf = memberOf;

                levels['' + level] = name;

                if (level > 1) {
                    for (let i = 0; i < level; i++) {
                        if (levels['' + i] !== undefined) {
                            elementMemberOf += ' > ' + levels['' + i];
                        }
                    }
                }

                this.records.push({
                    name: name,
                    memberOf: elementMemberOf,
                    type: this.docInfo.type,
                    file: this.docInfo.file
                })
            }
            lineN++;
        }

        Ext.callback(this.callBackFn, this.callBackScope, [this.numDoc, this.records, this.docInfo]);

    }

});