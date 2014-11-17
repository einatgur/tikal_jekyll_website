---
layout: post
title: Anouncing the release of Saiku 2.0 - Next Generation Open Source Analytics
created: 1303831751
author: udid
permalink: /devops/anouncing-release-saiku-20-next-generation-open-source-analytics
tags:
- DevOps
- Pentaho
- OSBI
- OLAP
---
<p>For some quite time, the Pentaho community (<span class="tweet-user-name"><span class="tweet-full-name">specifically Tom Barber and </span></span><span class="tweet-user-name"><span class="tweet-full-name">Paul</span></span><span class="tweet-user-name"><span class="tweet-full-name"> St&ouml;llberger) is talking about a new web UI for data analysis (OLAP slice-n-dice) and after a few month of hard work they have released version 2.0 of <a href="http://analytical-labs.com/">Saiku</a> and it is fully integrated with Pentaho.</span></span></p>
<p>&nbsp;</p>
<!--break-->
<p>&nbsp;</p>
<p><img width="641" height="312" alt="" src="{% asset_path default/Screen-shot-2011-04-26-at-5_15_17-PM.png %}" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Installation takes less than 10 minutes:</p>
<p>&nbsp;</p>
<p>First download Saiku plugin and war file</p>
<pre class="brush: jscript;" title="code">
$ wget ci.analytical-labs.com/jenkins/job/saiku-plugin/lastStableBuild/artifact/saiku-bi-platform-plugin/target/saiku-plugin-2.0-SNAPSHOT.zip
$ wget ci.analytical-labs.com/jenkins/job/saiku-webapp/lastStableBuild/artifact/saiku-webapp/target/saiku-webapp-foodmart-2.0-SNAPSHOT.war
</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">Next we'll install the plugin and war file</p>
<pre class="brush: jscript;" title="code">
$ unzip saiku-plugin-2.0-SNAPSHOT.zip
$ mv saiku biserver-ce/pentaho-solutions/system/
$ mv saiku-webapp-foodmart-2.0-SNAPSHOT.war biserver-ce/tomcat/webapps/saiku.war
</pre>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Installation is done, you'll have to start the bi-server for the war to be deployed (extracted) and than you can add your datasource(s) by creating a new file under biserver-ce/tomcat/webapps/saiku/WEB-INF/classes/saiku-datasources/</p>
<p style="margin-bottom: 0in;">I have configured Saiku to show the SQR cubes with this code:</p>
<pre class="brush: jscript;" title="code">
type=OLAP
name=SQR
driver=mondrian.olap4j.MondrianOlap4jDriver
location=jdbc:mondrian:Jdbc=jdbc:mysql://localhost/software_qa_rpt;Catalog=../../pentaho-solutions/software-quality/issues.mondrian.xml;JdbcDrivers=com.mysql.jdbc.Driver;
username=root
password=secret
</pre>
<p>&nbsp;</p>
<p><span class="tweet-user-name"><span class="tweet-full-name"> It seems to work flawlessly, please follow the link above for more screenshots, screencasts, docs, updates, issue tracking etc..</span></span></p>
