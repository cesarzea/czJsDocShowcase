/*
 * czJsDocShowcase. V1.0b
 *
 * Author & Copyright (c) 2021. César Pedro Zea Gómez <cesarzea@jaunesistemas.com>
 * Contact to request your 'free' license, any question or request or to hire me as a freelancer (freelance from 1999)
 *
 * More information at : https://www.cesarzea.com
 * Documentation       : https://www.cesarzea.com/czJsDocShowcase
 * GitHub repo         : https://github.com/cesarzea/czJsDocShowcase
 *
 * Please, use the issues section of the Git repository to report bugs or request improvements.
 *
 */

czJsDocShowcase.app.mainConfig = {

    /**
     * pageTitle: Page title.
     */
    pageTitle: 'César Zea - An application to show documentation.',

    /**
     * topBarTitle: the title thar is shown in the top bar of the page.
     */
    topBarTitle: 'César Zea - czJsDocShowcase: an application to show documentation.',

    /**
     * treeBarTitle: The label that is displayed above the content tree.
     */
    treeBarTitle: 'Documentation',

    /**
     * treeBarWidth: The initial width of the three bar contents.
     */
    treeBarWidth: 400,

    /**
     * treeBarCollapsed: true if you want the tree content start collapsed or expanded.
     * If the width of the window is too small, the tree content will be started collapsed.
     */
    treeBarCollapsed: false,

    /**
     * stylesToLoad: one array with a list of css files you want to be loaded at start up.
     * That is very useful to change the the appearance of the presentation, create
     * new markdown style elements, the style of new plugins, etc.
     */
    stylesToLoad: [
        '../data/css/styles.css',
        '../data/css/jsdocStyles.css',
        '../data/extend/markdown_extend_blockquotes.css',
        'https://vjs.zencdn.net/7.11.4/video-js.css'
    ],

    /**
     * Only relevant to include Sencha ExtJs components or new components based on Sencha ExtJs.
     * Define the paths config variable for the Ext.Loader singleton.
     * See https://docs.sencha.com/extjs/7.3.1/modern/Ext.Loader.html#cfg-paths.
     */
    namespaceMapping: {
        examples: '/data/czResponsiveGrid/examples'
    },

    /**
     * scriptsToLoad: an Array of JavaScripts files to be loaded at start up.
     */
    scriptsToLoad: [

        /**
         * Add on example
         */
        //'../data/addOn/addon_example.js',

        /**
         * An example of how to extend the markdown syntax.
         */
        '../data/extend/markdown_extend.js',

        /**
         * That js files are included as example.
         * You can see them in action in the examples section.
         */
        '../data/czResponsiveGrid/czResponsiveGrid.js',

        '../data/docViews/MarkdownFileViewerController.js',

        '../data/czResponsiveGrid/examples/model/laureates.js',
        '../data/czResponsiveGrid/examples/store/laureates.js',

        '../data/czResponsiveGrid/examples/components/example1Grid.js',
        '../data/czResponsiveGrid/examples/components/example1GridNoResponsive.js',

        '../data/czResponsiveGrid/examples/example1/Example1Controller.js',
        '../data/czResponsiveGrid/examples/example1/Example1Model.js',
        '../data/czResponsiveGrid/examples/example1/Example1.js',

        '../data/czResponsiveGrid/examples/splitsexample/SplitsExampleModel.js',
        '../data/czResponsiveGrid/examples/splitsexample/SplitsExampleController.js',
        '../data/czResponsiveGrid/examples/splitsexample/SplitsExample.js'

    ],

    /**
     * The icon that will be displayed in all nodes that not specified what icon to show
     * in the iconCls value.
     */
    defaultNodeIcon: 'fas fa-circle fa-sm',

    /**
     * Document list to include in the contents.
     * Read the specific documentation for that
     * config variable at User Manual > docsToLoad: including your documents
     */
    docsToLoad: [
        {
            type: 'markdown',
            name: 'What is czJsDocShowcase',
            file: '../data/docs/1. What is czJsDocShowcase.md',
            iconCls: 'far fa-question-circle',
            levelsToShowInTree: 2,
            default: true
        },
        {
            type: 'markdown',
            name: 'How to use it',
            file: '../data/docs/2. How to use it.md',
            levelsToShowInTree: 2,
            iconCls: 'fas fa-chalkboard-teacher'
        },


        // ----------------------------------------------------------
        // User Manual
        {
            type: 'namespace',
            noContent: true,
            name: 'User Manual',
            iconCls: 'fas fa-book'
        },
        {
            type: 'markdown',
            name: 'The configuration file',
            expanded: false,
            file: '../data/docs/3. czJsDocumentationConfig.js.md',
            iconCls: 'fas fa-tools',
            memberOf: 'User Manual'
        },
        {
            type: 'markdown',
            name: 'docsToLoad: including your documents',
            file: '../data/docs/4. docsToLoad.md',
            expanded: false,
            iconCls: 'fas fa-tools',
            levelsToShowInTree: 1,
            memberOf: 'User Manual'
        },
        {
            type: 'markdown',
            name: 'Specific markdown Syntax',
            file: '../data/docs/5. Markdown Syntax.md',
            expanded: false,
            iconCls: 'fas fa-swatchbook',
            levelsToShowInTree: 1,
            memberOf: 'User Manual'
        },

        {
            type: 'markdown',
            name: 'Including jsDoc files',
            file: '../data/docs/6. Including jsDoc Files.md',
            levelsToShowInTree: 2,
            expanded: false,
            iconCls: 'fas fa-swatchbook',
            memberOf: 'User Manual'
        },

        // ---------------------------------------------------------
        // Developer Manual
        {
            type: 'namespace',
            name: 'Developer Manual',
            noContent: true,
            expanded: true,
            iconCls: 'fab fa-dev'
        },
        {
            type: 'markdown',
            name: 'Introduction',
            file: '../data/docs/dev_manual_intro.md',
            expanded: false,
            iconCls: 'fas fa-home',
            memberOf:'Developer Manual'
        },
        {
            type: 'markdown',
            name: 'Markdown Syntax Extensions',
            file: '../data/docs/markdown_syntax_extensions.md',
            expanded: false,
            iconCls: 'fas fa-home',
            memberOf:'Developer Manual'
        },
        {
            type: 'markdown',
            name: 'czJsDocShowcase Add Ons',
            file: '../data/docs/czJsDocShowcase_add_ons.md',
            expanded: false,
            iconCls: 'fas fa-home',
            memberOf:'Developer Manual'
        },
        {
            type: 'markdown',
            name: 'Docs Views',
            file: '../data/docs/docs_views.md',
            expanded: false,
            iconCls: 'fas fa-home',
            memberOf:'Developer Manual'
        },
        {
            type: 'markdown',
            name: 'Docs Parsers',
            file: '../data/docs/docs_parsers.md',
            expanded: false,
            iconCls: 'fas fa-home',
            memberOf:'Developer Manual'
        },

        // ----------------------------------------------------------
        // Examples
        {
            type: 'namespace',
            noContent: true,
            name: 'Examples',
            iconCls: 'fas fa-book'
        },


        {
            type: 'namespace',
            name: 'Markdown examples',
            expanded: false,
            iconCls: 'fas fa-book',
            memberOf: 'Examples'
        },
        {
            type: 'markdown',
            name: 'What is czResponsiveGrid',
            levelsToShowInTree: 2,
            expanded: false,
            file: '../data/czResponsiveGrid/What is czResponsiveGrid.md',
            iconCls: 'fas fa-book',
            memberOf: 'Examples > Markdown examples'
        },
        {
            type: 'markdown',
            name: 'How to use it',
            levelsToShowInTree: 2,
            expanded: false,
            file: '../data/czResponsiveGrid/configuration.md',
            iconCls: 'fas fa-book',
            memberOf: 'Examples > Markdown examples',
        },
        {
            type: 'markdown',
            name: 'About and License',
            levelsToShowInTree: 2,
            file: '../data/czResponsiveGrid/license.md',
            iconCls: 'fas fa-book',
            memberOf: 'Examples > Markdown examples',
        },



        {
            type: 'czjsdoc',
            name: 'jsDoc syntax and structure',
            iconCls: 'fas fa-tools',
            file: '../data/czResponsiveGrid/czResponsiveGrid.js',
            memberOf: 'Examples',
            expanded: false
        }
    ]
}

