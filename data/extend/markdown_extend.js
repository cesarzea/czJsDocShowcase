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
showdown.extension("myBlockQuotes", function () {
    'use strict';
    return [
        {
            type: 'lang',
            filter: function (text, converter, options) {

                var mainRegex = new RegExp("(:>.*([\\n]|$))+", "gm");

                text = text.replace(mainRegex, function (match, content) {

                    // Remove ths :> starting chars in each line.
                    match = match.replace(/^([ \t]*):>([ \t])?/gm, "");

                    // Obtain the class
                    let cls = '';
                    let startCls = match.indexOf('[c=');
                    if (startCls === 0) {
                        let endCls = match.indexOf(']');
                        if (endCls > 0) {
                            cls = match.substring(startCls + 3, endCls);
                            match = match.substring(endCls + 1);

                        }
                    }

                    //Obain the icon
                    let icon = '';
                    let startIcon = match.indexOf('[i=');
                    if (startIcon === 0) {
                        let endIcon = match.indexOf(']');
                        if (endIcon > 0) {
                            icon = match.substring(startIcon + 3, endIcon);
                            match = match.substring(endIcon + 1);
                        }
                    }

                    let foo = '<div class="markdown-content">' + converter.makeHtml(match) + '</div>';
                    if (icon !== '')
                        icon = "<div class='markdown-icon'><i class='fas " + icon + " fa-2x'></i></div>";

                    return '\n<div class="blockquote mark' + cls + '">' + foo + icon + '</div>\n';

                });

                return text;
            }
        }
    ]
});

czJsDocShowcase.app.converter.useExtension("myBlockQuotes");