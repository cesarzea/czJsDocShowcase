<div markdown style="padding: 20px; max-width: 900px; margin: auto; border-left: 1px solid lightgrey !important; border-right: 1px solid lightgrey !important;">
# Configuration. The simple way.

## Defining the possible splits

The configuration is very simple. The different groups of columns that can be displayed in the body of the rows will be defined in the 'splits' config variable. czResponsiveGrid will take care of the rest. It will calculate the width of each group, and the width of the resulting columns to show the best option in each case.

> All you have to do is:
>- Make sure that all the columns of your grid have defined width and / or minWidth.
>- Add this plugin to your grid.
>- Define the possible splits in the configuration variable 'splits'.
>- Test and adjust its configuration in some columns as indicated in this document.
>- And if you have a problem, contact me.

This example shows the config [splits] of the grid shown bottom, highlighting with a gray background the split that the grid is currently showing. Change the width of the grid moving the vertical bar of the resizer element, and you will see the active split change.
</div>

<div id="example3"></div>
<img src="../data/docImages/blank.gif" onload="
   Ext.create({ 
    xtype: 'examples.splitsExample', 
    border: false,
    height: 800,
    renderTo: 'example3' })
"/>

<center><a style="text-decoration: none;font-size: 1em;font-weight: bold;color: white;background-color:  #00435e;padding: 10px;" href="./?view=examples.splitsExample" target="_blank">View the czResponsiveGrid in full screen</a></center>


<div markdown style="padding: 20px; max-width: 900px; margin: auto; border-left: 1px solid lightgrey !important; border-right: 1px solid lightgrey !important;">

> [Read more about the 'splits' config](#doc/splits)

## Particular column settings

czResponsibleGrid takes the necessary information from the column configuration to display the data, but sometimes it is convenient that the label, the value, or the width of the value or the label to be different in some columns when they are displayed in the row body.

Here are an example on how to specify it in the column configuration:

```javascript
...
{
    xtype: 'datecolumn',
    text: 'Died Date',
    dataIndex: "died",
    align: 'center',
    width: '7.5em',
    czresponsive: {
        value: '{died:date("m-d-Y")}',
        label: 'Died',
        labelWidth: '5em',
        valueWidth: '7em'
    }
},
...

```

# Documentation

You can see all the actual czResponsiveGrid documentation the left panel, if your screen width is big enought. Otherwise, please click on the three bars icon (<i class='fas fa-bars' style='background-color: #00435e; color: white; padding: 5px; margin: 10px 10px;'></i>) that appears in the top left corner.


</div>