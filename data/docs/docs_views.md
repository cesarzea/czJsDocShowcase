<div markdown class="margin900">

# Docs Views

Document Views define how to display documents or documentation elements, as well as the functionalities that are included in those views.

czJsDocShowcase allows defining new ways of displaying information and creating new functionalities by including external files that redefine the types of existing Document Views or create new types of Document Views.

Soon, more detailed information on how to do it will be included in this documentation, with some examples or extensions, although for the moment, you can also learn to extend or modify czJsDocShowcase with the creation or modification of the Document Views, taking into account the following:

- The current existing Document Views can be found at: czJsDocShowcase/app/docViews. Access the project's GitHub repository and see how the code is implemented.
- Create .js files that overwrite those classes, or create new ones based on the included files.
- Add these files to the czJsDocShowcase adding them in the 'scriptsToLoad' array of the czJsDocShowcaseConfig.js file.

As example has been included and override that show a button in the markup files showing the content of the markdown file. That override is in the file '../data/docViews/MarkdownFileViewerController.js'.

<pre data-src='../data/docViews/MarkdownFileViewerController.js'></pre>

</div>