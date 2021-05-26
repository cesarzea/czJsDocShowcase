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
Ext.define('czResponsiveGrid', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.czresponsivegrid',

    requires: [
        'Ext.dom.Element',
        'Ext.util.DelayedTask',
        'Ext.util.TextMetrics'
    ],

    /**
     * @namespace Configs
     * @iconCls fa fa-cog
     */
    config: {

        /**
         * Allows to define various aspects of how czResponsiveGrid works
         *
         * @namespace Behaviour
         * @memberOf Configs
         *
         * @documentation
         * These configuration variables define the aesthetic aspect of the values that,
         * because they do not fit in the width of the grid, will be displayed in the body
         * of the row.
         *
         * @noContent true
         * @iconCls fas fa-tools
         * @defaultIconCls fa fa-cog
         * @displayDocAs docWithChildren
         */

        /**
         * Allows to easily define the possible ways in which czResponsiveGrid will show
         * the columns when they do not fit in the total width of the grid.
         *
         * @type {array}
         * @default null
         *
         * @documentation
         * [splits] must be defined by an array of possible options that can be used to display
         * the splitted columns.
         *
         * czResponsiveGrid will calculate the width of each of the proposals defined in the
         * [splits] array and will determine, according to the grid width, the
         * best split to represent the data.
         *
         * Each of the elements of [splits] may be an array in which each element indicates the
         * identifier of the columns to be moved to the body of the rows: (*note that the **'|'**
         * element can also be used to tell czResponsibeGrid to show a vertical line at that position*)
         *
         * ```javascript
         *
         * splits: [
         *      ...
         *      ['born', 'bornCountry', '|', 'died', 'diedCountry'],
         *      ...
         * ]
         *
         * ```
         *
         * Or an array of arrays to be able to specify in which line number within the body of each
         * line each column should be represented: (*note that the **'-'** element can also be used to
         * tell czResponsibeGrid to show a horizontal line at that position*)
         *
         * ```javascript
         *
         * splits: [
         *      ...
         *      [
         *          ['born', 'bornCountry', 'bornCountryCode'],
         *          '-',
         *          ['died', 'diedCountry', 'diedCountryCode']
         *      ],
         *      [
         *          ['born', 'bornCountry'],
         *          ['bornCountryCode', 'bornCity'],
         *          '-',
         *          ['died', 'diedCountry'],
         *          ['diedCountryCode', 'diedCity']
         *      ],
         *      ...
         * }
         * ```
         *
         * The following example shows the example grid and its corresponding 'splits' configuration.
         * Change the width of the grid as you wish to see how the representation of the grid changes:
         *
         * @example examples.splitsExample
         */
        splits: null,

        /**
         * Milliseconds the component will wait after each grid resize before recalculating
         * where to display each column and apply the change to the grid.
         *
         * @type {Number}
         * @default 500
         *
         * @documentation
         * This parameter allows you to prevent this component from slowing down the dynamic
         * display of each size change during dynamic grid size changes.
         *
         * If you have problems that you think may be related to size changes, that you suspect
         * may be due to too many repetitive and unnecessary calculations of this component,
         * increase the value of this configuration parameter and observe the behavior again.
         *
         */
        drawDelay: 500,

        /**
         * Equalizes the width of labels displayed in the same positions on different lines.
         *
         * @type {boolean}
         * @default true
         *
         * @documentation
         * To make the representation more ordered by default, the value of
         * this variable to True sets the component to equal the widths of the labels that
         * are displayed on top of each other.
         *
         */
        regularizeLabelWidths: true,

        /**
         * Equalizes the width of values displayed in the same positions on different lines.
         *
         * @type {boolean}
         * @default true
         *
         * @documentation
         * To make the representation more ordered by default, the value of
         * this variable to True sets the component to equal the widths of the values that
         * are displayed on top of each other.
         *
         */
        regularizeValueWidths: true,

        /**
         * The cosmetics config variables customizes the styles of the splitted data.
         *
         * @namespace Cosmetic
         * @memberOf Configs
         *
         * @noContent true
         * @displayDocAs docWithChildren
         * @iconCls fas fa-palette
         * @defaultIconCls fa fa-cog
         *
         * @documentation
         * This set of configuration variables allows you to customize the appearance of the
         * values that will be displayed in the body row according to the div structure that the
         * plugin generates.
         *
         * #Internal div structure
         *
         * For example, this split in the grid example:
         *
         * ```javascript
         *  [
         *     ['born', 'bornCountry'],
         *     ['bornCountryCode', 'bornCity'],
         *     '-',
         *     ['died', 'diedCountry'],
         *     ['diedCountryCode', 'diedCity']
         *  ],
         * ```
         * <center>
         * Represents the data as follow:
         *
         * ![Internal DIV structure](../data/docImages/grid_with_split4.png =400emx*)
         *
         * With that div structure:
         *
         * ![Internal DIV structure](../data/docImages/internal_div_structure.png =450emx*)
         * </center>
         * That is the div structure:
         *
         * - One div for each line that contains for each value:
         *     - One div for the label.
         *     - One div for the value.
         *
         * The configuration variables in this section allow to define the css classes and
         * the styles of these divs.
         *
         * @namespaceSeeAlso See the [Cosmetic general documentation](#doc/Cosmetic) for more info.
         */

        /**
         * The CSS class to add to each line of values in the row body.
         *
         * @type: string
         * @default 'x-cells-el'
         *
         */
        lineCls: 'x-cells-el',

        /**
         * Additional CSS styles that will be rendered into the inline style attributes of
         * each line of values in the row body.
         *
         * @type: string or style object.
         * @default
         *
         * ```javascript
         *  {
         *    display: 'flex',
         *    width: '100%',
         *    whiteSpace: 'nowrap',
         *    overflow: 'hidden',
         *    padding: '0px'
         * }
         * ```
         */
        lineStyle: {
            display: 'flex',
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            padding: '0px'
        },

        /**
         * The default CSS classes to add to each label.
         *
         * @type: string
         * @default 'x-gridcell x-widthed x-align-left x-body-el x-gridcell-body-el'
         *
         */
        labelCls: 'x-gridcell x-widthed x-align-left x-body-el x-gridcell-body-el',

        /**
         * Additional CSS styles that will be rendered into the inline style attributes of
         * each label.
         *
         * @type: string or style object.
         * @default
         *
         * ```javascript
         *
         *  {
         *      padding: '5px',
         *      flex: 'none',
         *      marginLeft: '0px',
         *      paddingRight: '7px',
         *      fontWeight: 'bold',
         *      'vertical-align': 'top',
         *      'white-space': 'nowrap'
         * }
         *
         * ```
         *
         */
        labelStyle: {
            padding: '5px',
            flex: 'none',
            marginLeft: '0px',
            paddingRight: '7px',
            fontWeight: 'bold',
            'vertical-align': 'top',
            'white-space': 'nowrap'
        },

        /**
         * Default margin in pixels used to separate the labels.
         *
         * @type number
         * @default 20
         */
        labelWidthMargins: 20,

        /**
         * The default CSS classes to add to each value.
         *
         * @type: string
         * @default 'x-gridcell x-widthed x-align-left x-body-el x-gridcell-body-el'
         *
         */
        valueCls: 'x-gridcell x-widthed x-align-left x-body-el x-gridcell-body-el',

        /**
         * Additional CSS styles that will be rendered into the inline style attributes of
         * each value.
         *
         * @type: string or style object.
         * @default
         *
         * ```javascript
         *
         * {
         *   marginLeft: '0px',
         *   flex: '1 0 auto',
         *   'white-space': 'nowrap',
         *   'overflow': 'hidden'
         *  },
         *
         * ```
         *
         */
        valueStyle: {
            marginLeft: '0px',
            flex: '1 0 auto',
            'white-space': 'nowrap',
            'overflow': 'hidden'
        },

        /**
         * Default margin in pixels used to separate the labels.
         *
         * @type number
         * @default 0
         */
        valueWidthMargins: 0,

        /**
         * Border style
         *
         * @default
         * ```javascript
         * {
         *     borderTop: 'lightgrey',
         *     borderTopStyle: 'solid',
         *     borderTopWidth: '1px',
         *     paddingTop: '7px'
         * }
         * ```
         *
         */
        borderTopStyle: {
            borderTop: 'lightgrey',
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            paddingTop: '7px'
        },

        /**
         * No border style
         * @default
         * ```javascript
         * {
         *   paddingTop: '3px'
         * }
         * ```
         */
        notBorderTopStyle: {
            paddingTop: '3px'
        },

        /**
         * Default border bottom style
         * @default
         * ```javascript
         * {
         *    paddingBottom: '7px'
         * }
         * ```
         */
        borderBottomStyle: {
            paddingBottom: '7px'
        },

        /**
         * Default not border bottom style
         * ```javascript
         * {
         *    paddingBottom: '3px'
         * }
         * ```
         */
        notBorderBottomStyle: {
            paddingBottom: '3px'
        },

        /**
         * Default border left style
         * @default
         * ```javascript
         * {
         *    'border-left': 'lightgrey',
         *    'border-left-style': 'solid',
         *    'border-left-width': '1px',
         *    paddingLeft: '7px'
         * }
         * ```
         */
        borderLeftStyle: {
            'border-left': 'lightgrey',
            'border-left-style': 'solid',
            'border-left-width': '1px',
            paddingLeft: '7px'
        },

        /**
         * Default not border left style
         * @default
         * ```javascript
         * {
         *   paddingLeft: '7px'
         * }
         * ```
         */
        notBorderLeftStyle: {
            paddingLeft: '7px'
        },

        /**
         * Default border right style
         * @default
         * ```javascript
         * {
         *   'padding-right': '7px'
         * }
         * ```
         */
        borderRightStyle: {
            'padding-right': '7px'
        },

        /**
         * Default not border right style
         * @default
         * ```javascript
         * {
         *   paddingRight: '0px'
         * }
         * ```
         */
        notBorderRightStyle: {
            paddingRight: '0px'
        },

        /**
         * First line style.
         * @default
         * ```javascript
         * {
         *   paddingTop: '7px'
         * }
         * ```
         */
        firstLineStyle: {
            paddingTop: '7px'
        },

        /**
         * Last line style.
         * @default
         * ```javascript
         * {
         *   paddingBottom: '7px'
         * }
         * ```
         */
        lastLineStyle: {
            paddingBottom: '7px'
        },

        /**
         * Void the inherited grid borders.
         * @default true
         */
        voidInheritBorders: true,

        /**
         * Grid item config used by default.
         * @default
         * ```javascript
         *
         *{
         *   style: {
         *       'border-top-color': 'darkgray',
         *       'border-top-style': 'solid',
         *       'border-top-width': '2px'
         *   },*
         *   body: {
         *       xtype: 'container',
         *       style: {
         *           'border-top-color': 'darkgray',
         *           'border-top-style': 'solid',
         *           'border-top-width': '1px',
         *           margin: '0px',
         *           padding: '0px'
         *       },
         *       cls: 'x-gridrow x-component x-expanded x-size-monitored x-paint-monitored x-layout-fit-item'
         *   }
         *}
         *
         * ```
         */
        itemConfigBase: {
            style: {
                'border-top-color': 'darkgray',
                'border-top-style': 'solid',
                'border-top-width': '2px'
            },

            body: {
                xtype: 'container',
                style: {
                    'border-top-color': 'darkgray',
                    'border-top-style': 'solid',
                    'border-top-width': '1px',
                    margin: '0px',
                    padding: '0px'
                },
                cls: 'x-gridrow x-component x-expanded x-size-monitored x-paint-monitored x-layout-fit-item'
            }
        },

    },

    // Internal variables.
    grid: null,

    resizeTask: null,
    resizing: false,

    elTm: null,
    el: null,

    elTmLabels: null,
    elLbl: null,

    colsConfigs: null,

    splitGroupCols: null,
    splitTotals: null,
    colsToSplit: null,
    totalWidthSplitted: 0,

    // Width of the non responsive columns.
    totalWidthNotResponsive: null,
    // Width of all columns.
    totalColumnsWidth: 0,

    activeSplit: null,

    // Caches
    clearCaches: false,
    splitsWidthsCache: null,
    colsToSplitCache: null,

    privates: {

        constructor: function (config) {
            this.initConfig(config);
        },

        init: function (cmp) {

            this.grid = cmp;

            this.createTextMetrics();

            this.grid.getColumns().forEach(c => {
                // Not compatible with columns groups.
                c.setGroupable(false);
                c._czShownInBody = false;
            });

            this.resizeTask = new Ext.util.DelayedTask(this.doResize, this);

            this.hookUpEvents();
            this.hookShowHideInColumns();

        },

        createTextMetrics: function () {

            //
            // Values measurer.
            //
            let elBody = this.grid.element.down('[class~=x-grid-body-el]').createChild();
            elBody.addCls(this.getItemConfigBase().body.cls).applyStyles(this.getItemConfigBase().body.style).applyStyles("display: inline-block; position: absolute; z-index: -999;");

            this.elLine = elBody.createChild();
            this.elLine.addCls(this.getLineCls()).applyStyles(this.getLineStyle()).applyStyles("display: inline-block;");

            this.el = this.elLine.createChild();
            this.el.addCls(this.getValueCls()).applyStyles(this.getValueStyle()).applyStyles("display: inline-block;");
            this.elTm = new Ext.util.TextMetrics(elBody);

            //
            // Label measurer.
            //
            let elBody2 = this.grid.element.down('[class~=x-grid-body-el]').createChild();
            elBody2.addCls(this.getItemConfigBase().body.cls).applyStyles(this.getItemConfigBase().body.style).applyStyles("display: inline-block; position: absolute; z-index: -999;");

            this.elLine2 = elBody2.createChild();
            this.elLine2.addCls(this.getLineCls()).applyStyles(this.getLineStyle()).applyStyles("display: inline-block;");

            this.elLbl = this.elLine2.createChild();
            this.elLbl.addCls(this.getLabelCls()).applyStyles(this.getLabelStyle()).applyStyles("display: inline-block;");
            this.elTmLabels = new Ext.util.TextMetrics(this.elLbl);

        },

        hookUpEvents() {

            this.grid.on("resize", function (element, info, eOpts) {
                if (!this.resizing)
                    this.resizeTask.delay(this.getDrawDelay());
            }, this);

            this.grid.on("columnhide", function (element, info, eOpts) {
                if (!this.resizing)
                    this.resizeTask.delay(this.getDrawDelay());
            }, this);

            this.grid.on("columnshow", function (element, info, eOpts) {
                if (!this.resizing)
                    this.resizeTask.delay(this.getDrawDelay());
            }, this);

        },

        doResize: function () {

            if (this.resizing)
                return;

            this.resizing = true;

            this.grid.fireEvent('beforeResponsiveResize', this.grid);

            this.grid.setMasked('Thinking...');

            this.calcMeasures();


            let width = this.grid.getSize().width;
            let innerWidth = this.grid.getInnerWidth();

            //console.log(width);

            this.colsToSplit = [];
            this.grid.getColumns().forEach(c => {
                c.czresponsive._toBody = false
            });

            if (this.totalColumnsWidth > width) {
                if (this.getSplits() !== null) {

                    let split = this.calcSplitsWidths();

                    if (split > -1) {
                        this.colsToSplit = this.addColsInSplitToArray(this.getSplits()[split], this.colsToSplit);
                        this.activeSplit = split;
                    } else {
                        this.activeSplit = null;
                    }

                } else {
                    this.activeSplit = null;
                    this.calcSplitsByColsConfigs();
                }
            } else {
                this.activeSplit = null;
            }

            this.regularizeWidths();
            let tpls = this.composeLinesTplArrayAndSplitColumns();

            this.moveToHeaderNonSplittedColumns();
            let tpl = this.createTplBody(tpls);

            this.applyTplBody(tpl);

            this.updateHideShowMenu();

            this.resizing = false;

            this.grid.setMasked(false);

            this.grid.fireEvent('responsiveResize', this.grid, this);

        },

        applyTplBody: function (tpl) {
            if (tpl !== "") {

                let itemConfig = this.getItemConfigBase() || {};

                itemConfig.body = itemConfig.body || {};
                itemConfig.body.tpl = tpl;

                this.grid.setItemConfig(itemConfig);

            } else {

                //this.grid.setStriped(true);
                this.grid.setItemConfig(null);

            }

        },

        createTplBody: function (tpls) {
            let tpl = "";

            let defaultLineStyle = null;
            let lineStyleIsArray = false;

            if (this.getLineStyle() !== undefined) {
                if (Array.isArray(this.getLineStyle())) {
                    lineStyleIsArray = true;
                } else {
                    defaultLineStyle = this.getLineStyle();
                }
            }

            if (defaultLineStyle !== null) {
                defaultLineStyle = 'style="' + this.parseStyle(defaultLineStyle) + '"';
            }

            tpls.sort((a, b) => {

                return parseInt(a) > parseInt(b) ? 0 : 1

            }).forEach((t, line) => {

                if (lineStyleIsArray && this.getLineStyle().length >= line + 1) {
                    defaultLineStyle = 'style="' + this.parseStyle(this.getLineStyle()[line]) + '"';
                }

                let tplLine = '<div class="' + this.getLineCls() + '" ' + defaultLineStyle + '>'

                t.sort((a, b) => {
                    return parseInt(a) > parseInt(b) ? 0 : 1
                }).forEach(t => {
                    ////console.log(t);
                    tplLine += t;
                })

                tplLine += '</div>'

                if (this.fnLineTpl !== undefined) {
                    tplLine = this.fnLineTpl(this.grid, width, tpls.keys()[line], tplLine);
                }
                tpl += tplLine;
            });

            return tpl;
        },

        moveToHeaderNonSplittedColumns: function () {

            this.grid.getColumns().filter(c => {

                return !c.czresponsive._toBody

            }, this).forEach(c => {

                if (!c.getHidden() || c._czShownInBody) {
                    this.columnToHeader(c);
                }

            }, this);
        },

        composeLinesTplArrayAndSplitColumns: function () {
            let tpls = [];

            this.colsToSplit.forEach(c => {

                let cfg = c.czresponsive;

                let label = cfg.label === undefined ? c.getText() : cfg.label;
                let value = (cfg.value || ('{' + c.getDataIndex() + '}'));
                let line = cfg._line === undefined ? "0" : "" + cfg._line;
                let position = cfg._position === undefined ? "0" : "" + cfg._position;

                if (tpls[line] === undefined)
                    tpls[line] = [];

                if (tpls[line][position] === undefined)
                    tpls[line][position] = "";

                let labelWidth = '' + cfg._labelWidth + "px";
                let valueWidth = '' + cfg._valueWidth + "px";

                let borderTop = cfg._borderTop || false;
                let borderTopStyle = '';
                if (borderTop) {
                    borderTopStyle = this.parseStyle(this.getBorderTopStyle());
                } else {
                    borderTopStyle = this.parseStyle(this.getNotBorderTopStyle());
                }

                let borderBottom = cfg._borderBottom || false;
                let borderBottomStyle = '';
                if (borderBottom) {
                    borderBottomStyle = this.parseStyle(this.getBorderBottomStyle());
                } else {
                    borderBottomStyle = this.parseStyle(this.getNotBorderBottomStyle());
                }

                let borderRight = cfg._borderRight || false;
                let borderRightStyle = '';
                if (borderRight) {
                    borderRightStyle = this.parseStyle(this.getBorderRightStyle());
                } else {
                    borderRightStyle = this.parseStyle(this.getNotBorderRightStyle());
                }

                let borderLeft = cfg._borderLeft || false;
                let borderLeftStyle = '';
                if (borderLeft) {
                    borderLeftStyle = this.parseStyle(this.getBorderLeftStyle());
                } else {
                    borderLeftStyle = this.parseStyle(this.getNotBorderLeftStyle());
                }

                let odd = parseInt(line) % 2 === 0 ? ' x-odd ' : '';

                let firstLineStyle = '';
                if (Object.keys(this.colMatrix)[0] === line)
                    firstLineStyle = this.parseStyle(this.getFirstLineStyle());

                let lastLineStyle = '';
                if (Object.keys(this.colMatrix)[this.colMatrix.length - 1] === line)
                    lastLineStyle = this.parseStyle(this.getLastLineStyle());

                let voidBordersStyle = this.getVoidInheritBorders() ? 'border: none;' : '';

                // The label
                let style = 'width: ' + labelWidth + '; max-width:' + labelWidth + '; ' + this.parseStyle(this.getLabelStyle()) + voidBordersStyle + borderTopStyle + borderBottomStyle + borderLeftStyle + firstLineStyle + lastLineStyle;
                if (label !== "") {
                    tpls[line][position] += '<div class="' + this.getLabelCls() + odd + '" style="' + style + '">' + label + '</div>'
                }

                // The value
                style = 'width: ' + valueWidth + '; min-width: ' + valueWidth + '; ' + this.parseStyle(this.getValueStyle()) + voidBordersStyle + borderTopStyle + borderBottomStyle + borderRightStyle + firstLineStyle + lastLineStyle;
                tpls[line][position] += '<div class="' + this.getValueCls() + odd + '" style="' + style + '">' + value + '</div>'

                this.columnToBody(c);

            }, this)

            return tpls;
        },

        regularizeWidths: function () {

            if (this.getRegularizeLabelWidths() || this.getRegularizeValueWidths()) {

                let gridCols = [];

                let maxWidths = [];

                for (let i = 0, len = this.colsToSplit.length; i < len; i++) {
                    let c = this.colsToSplit[i];

                    let line = '' + c.czresponsive._line;
                    let position = '' + c.czresponsive._position;

                    if (maxWidths[position] === undefined) {
                        maxWidths[position] = [0, 0];
                    }

                    if (c.czresponsive._labelWidth > maxWidths[position][0])
                        maxWidths[position][0] = c.czresponsive._labelWidth;

                    if (c.czresponsive._valueWidth > maxWidths[position][1])
                        maxWidths[position][1] = c.czresponsive._valueWidth;
                }

                for (let i = 0, len = this.colsToSplit.length; i < len; i++) {
                    let c = this.colsToSplit[i];

                    c.czresponsive._labelWidth = maxWidths['' + c.czresponsive._position][0];
                    c.czresponsive._valueWidth = maxWidths['' + c.czresponsive._position][1];
                }
            }
        },

        calcSplitsWidths: function () {

            //if (this.splitsWidthsCache === null) {
                this.splitsWidthsCache = [];

                if (this.getSplits() !== null) {
                    for (let i = 0; i < this.getSplits().length; i++) {
                        this.splitsWidthsCache.push(this.calcWidthFromColsArray(this.getSplits()[i]));
                    }

                    for (let i = 0, len = this.splitsWidthsCache.length; i < len; i++) {
                        let widths = this.splitsWidthsCache[i];
                        widths.push(Math.max(this.totalColumnsWidth - widths[0], widths[1]));
                    }
                }
            //}

            let width = this.grid.getSize().width;
            let innerWidth = this.grid.getInnerWidth();

            let minSplitWith = 99999999999;
            let minSplitGroup = -1;

            let maxSplitWidthFit = 0;
            let maxSplitFit = -1;

            for (let i = 0, len = this.splitsWidthsCache.length; i < len; i++) {
                let widths = this.splitsWidthsCache[i];

                let groupWidth = widths[2];

                if (minSplitWith > groupWidth) {
                    minSplitWith = groupWidth;
                    minSplitGroup = i;
                }

                if (groupWidth < width) {
                    if (groupWidth > maxSplitWidthFit) {

                        maxSplitWidthFit = groupWidth;
                        maxSplitFit = i;

                    }
                }

                //console.log(`Split group ${i} : ${this.totalColumnsWidth - widths[0]} : ${widths[1]}`)

            }

            if (maxSplitFit > -1) {
                return maxSplitFit;
            } else {
                return minSplitGroup;
            }

        },

        /**
         * Calculate the widths in body and in columns for one split option.
         * memberOf Private Functions
         *
         * param cols
         *
         * documentation
         * Array of elements that define the split option.
         *
         * It could be an array of strings:
         *        ['born', 'died'],
         *
         * Or an array of arrays of strings;
         *
         * ```javascript
         *
         *        [
         *           ['born', 'bornCountry', 'bornCountryCode'],
         *           ['died', 'diedCountry', 'diedCountryCode']
         *        ]
         *
         *```
         *
         * returns [colWidthSplitted, bodyWidth]
         *
         * colWidthSplitted: width of the columns moved to the body.
         * bodyWidth: width of the body in that split option.
         *
         */
        calcWidthFromColsArray: function (cols) {
            let bodyWidth = 0;
            let colWidthSplitted = 0;

            for (let i = 0; i < cols.length; i++) {

                if (cols[i] !== '|' && cols[i] !== '-') {
                    let widths = [2];

                    if (Array.isArray(cols[i])) {

                        widths = this.calcWidthFromColsArray(cols[i]);

                        colWidthSplitted += widths[0];

                        if (widths[1] > bodyWidth)
                            bodyWidth = widths[1];

                    } else {
                        colWidthSplitted += this.colsConfigs[cols[i]]._colWidth;
                        bodyWidth += this.colsConfigs[cols[i]]._labelWidth + this.colsConfigs[cols[i]]._valueWidth;

                        //console.log(`Split col ${cols[i]} : ${widths[0]} : ${widths[1]}`)
                    }


                }
            }

            return [colWidthSplitted, bodyWidth];
        },

        addColsInSplitToArray: function (arraySplit, arrayCols, line = 0, borderTop = false, colMatrix = null) {

            if (colMatrix === null) {
                this.colMatrix = [];
            }

            this.colMatrix['' + line] = this.colMatrix['' + line] || [];

            let borderLeft = false;
            let position = 0;

            for (let i = 0; i < arraySplit.length; i++) {

                if (Array.isArray(arraySplit[i])) {

                    this.addColsInSplitToArray(arraySplit[i], arrayCols, line++, borderTop, this.colMatrix);
                    borderTop = false;
                    borderLeft = false;

                } else {

                    if (arraySplit[i] !== '|' && arraySplit[i] !== '-') {

                        this.colsConfigs[arraySplit[i]]._borderBottom = false;
                        this.colsConfigs[arraySplit[i]]._borderRight = false;

                        this.colsConfigs[arraySplit[i]]._line = line;
                        this.colsConfigs[arraySplit[i]]._position = (position++);
                        this.colsConfigs[arraySplit[i]]._toBody = true;

                        this.colsConfigs[arraySplit[i]]._borderTop = borderTop;
                        this.colsConfigs[arraySplit[i]]._borderLeft = borderLeft;

                        this.colMatrix[line]['' + position] = this.colsConfigs[arraySplit[i]];

                        borderLeft = false;

                        arrayCols.push(this.colsConfigs[arraySplit[i]]._column);

                    } else {

                        borderLeft = arraySplit[i] === '|';
                        borderTop = arraySplit[i] === '-';
                    }
                }

            }

            // Fix borders
            if (colMatrix === null) {

                for (let line in this.colMatrix) {
                    for (let position in this.colMatrix[line]) {
                        if (this.colMatrix[line][position]._borderTop)
                            if (this.colMatrix['' + (parseInt(line) - 1)] !== undefined && this.colMatrix['' + (parseInt(line) - 1)][position] !== undefined)
                                this.colMatrix['' + (parseInt(line) - 1)][position]._borderBottom = true;

                        if (this.colMatrix[line][position]._borderLeft)
                            if (this.colMatrix[line]['' + (parseInt(position) - 1)] !== undefined)
                                this.colMatrix[line]['' + (parseInt(position) - 1)]._borderRight = true;


                    }
                }

                /*
                * Only for debugg:
                * -----------------
                *
                *    let strMatrix = '';
                *    let maxIdLength = 20;
                *    for (let line in this.colMatrix) {
                *
                *        let strTop = '';
                *        let strNames = '';
                *        let strBottom = '';
                *
                *        for (let position in this.colMatrix[line]) {
                *
                *            let id = this.colMatrix[line][position]._column.getDataIndex();
                *            strTop += this.colMatrix[line][position]._borderTop ? '-'.repeat(maxIdLength + 2) : ' '.repeat(maxIdLength + 2);
                *            strNames += this.colMatrix[line][position]._borderLeft ? '|' : ' ';
                *            strNames += position + ':' + id + ' '.repeat(maxIdLength - id.length);
                *            strNames += this.colMatrix[line][position]._borderRight ? '|' : ' ';
                *            strBottom += this.colMatrix[line][position]._borderBottom ? '-'.repeat(maxIdLength + 2) : ' '.repeat(maxIdLength + 2);
                *        }
                *        strMatrix += line + ' : ' + strTop + '\n' + line + ' : ' + strNames + '\n' + line + ' : ' + strBottom + '\n';
                *    }
                *    console.log(strMatrix);
                */
            }
            return arrayCols;
        },

        hookShowHideInColumns: function () {

            for (let i = 0, len = this.grid.getColumns().length; i < len; i++) {
                let c = this.grid.getColumns()[i];

                if (c.__proto__._czSetHidden === undefined) {
                    c.__proto__._czSetHidden = c.__proto__.setHidden;
                    c.__proto__.setHidden = function (b) {
                        this._czSetHidden(b);
                        this._czShownInBody = false;
                    }
                }

            }
        },

        columnToBody: function (c) {
            c._czSetHidden(true);
            c._czShownInBody = true;
        },

        columnToHeader: function (c) {
            c._czSetHidden(false);
            c._czShownInBody = false;
        },

        /**
         * Obsolete.
         */
        calcSplitsByColsConfigs: function () {

            this.splitGroupCols = [];
            this.splitTotals = [];
            this.colsToSplit = [];
            this.totalWidthSplitted = 0;
            this.totalWidthNotResponsive = 0;


            let width = this.grid.getSize().width;
            let innerWidth = this.grid.getInnerWidth();

            for (let i = 0, len = this.grid.getColumns().length; i < len; i++) {
                let c = this.grid.getColumns()[i];

                let cfg = c.czresponsive;

                if (cfg === undefined) {
                    this.calcMeasures();
                    cfg = c.czresponsive;
                }


                // Column width calculation.
                let colWidth = cfg._colWidth;


                // Is configured for responsive,
                // and is not hidden by the user.
                if (!c.getHidden() || c._czShownInBody) {

                    let cfg = c.czresponsive;
                    cfg._toBody = false;

                    let label = cfg.label === undefined ? c.getText() : cfg.label;

                    // widthToSplit
                    if (cfg.widthToSplit !== undefined && width < cfg.widthToSplit) {

                        this.colsToSplit.push(c)
                        cfg._toBody = true;
                        cfg._line = cfg.line;
                        cfg._position = cfg.position;

                        this.totalWidthSplitted += colWidth;

                    } else {

                        // splitOrder data processing
                        if (cfg.splitOrder !== undefined && cfg.splitOrder !== null) {

                            if (this.splitGroupCols[cfg.splitOrder] === undefined) {
                                this.splitGroupCols[cfg.splitOrder] = [];
                                this.splitTotals[cfg.splitOrder] = [cfg.splitOrder, 0];
                            }

                            this.splitGroupCols[cfg.splitOrder].push(c);
                            this.splitTotals[cfg.splitOrder][1] += colWidth;

                        }
                    }

                }

            }


            if (width < this.totalColumnsWidth - this.totalWidthSplitted) {

                let lastSplitOrderToSplit = null;

                this.splitTotals.sort((a, b) => {

                    return parseInt(a) > parseInt(b) ? 0 : 1

                }, this).forEach((splitGroupWidth, splitGroup) => {

                    if (width < this.totalColumnsWidth - this.totalWidthSplitted) {

                        this.totalWidthSplitted += splitGroupWidth[1];
                        this.splitGroupCols[splitGroupWidth[0]].forEach(c => {
                            this.colsToSplit.push(c);
                            c.czresponsive._toBody = true;
                            c.czresponsive._line = c.czresponsive.line;
                            c.czresponsive._position = c.czresponsive.position;

                        }, this);

                    }
                }, this)
            }
        },

        calcMeasures: function () {

            this.colsConfigs = [];

            this.totalColumnsWidth = 0;

            this.grid.getColumns().forEach(c => {

                let cfg = c.czresponsive || {};

                cfg._toBody = false;

                // Column width.
                let colWidth;

                // colWidth calculation.
                if (cfg._colWidth === undefined) {

                    // Get the width default.
                    colWidth = c.getWidth();
                    if (colWidth === null) {
                        // Or min width if the width is not defined.
                        colWidth = c.getMinWidth();
                    }

                    // If is a css expresion like 3em, calculate t
                    // the width in pixels.
                    if (!Ext.isNumber(colWidth)) {
                        this.el.setStyle("width", colWidth);
                        colWidth = this.el.getSize().width;
                        this.el.setStyle("width", null);
                    }

                    // If was impossible to calculate the width, get the actual width.
                    if (colWidth === null)
                        colWidth = c.getSize().width;

                    // Assign the width to one column private variable.
                    cfg._colWidth = colWidth;
                }


                // Label width.
                if (cfg._labelWidth === undefined) {

                    let labelWidth = cfg.labelWidth;

                    if (labelWidth === undefined) {

                        let label = cfg.label === undefined ? c.getText() : cfg.label;
                        cfg._labelWidth = this.elTmLabels.getWidth(label) + this.getLabelWidthMargins();
                        //console.log(`${label} : ${cfg._labelWidth}`)

                    } else {

                        if (!Ext.isNumber(labelWidth)) {
                            let label = cfg.label === undefined ? c.getText() : cfg.label;
                            this.elLbl.setStyle("width", labelWidth);
                            cfg._labelWidth = this.elTmLabels.getWidth(label);
                            this.elLbl.setStyle("width", 'auto');
                        } else {
                            cfg._labelWidth = labelWidth;
                        }
                    }
                }


                // Value Width
                if (cfg._valueWidth === undefined) {

                    let valueWidth = cfg.valueWidth || cfg._colWidth;
                    if (!Ext.isNumber(valueWidth)) {
                        this.el.setStyle("width", valueWidth);
                        valueWidth = this.el.getSize().width;
                        this.el.setStyle("width", null);
                    }
                    cfg._valueWidth = valueWidth;
                }

                this.totalColumnsWidth += cfg._colWidth;

                c.czresponsive = cfg;

                cfg._column = c;
                this.colsConfigs[c.getDataIndex()] = cfg;

            }, this);
        },

        updateHideShowMenu: function () {

            if (this.grid.getColumnsMenuItem() !== null) {
                var columns = this.grid.getHeaderContainer().items.items,
                    items = [],
                    len = columns.length,
                    subMenu = this.grid.getColumnsMenuItem().getMenu(),
                    i, col;

                for (i = 0; i < len; ++i) {
                    col = columns[i];

                    if (col.getHideable()) {

                        let m = col.getHideShowMenuItem();
                        m.setChecked(!col.getHidden() || col._czShownInBody);

                        items.push(col.getHideShowMenuItem());

                    }
                }

                subMenu.removeAll(false);
                subMenu.add(items);
            }
        },

        parseStyle: function (style) {
            let hooks = Ext.dom.Element.prototype.styleHooks;

            if (typeof style === 'string') {
                return style;
            } else {

                let strStyle = "";
                let name;

                for (name in style) {

                    let n = name.replace(/[A-Z]/g, m => "-" + m.toLowerCase());

                    strStyle += n + ": " + style[name] + "; ";
                }

                return strStyle;
            }
        }
    }

})
;
