---
layout: post
title: Maven EJB Plugin - ejb client generation-tip
created: 1288566746
author: hagzag
permalink: "/devops/maven-ejb-plugin-ejb-client-generation-tip"
tags:
- DevOps
- weblogic
---
<p>One of the developers on my Team came up to me with the folloing scenario, whilst deploying module a webapps to weblogic, one of them would not deploy due to an error &quot;could not istantiate DataSource &lt;datasource name&gt;&quot; ... altough this DataSource isn't declared in that specific app.</p>
<p>&nbsp;</p>
<p>It could be I am pointing out the obvious, altough If I'm not the following should save you some time.</p>
<p>I am mentioning this for on a large Cluster like ours  which consists fo several machines, build &amp; deploy lifecycle can take  over an hour-three depends on the environmens site &amp; location (automation or not ...), so why spend valuable time on it ?</p>
<p>&nbsp;</p>
<p><u><strong>Scenario</strong></u>:</p>
<p>We have a cluster utilizing several layers, In order for layer A to interact with layer B an ejb client is built as part og B.ear, the ejb module naturally generates an ejb-client with the <a href="http://maven.apache.org/plugins/maven-ejb-plugin">Maven-EJB-Plugin</a>, the ear is compiled and good to go (Well there are no compliation errors ...), in runtime whilst deploying layer B (B.ear for exmaple which includes a-ejb.cleint.jar) starts to look for a data source which is included in the WEB_INF of B.ear, due to the existence of A-ejb-cleint.jar, alrough module B isn't aware A layer exists - This above scenario is cause due to a minor &quot;glitch&quot; in configuration, I call it minor because you really need to exclude one file to make this issue go away see below:</p>
<p>&nbsp;</p>
<p>Whilst generating the a-ejb-cleint.jar one needs to execlude any Datasource declarations in the client for it doesent need to access it. The presistence / Datasource declaraiotn is only relevant to A.ear itself - or we would not need a client but the EJB itself - right ???</p>
<p>&nbsp;</p>
<p><u><strong>Solution</strong></u>:</p>
<p>In order to generate a client you would configure <a href="http://maven.apache.org/plugins/maven-ejb-plugin">Maven-EJB-Plugin</a> like so:</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
 [...]
  &lt;build&gt;
    [...]
    &lt;plugins&gt;
      &lt;plugin&gt;
        &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
        &lt;artifactId&gt;maven-ejb-plugin&lt;/artifactId&gt;
        &lt;version&gt;2.3&lt;/version&gt;
        &lt;configuration&gt;
          &lt;!-- this is false by default --&gt;
          &lt;generateClient&gt;true&lt;/generateClient&gt;
        &lt;/configuration&gt;
      &lt;/plugin&gt;
    &lt;/plugins&gt;
    [...]
  &lt;/build&gt;
  [...]</pre>
<p>&nbsp;</p>
<p>Whilst in order to make sure the client doesn't include the presistence.xml (which stores the Datasource decleration of module A you should Exclude the presistence.xml file like so:</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
  [...]
  &lt;build&gt;
    [...]
    &lt;plugins&gt;
      &lt;plugin&gt;
        &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
        &lt;artifactId&gt;maven-ejb-plugin&lt;/artifactId&gt;
        &lt;version&gt;2.3&lt;/version&gt;
        &lt;configuration&gt;
          &lt;clientExcludes&gt;
             &lt;clientExclude&gt;WEB_INF/presistence.xml&lt;/clientExclude&gt;
          &lt;/clientExcludes&gt;
        &lt;/configuration&gt;
      &lt;/plugin&gt;
    &lt;/plugins&gt;
    [...]
  &lt;/build&gt;
  [...]
</pre>
<p>&nbsp;</p>
<p>Again I hope this was clear / useful.</p>
