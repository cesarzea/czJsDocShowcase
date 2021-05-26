<div markdown class="margin900">

# Docs Parsers 

Document Parsers transform each type of input in the 'docsToLoad' array of the czJsDocShowcase.js file into the information elements that are displayed in the content tree.

Each type of docsToLoad input (currently, namespace, markdown, or czjsdoc) is processed by its corresponding parser, which must be called with an xtype or alias that begins with the name of the type followed by 'Reader'. Thus, the current parsers are:

- Markdown parser: markdownReader.
- Namespace parser: namespaceReader.
- Parser from czjsdoc: czjsdocReader.

Override or define new parsers and include them in the scriptsToLoad array of the configuration file to activate them. You can learn how to implement them by viewing the currently implemented ones, which can be found in: czJsDocShowcase / app / docProcessors

Access the project's GitHub repository to check these files.

</div>