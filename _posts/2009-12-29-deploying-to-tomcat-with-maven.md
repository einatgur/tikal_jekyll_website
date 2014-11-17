---
layout: post
title: Deploying to tomcat with maven
created: 1262129707
author: shalom
permalink: "/devops/deploying-tomcat-maven"
tags:
- DevOps
- maven tomcat deploy
---
<p>&nbsp;Hi<br />
<br />
Trying to echive something simple with maven can sometimes be frustraiting,<br />
We need to deploy a few web apps to tomcat and place them as exploded wars and jars in a file system directory and point to them with tomcat contexts.<br />
there is a <a href="http://github.com/Tikal-Fuse/maven-tomcat-deploy-sample">maven-tomcat-deploy-sample</a><qtlend></qtlend> that simulates the real structure of the sources,a very simple one, and solves part of the requirements, but we have still unsolved isuues and any help is most welcome.<br />
<br />
<br />
from the README:<br />
<br />
the sample is made of two main applications with submodules, kuku and kiki.<br />
<br />
the structure is:<br />
<br />
main-reactor -<br />
&nbsp;&nbsp;&nbsp; repo-parent - (parent afor all, declares repositories)<br />
&nbsp;&nbsp;&nbsp; main-parent - (parent for all sub modules,inherits repo-parent)<br />
&nbsp;&nbsp;&nbsp; tomcat-deploy - (module to install tomcat, inherits repo-parent)<br />
&nbsp;&nbsp;&nbsp; kiki-reactor -<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; kiki-core - (parent is main-parent)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; kiki-web - (parent is main-parent)<br />
&nbsp;&nbsp;&nbsp; kuku-reactor -<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; kuku-core - (parent is main-parent)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; kuku-web - (parent is main-parent)<br />
<br />
the reactors are only reactors.<br />
all sub module inherit main-parent.<br />
reactrors inherit each other from down up.<br />
<br />
what it tries to achieve:<br />
<br />
home -<br />
&nbsp;&nbsp;&nbsp; app -<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; lib -<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; all jars go here<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webapp -<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; all wars go here, exploded<br />
&nbsp;&nbsp;&nbsp; tomcat -<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; tomcat installed here<br />
<br />
&nbsp;<br />
<br />
Behaviour should be:<br />
deploy is by explicitly activating a deploy profile.<br />
if running maven from the top most reactor everything should be deployed.<br />
if tomcat does not exists it should be installed. echived partially.<br />
if running from a second level reactor everything under it should be deployed.<br />
if running a single module only it should be deployed.<br />
deployment includes all dependencies.<br />
all jars should go to the lib folder.<br />
all wars should go to the webapp folder, exploded.<br />
the exploded wars should not contain their dependencies under WEB-INF/lib. could not echive that with war:exploded.<br />
<br />
<br />
we would like:<br />
1) that dependencies are NOT copied more then once,<br />
&nbsp;&nbsp;&nbsp; for example all projects depend on log4j,it will be copied to the lib folder for every<br />
&nbsp;&nbsp;&nbsp; sub module, hopefully overriding each other with the same file.<br />
<br />
2) we don't want to touch every sub module pom,<br />
&nbsp;&nbsp;&nbsp; if a sub module is added it should be deployed automatically when invoking the deploy profile. the solution currentlly fulfils that.<br />
<br />
&nbsp;<br />
current implementation :<br />
all submodules inherit from main-parent.<br />
a 'deploy' profile in main-parent does the job of copying wars and jars to their<br />
&nbsp;&nbsp;&nbsp; deploy location.<br />
the profile overrides configuration of maven jar and war plugins to build the artifact to<br />
the deploy location instead of the default location. this results is no files under<br />
maven target, i have no idea what it can do to unit tests.<br />
a tomcat-deploy module installs tomcat, it is activated by edding it as module to the 'deploy' profile.<br />
<br />
if tomcat exists it should not be installed, tried to do that with a 'mising file' activation but it doesn't work, its always active.<br />
also , the tomcat-deploy module is only activated when we run maven from the top most reactor, not from other modules or reactors,<br />
the way it is now the first build must be done from the top most reactor so all sub modules are deployed and tomcat installed.<br />
<br />
this demo uses tomcat 5 from the central repo.<br />
<br />
to test run:<br />
change those properties to point to a home folder:<br />
&nbsp;&nbsp;&nbsp; main-parent:&nbsp;&nbsp; deploy.home<br />
&nbsp;&nbsp;&nbsp; tomcat-deploy: tomcat.install.location<br />
<br />
&nbsp;&nbsp;&nbsp; mvn clean install -Pdeploy<br />
<br />
&nbsp;</p>
