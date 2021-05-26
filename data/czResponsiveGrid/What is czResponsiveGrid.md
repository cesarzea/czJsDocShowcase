<div markdown class="margin900">

# Why czResponsiveGrid ExtJs Grid PlugIn

:>[i=fas fa-info] czResponsiveGrid has been completely developed by [**César Pedro Zea Gómez**](https://www.cesarzea.com), a **Sencha MVP**, to respond and solve the comment of a customer who questioned the Sencha grid responsive features.
:>
:> But above all, czResponsiveGrid is a powerful plug-in that contributes to the Sencha grid by providing responsive functionalities that will allow you to display your information without hidden columns due to lack of space, configuring it in the same way for any device, desktops or mobiles.
<center>
<a href="https://www.sencha.com" target="_blanc">
![Sencha](resources/images/Sencha-300px.svg =200emx*)
</a>
</center>

# What is the czResponsiveGrid ExtJs Grid PlugIn

Watch the following video to see what czResponsiveGrid does.

<video
id="my-video"
class="video-js"
controls
preload="auto"
width="700"
height="665"
data-setup="{}"
style="width: 100%; height: 665px"
>
    <source src="../data/docImages/responsive_21_full_str.mp4" type="video/mp4" />
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
      >
    </p>
</video>
<script src="https://vjs.zencdn.net/7.11.4/video.min.js"></script>

# Documentation

You can see all the actual czResponsiveGrid documentation the left panel, if your screen width is big enought. Otherwise, please click on the three bars icon (<i class='fas fa-bars' style='background-color: #00435e; color: white; padding: 5px; margin: 10px 10px;'></i>) that appears in the top left corner.

# The czResponsiveGrid plugin in action

## One Grid example with too many columns

This grid shows so many columns that either it has a very wide screen, or it will be impossible for you to see all the information without having to use the vertical scroll.


<div id="example1"></div>
<img src="../data/docImages/blank.gif" onload="
Ext.create({
        xtype: 'panel',
        layout: {
            type:'vbox',
            align: 'center'
        },
        width: '100%',
        renderTo: 'example1' ,
        items: [{
            xtype: 'examples.example1GridNoResponsive', 
            layout: 'fit',
            height: 400,
            maxWidth: 700,
            border: true,
            style: 'border: 1px solid #00435e;'
        }]
})
"/>

It's terrible for some apps and especially painful when they have to be usable on mobile devices.


## The same grid with czResponsiveGrid 

Below is the same grid where czResponsiveGrid has been added and configured to display the information consistently:

Resize the grid with the vertical bars in the grid borders to observe the behaviour.

</div>
<div id="example2"></div><img src="../data/docImages/blank.gif" onload="
   Ext.create({ 
    xtype: 'examples.example1', 
    width: '100%',
    border: false,
    height: 600,
    renderTo: 'example2' })"/>

<center><a style="text-decoration: none;font-size: 1em;font-weight: bold;color: white;background-color:  #00435e;padding: 10px;" href="./?view=examples.example1Grid" target="_blank">View the czResponsiveGrid in full screen</a></center>

<div markdown style="padding: 20px; max-width: 900px; margin: auto; border-left: 1px solid lightgrey !important; border-right: 1px solid lightgrey !important;">

:>[c=blue] Continue reading the [**How to Use it**](#doc/Guide>How%20to%20use%20it) guide.

</div>