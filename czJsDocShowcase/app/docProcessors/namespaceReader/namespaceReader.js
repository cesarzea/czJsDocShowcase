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

Ext.define('czJsDocShowcase.docProcessors.namespaceReader.namespaceReader', {

    alias: 'namespaceReader',

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

        Ext.callback(this.callBackFn, this.callBackScope, [this.numDoc, this.records, this.docInfo]);
    }

});