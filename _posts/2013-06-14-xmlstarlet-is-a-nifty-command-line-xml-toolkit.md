---
layout: post
title: 'xmlstarlet is a nifty Command Line XML Toolkit '
created: 1371190642
author: hagzag
permalink: /devops/xmlstarlet-nifty-command-line-xml-toolkit
tags:
- DevOps
- XML
- xpath
- xmlstarlet
- cli
- shell
- jenkins
---
<p>So, I was writing a post on jenkins-cli and mentioned how to create jobs from CLI using tools like xmlstarlet [ in adition to others ] - and it felt as if I am drifting off topic (ans it&#39;s starting to happen here too so ... ), so I cam up with this post showing some of the great power this tool has</p>
<p>xmlstarlet is a nifty tool to work with on xml xpaths - iv&#39;e been using it for various tasks in the last 2-3 years,</p>
<p>In our exmaple in order to get the scmurl xpath you can do sothing like the following:</p>
<pre>
curl -s ${JENKINS_URL}/job/${JOB_NAME}/config.xml -u youruser:yourpasswd | xmlstarlet el -a</pre>
<p>So this section in the xml is actually:</p>
<p><img alt="scm url in config.xml" src="{% asset_path default/upload/29/in_job_config_xml.png %}" /></p>
<pre>
project/scm/locations/hudson.scm.SubversionSCM_-ModuleLocation/remote</pre>
<p>So all I have to so is insert / esit the xml file and create the new job:</p>
<pre>
xmlstarlet ed -O -S -P -u //project/scm/locations/hudson.scm.SubversionSCM_-ModuleLocation/remote -v &quot;${scm_url}&quot;</pre>
<p>All wev&#39;e seen above is two usages of xmlstarlet which is as I mentioned 10% of what this tool can do - weve seen&nbsp;</p>
<ol>
	<li>
		xml xpath listing of an entire xml document: <em><strong>xmlstarlet el -a</strong></em></li>
	<li>
		xml editing: <em><strong>xmlstarlet ed -O -S -P -u</strong></em> well xml updating to be exact [ <em><strong>-u</strong></em> ]</li>
</ol>
<p>Feel free to get this tool on your favorite OS</p>
<p class="rteindent1">Ubutnu:</p>
<pre class="rteindent1">
sudo apt-get install xmlstarlet</pre>
<p class="rteindent1">RH/CENTOS/Fedora<br />
	Download the latest epel-release rpm from http://dl.fedoraproject.org/pub/epel/${ver}/${arch} Install epel-release rpm:</p>
<pre class="rteindent1">
rpm -Uvh epel-release*rpm</pre>
<p class="rteindent1">Install xmlstarlet rpm package:</p>
<pre class="rteindent1">
yum install xmlstarlet</pre>
<p><b>Enjoy</b> this toolkit - I love it :)</p>
