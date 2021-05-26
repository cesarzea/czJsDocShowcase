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
Ext.define('czJsDocShowcase.docProcessors.jsDocReader.jsDocReader', {

    alias: 'czjsdocReader',

    records: [],
    callBackFn: null,
    callBackScope: null,
    docInfo: null,
    numDoc: null,


    rootNamespace: '',
    actualNamespace: '',
    namespaces: [],


    heritableKeysFromNamespace: [
        'displayDocAs',
        'defaultIconCls',
        'namespaceSeeAlso'
    ],


    tagsToMarkUp: [
        'description',
        'documentation',
        'default',
        'namespaceSeeAlso'
    ],

    defaultDocViewer: 'defaultdoc',


    read: function (numDoc, url, docInfo, callBackFn, scope) {

        this.numDoc = numDoc;
        this.docInfo = docInfo;
        this.callBackFn = callBackFn;
        this.callBackScope = scope;
        this.records = [];

        this.rootNamespace = docInfo.name;

        if (docInfo.memberOf !== undefined && docInfo.memberOf.trim() !== '') {
            this.rootNamespace = docInfo.memberOf + ' > ' + this.rootNamespace;
        }

        Ext.Ajax.request({
            url: url,
            success: function (response, opts) {
                this.processInputDoc(response.responseText);
            },
            scope: this
        })
    },


    processInputDoc: function (txt) {

        let lines = txt.split('\n');

        let lineFrom = 0,
            actualLine = 0,
            inComment = false;


        for (let i = 0; i < lines.length; i++) {

            let l = lines[i].trim();

            if (inComment) {
                if (l.substring(l.length - 2, l.length) === '*/') {
                    //console.log("End: " + i)
                    inComment = false;
                    this.processComment(lines, lineFrom, i);
                }
            } else {
                if (l.substring(0, 2) === '/*') {
                    if (l.substring(l.length - 2, l.length) !== '*/') {
                        //console.log("Start: " + i);
                        lineFrom = i;
                        inComment = true;
                    }
                }
            }

        }

        this.records.forEach(r => {

            this.tagsToMarkUp.forEach(t => {
                if (r[t] !== undefined)
                    r[t] = this.formatMarkUp(r[t]);
            })

            if (r.memberOf !== undefined)
                r.memberOf = this.rootNamespace + ' > ' + r.memberOf;
            else
                r.memberOf = this.rootNamespace;

            if (r.displayDocAs === undefined) {
                r.displayDocAs = this.defaultDocViewer;
            }

        })

        //console.log(this.records)

        Ext.callback(this.callBackFn, this.callBackScope, [this.numDoc, this.records, this.docInfo]);

    },

    processComment: function (lines, lineFrom, lineTo) {

        let tag = '';
        let content = '';
        let obj = {};
        let trim = true;
        let hasInlineContent = false;

        for (let i = lineFrom + 1; i < lineTo; i++) {

            //if (i + 1 === 59)
            //   debugger;

            let l = lines[i].trimLeft().substring(1);

            if (l.trim().substring(0, 1) === '@') {

                if (content.trim() !== '' && tag === '')
                    tag = 'description';

                if (tag !== '') {
                    obj[tag.trim()] = content;
                }


                let pEnd = l.trim().indexOf(' ');
                if (pEnd === -1) {
                    hasInlineContent = false;
                    pEnd = l.trim().length;
                } else {
                    hasInlineContent = true;
                }

                //console.log(l.substring(0, pEnd));

                tag = l.trim().substring(1, pEnd).trim();

                if (hasInlineContent)
                    content = l.trim().substring(pEnd, l.trim().length).trim();
                else
                    content = '';

            } else {

                if (!hasInlineContent) {
                    if (l.trim().substring(0, '```'.length) === '```') {
                        trim = !trim;
                    } else {
                        if (l.trim().substring(0, '<code='.length) === '<code=') {
                            trim = false;
                        } else {
                            if (l.trim().substring(0, '</code>'.length) === '</code>') {
                                trim = true;
                            }
                        }
                    }

                    if (trim) {
                        content += '\n' + l;
                    } else {
                        content += '\n' + lines[i].trimLeft().substring(1);
                    }
                }
            }

        }

        if (tag !== '') {
            obj[tag] = content.trim();
        }

        if (Object.keys(obj).length > 0) {

            obj.lineFrom = lineFrom + 1;
            obj.lineTo = lineTo + 1;

            if (obj['namespace'] !== undefined) {
                this.actualNamespace = {...obj};

                if (obj.name === undefined)
                    obj.name = obj.namespace;

                if (this.namespaces.find(e => e.namespace === this.actualNamespace) === undefined) {
                    obj.path = obj.memberOf !== undefined && obj.memberOf.trim() !== '' ? obj.memberOf + ' > ' + obj.name : obj.name;
                    this.namespaces.push(obj);
                }

                obj.namespace = undefined;

                //obj.memberOf = obj.namespace;
            } else {

                if (obj['memberOf'] === undefined) {
                    obj.memberOf = this.actualNamespace.namespace;
                    if ( this.actualNamespace.memberOf !== undefined) {
                        obj.memberOf = this.actualNamespace.memberOf + ' > ' + this.actualNamespace.namespace;
                    }
                }

                let nm = this.namespaces.find(e =>   obj.memberOf  === e.path);
                if (nm !== undefined) {
                    Object.keys(nm).forEach(p => {
                        if (this.heritableKeysFromNamespace.includes(p))
                            if (obj[p] === undefined)
                                obj[p] = nm[p];
                    }, this)
                }

                if (obj['name'] === undefined) {
                    let objName = lines[lineTo + 1].trim();
                    objName = objName.split(':')[0];
                    obj.name = objName;
                }

            }

            if (obj.description === undefined)
                obj.noContent = true;

            this.records.push(obj);

        }


    },

    formatMarkUp: function (text) {

        text = text.replaceAll('<code=javascript>', '<pre><code class="language-javascript">');
        text = text.replaceAll('</code>', '</code></pre>');
        return '<div class="markdown">' + czJsDocShowcase.app.converter.makeHtml(text) + '</div>';

    }


});