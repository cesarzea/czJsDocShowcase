<div markdown class="margin900">

# Markdown extensions

czJsDocShowcase uses the library Showdown <a href="http://showdownjs.com/" target="_blanc">http://showdownjs.com/</a> to convert your markdown files to HTML.

:>[c=blue][i=fa-exclamation-triangle]Please, read the showdown documentation (https://github.com/showdownjs/showdown) to understand how to write your markdown files and complements.
:>
:>The official documentation about the Showdown extensions can be read here: <a href="https://github.com/showdownjs/showdown/wiki/extensions" target="_blanc">https://github.com/showdownjs/showdown/wiki/extensions</a>

In that czJsDocShowcase documentation and examples you have an example of an markdown extension which extends the Showdown syntax for creating blockquoted with color and icons.

That extensions is included adding their JavaScript file in the scriptsToLoad array of the czJsDocShowcaseConfig.js file:

```javascript
    /**
     * scriptsToLoad: an Array of JavaScripts files to be loaded at start up.
     */
    scriptsToLoad: [

        /**
         * An example of how to extend the markdown syntax.
         */
        '../data/extend/markdown_extend.js',

```

And the CSS definition in the stylesToLoad array of the czJsDocShowcaseConfig.js file:

```javascript
    /**
     * stylesToLoad: one array with a list of css files you want to be loaded at start up.
     * That is very useful to change the the appearance of the presentation, create
     * new markdown style elements, the style of new plugins, etc.
     */
    stylesToLoad: [
        ...    
        '../data/extend/markdown_extend_blockquotes.css',
        ...
    
```

Here is the example extension developed for that documentation to inspire your works: 

<pre data-src='../data/extend/markdown_extend.js'></pre>

</div>