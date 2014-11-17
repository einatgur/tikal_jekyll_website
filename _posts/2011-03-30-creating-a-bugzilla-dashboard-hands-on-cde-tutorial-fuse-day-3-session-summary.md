---
layout: post
title: 'Creating a Bugzilla Dashboard – hands-on CDE Tutorial – Fuse Day #3 Session
  Summary '
created: 1301494418
author: udid
permalink: /incubator/creating-bugzilla-dashboard-–-hands-cde-tutorial-–-fuse-day-3-session-summary
tags:
- Incubator
- Pentaho
- OSBI
- Dashboard
- CDF
- CDE
---
<p>In a previous <a href="../../../../../../alm/step-step-beginners-guide-cdf-community-dashboard-framework">post</a> we have installed the Pentaho server and used CDF code to create a dashboard.</p>
<p style="margin-right: 1.78in; margin-bottom: 0in;">In this post we will develop another dashboard for Bugzilla using CDE - the Dashboard Editor..</p>
<!--break-->
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">Here is what we are going to build:</p>
<p style="margin-bottom: 0in;"><img height="348" width="600" src="{% asset_path default/Screen-shot-2011-03-25-at-11_19_33-PM.png %}" alt="" /></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The data for the dashboard is coming from Bugzilla on Tikal ALM suite testing environment using <a href="../../../../../../java/software-quality-%E2%80%93-os-bi-bugzilla-%E2%80%93-now-pentaho-30">SQR</a>.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Installing CDE to bi-server is simple (see previous post for pentaho quick installation notes):</p>
<pre title="code" class="brush: java;">
$ wget cdf-de.googlecode.com/files/CDE-bundle-1.0-RC3.tar.bz2
$ tar xjvf CDE-bundle-1.0-RC3.tar.bz2</pre>
<pre title="code" class="brush: java;">
$ rm -rf biserver-ce/pentaho-solutions/system/pentaho-cdf biserver-ce/pentaho-solutions/cdf 
$ cp -rf CDE-bundle-1.0-RC3/* biserver-ce/pentaho-solutions/</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>CDE makes Dashboard development as easy as 1-2-3</p>
<ol>
    <li>
    <p style="margin-bottom: 0in;">The Layout (view)</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">The Components (controller)</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">The Data sources (model)</p>
    </li>
</ol>
<p>&nbsp;</p>
<p class="rtecenter"><img height="66" width="602" src="/files/01CDE.png" alt="" /></p>
<p>&nbsp;</p>
<p>Step 1: The Layout</p>
<p>&nbsp;</p>
<p>The layout of a dashboard in CDE is done with a hierarchy of rows and columns (each one is a html &lt;div/&gt; tag on the CDF layer)</p>
<p>The layout editor toolbar allows you to save and load templates, add resources (css/js), add rows and columns, add images, add html, reorder and delete.</p>
<p class="rtecenter">&nbsp;</p>
<p class="rtecenter"><img height="486" width="484" src="/files/03Layout.png" alt="" /></p>
<p class="rtecenter">&nbsp;</p>
<p>As you can see in the final result we will need a header, a body and a footer; and in the body we'll need a filter panel and another panel to hold the line chart, the bar chart and the pie chart.</p>
<p>&nbsp;</p>
<p>Step 2: The Components</p>
<p>The list of available components is impressive, charts are based on the CCC project which is based on <a href="http://vis.stanford.edu/protovis/">Protovis</a> which is based on SVG, you can find the regular line, bar, pie and you can render any diagram based on Protovis, <a href="http://raphaeljs.com/ ">Rephael</a> and <a href="http://www.tikalk.com/flex/open-flash-charts-ofc2-y-axis-label-cutoff-fixed-swf-attached-download">OFC</a>.</p>
<p>&nbsp;</p>
<p>Additional components (under Others section) include simple HTML elements such as texts, tables, and buttons as well as the BI platform services such as PRD reports, PDI generated content and xaction services.</p>
<p class="rtecenter">&nbsp;</p>
<p class="rtecenter"><img src="/files/04ComponentsPick.png" alt="" /></p>
<p class="rtecenter">&nbsp;</p>
<p class="rteleft">For our exercise we use:</p>
<ul>
    <li>two parameters: one to select 	issue-type and the second to select project</li>
    <li>two selectors: one for each 	parameter</li>
    <li>three charts: line chart, bar 	chart and pie chart</li>
    <li>one text description</li>
</ul>
<p>&nbsp;</p>
<p class="rtecenter"><img src="/files/05Components.png" alt="" /></p>
<p>&nbsp;</p>
<p>Lets look at the line chart component definition as an example:</p>
<p class="rtecenter">&nbsp;</p>
<p class="rtecenter"><img height="407" width="395" src="/files/06Line.png" alt="" /></p>
<p class="rtecenter">&nbsp;</p>
<p>It uses data from line1datasource, it is dependent on the two parameters which means that the parameter values will be passed in the query to the datasource, it listens on the two parameters which means that whenever a parameter changes value the chart component will be refreshed and finally it has an htmlObject code of line1 which determines which div in the layout it is going to occupy.</p>
<p>&nbsp;</p>
<p class="rtecenter"><img height="256" width="400" src="/files/07Selector.png" alt="" /></p>
<p>&nbsp;</p>
<p>The select component is mapped to the parameter which means that the selects will change the value of the parameter and will trigger all listeners, the selector options are generated by a datasource which will be demonstrated shortly.</p>
<p>&nbsp;</p>
<p class="rtecenter"><img src="/files/08Desc.png" alt="" /></p>
<p>&nbsp;</p>
<p>The text component uses simple JS to generate the text dynamically.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: jscript;">
function(){ return &quot;Showing &quot; + filter1param + &quot; &quot; + filter2param } </pre>
<p>&nbsp;</p>
<p>Step 3: The Datasource</p>
<p>CDE data access is based on CDA, there are way to many cool features to mention all here but alternatives include: SQL, MDX, MQL, XPATH, PDI, xaction, JS, ...</p>
<p>&nbsp;</p>
<p class="rtecenter"><img height="453" width="239" src="/files/09DSPick.png" alt="" /></p>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>We have 5 queries (two for the parameter selectros and three for the charts):</p>
<p>&nbsp;</p>
<p class="rtecenter"><img height="203" width="319" src="/files/10DS.png" alt="" /></p>
<p>&nbsp;</p>
<p>The data-source definition looks like this:</p>
<p>&nbsp;</p>
<p class="rtecenter"><img height="432" width="400" src="/files/11Query.png" alt="" /></p>
<p>&nbsp;</p>
<p>Thats all, the CDF generated code is attached.</p>
<p>&nbsp;</p>
<p><strong>Conclusion</strong></p>
<p>Using the right tool for the job makes life easier and merrier.</p>
<p>&nbsp;</p>
<p>Big thanks to the Pentaho community and to <a href="http://www.webdetails.pt">Pedro Alves</a> for leading CDE/CCC/CDF/CDA development and support.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>&nbsp;</p>
