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
Ext.define('czJsDocShowcase.Application', {
    extend: 'Ext.app.Application',

    name: 'czJsDocShowcase',

    mixins: ['czJsDocShowcase.view.abstractviewcontroller.eventmanager.EventManager'],

    requires: [
        'czJsDocShowcase.docViews.emptyview.EmptyView',
        'Ext.Responsive'
    ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    routes: {
        'doc/:id': 'onDoc',
        'doc/:id/:section': 'onDoc'
    },

    mainConfig: null,

    converter: null,

    doc: null,

    xtypeToShow: null,

    init: function () {

        let url_string = window.location.href;
        let url = new URL(url_string);
        let c = url.searchParams.get("view");

        if (c !== null) {
            this.xtypeToShow = c;
            //console.log(c);
            this.setMainView('czJsDocShowcase.docViews.emptyview.EmptyView');
        } else {
            this.setMainView('czJsDocShowcase.view.main.Main');
        }
        this.callParent(arguments);

    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update...', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    launch: function () {

        //console.log("Launch");

        this.converter = new showdown.Converter({tables: true, simplifiedAutoLink: true});

        Ext.Loader.loadScript({
            url: Ext.manifest.czJsDocumentsDataDir + 'czJsDocShowcaseConfig.js',
            onLoad: (o) => {

                this.publish('setDocsConfig', this.mainConfig);
                this.loadConfigFile(this.mainConfig, this);

            },

            onError: (o) => {

                Ext.Msg.alert('Error loading the configuration file.', 'Error loading the configuration file.</br>' + response.request.url);
                console.error('Unable to load ' + Ext.manifest.czJsDocumentsDataDir + 'czJsDocShowcaseConfig.js. Server-side failure with status code ' + response.status);

            },

            scope: this
        })

    },


    loadConfigFile: (config, me) => {

        Ext.Loader.setConfig({
            paths: config.namespaceMapping
        });

        document.title = config.pageTitle;

        me.loadStyles(config.stylesToLoad);

        me.loadScripts(config.scriptsToLoad)
            .then(() => {

                    me.publish('startLoadDocs');

                    let docNum = 0;

                    config.docsToLoad.forEach(r => {

                        r.docNum = docNum++;

                        me.publish('loadDocFile', r);

                        if (r['default'] !== undefined) {
                            if (r.default && me.xtypeToShow === null)
                                if (me.doc === null) {
                                    me.onDoc(r.name, null);
                                }
                        }
                    }, this)

                    if (me.xtypeToShow !== null) {
                        me.getMainView().add({xtype: me.xtypeToShow})
                    }

                    me.publish('endLoadDocs');
                }
            );


    },

    loadStyles: (cssFiles) => {

        let head = document.getElementsByTagName('head')[0];

        cssFiles.forEach(f => {
            let link = document.createElement('link');
            //link.id   = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = f;
            link.media = 'all';
            head.appendChild(link);
        })
    },

    loadScripts: function (scripts) {

        return new Ext.Promise((resolve, reject) => {

            let loadPromises = [];

            scripts.forEach(scr => {
                loadPromises.push(new Ext.Promise((resolve, reject) => {
                        Ext.Loader.loadScript({
                            url: scr,
                            onLoad: (o) => {
                                resolve();
                            },

                            onError: (o) => {
                                Ext.Msg.alert('Error loading script', 'Error loading the next script file included in the scriptsToLoad in the czDocumentConfig.js file.</br>' + o.url, Ext.emptyFn);
                                reject();
                            },

                            scope: this
                        })
                    })
                )
            }, this)

            Ext.Promise.all(loadPromises)
                .then(() => {
                    resolve()
                })
                .catch(() => reject());
        })

    },

    onDoc: function (doc, section) {


        if (doc === undefined)
            return;

        doc = decodeURI(doc).replaceAll('>', ' > ');
        section = decodeURI(section);

        if (this.doc !== doc || this.section !== section) {
            this.doc = doc;
            this.section = section;

            this.publish('goToDocNode', this.doc, this.section);
        }

    },


});
