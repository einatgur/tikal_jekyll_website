---
layout: post
title: Jenkins the software development framework for everyone [ JUC 2014 Hertzlia
  - overview ]
created: 1405764835
author: hagzag
permalink: "/devops/JUC-2014-Hertzlia-overview"
tags:
- DevOps
- JUC
- jenkinsconf
- jenkins-ci
- jenkins
- Continuous Delivery
- Continuous Deployment
- Continuous Integration
---
<p>Hi all,</p>

<p>Before I start I would like to say it was overwhelming to see that&nbsp;<em>Kohsuke Kawaguchi</em>, <em>Heath Dorn </em>and all other&nbsp;participants who took the trip to ISRAEL&nbsp;inspite of the delicate situation, took&nbsp;the time to participate in this event. And&nbsp;apart of a short distruption @ 09:15 it was a quite&nbsp;day for the Hertzliya area ...</p>

<p>This blog post is to serve as my JUC summary (Worth noting: this summary wasn&#39;t sponsered / ordered by any company and reflects my personal take of Jenkins and the Jenkins user conference.)</p>

<p><img alt="" src="{% asset_path default/jenkins-herzlia-2014.jpg %}" style="width: 466px; height: 72px;" /></p>

<p><strong>The what (what is this guy talking about ?)</strong></p>

<p>I have to say I had an&nbsp;epiphany this week in the <a href="http://www.cloudbees.com/jenkins-user-conference-2012-israel.cb">JUC Hertzlia</a>, Jenkins or Jenkins-ci as&nbsp;suggested&nbsp;in it name / domain name, isn&#39;t just a build server, its a <strong>Software Development Framework</strong>, it does much more than invoke your favorite build tool ... and give me a chance to explain ...</p>

<p>In past years I used to refer to Jenkins (&amp; Hudson) as &quot;<em>a fancy cron</em> <em>job</em>&quot; (hope I didn&#39;t offend anyone ...), but witnessing such a&nbsp;vast adoption and hearing from many companies about how they use Jenkins to drive their business makes me use this term &quot;<strong><em>framework</em></strong>&quot; because you can literally mold Jenkins into anything you want ... and the&nbsp;<strong><em>for everyone</em></strong> part is to point our its not only for java as many people used to think ... it is really a multi purpose <em><strong>software development framework</strong></em> which empowers our businesses.</p>

<p>I have just recently completed an Audit for one of my customers @ Tikal, which are using Jenkins to deploy their product into test,&nbsp;pre-prod &amp; prod utilizing tools like <em><strong>mcollective</strong></em>, <em><strong>chef</strong></em> etc, it&#39;s not all about CI anymore ! (KK I suggest a rename), Jenkins is much much more than CI!, the reason I refer to it as a <em>framework</em>, is that there are many more usages to Jenkins which never came to mind until you participate in these conferences - A huge&nbsp;thanks to <a href="http://www.jfrog.com/">Jfrog</a> &amp; <a href="http://www.cloudbees.com/">Cloudbees</a> for making it happen. I see companies using Jenkins to trigger backup &amp; restore procedures, spin up servers / autoscale (in production) and many more crazy ideas. This is due to the flexibility in Jenkins&#39;s design, ease of use and extensibility - there are over <strong>900 plugins</strong> to Jenkins. If you need to make Jenkins do something it doesn&#39;t already do -&gt; let&#39;s write a plugin for it ... And&nbsp;thanks to the design and the tooling offered by the Jenkins community&nbsp;that makes all this possible.</p>

<p><strong>The why / how - my JUC Hertzlia summary ...</strong></p>

<p>The&nbsp;<em>epiphany -&gt;&nbsp;</em>In the last 3 JUC&#39;s in ISRAEL (this year was the 4th), I gave a talk on Jenkins and how I use it in the&nbsp;many projects I participate/d in, and this year I felt I have nothing new to say ... and then without noticing and hearing the different talks I noticed I was so wrong (yes I am not always right ;)) ..., Jenkins is the enabler of many processes we implement into our workflow. In <a href="http://prezi.com/u4zb3h6s5vql/devops-4-devlopers/">JUC 2012 presentation</a>&nbsp;I referred to Jenkins as the &quot;<u>conveyor of business</u>&quot; driving our software from concept to production utilizing maven, chef and open-stack and I was happy to see that the talks we witnessed both in 2013 and 2014 are exactly where the&nbsp;<strong>Jenkins framework</strong> is going, you can see plugins &amp; processes which refer to Jenkins as the business enabler, it is now a mission critical system not just a &quot;backend&quot; system used by development.</p>

<p>JUC Hertzlia a had a few great talks by quite a few companies which are all saying how great Jenkins and its&nbsp;<span style="color: rgb(0, 0, 0); font-family: 'trebuchet ms', sans-serif; line-height: normal;">ecosystem</span> are. Creator &amp; maintainer of Jenkins&nbsp;<strong><a href="http://www.cloudbees.com/company-team.cb#KohsukeKawaguchi">Kohsuke Kawaguchi</a>&nbsp;</strong><span style="line-height: 1.6em;">shared the roadmap and a few plugins he was able to reach in order to talk about.&nbsp;As I recall KK himself said he apologizes but these are the plugins he was able to reach in order to talk about and he hopes no one was offended because he didn&#39;t talk about their plugin ..., this reminds me two years ago in 2012 JUC when I talked about the Jenkins Multijob plugin where KK said I had no idea you guys were developing it ;). These are the reasons I call Jenkins a framework is it doing so much and being used in so many ways it is hard to keep track of it.</span></p>

<p>One slide which caught my eye was the following one:</p>

<p><img alt="" src="{% asset_path default/Leaderboard-1.jpg %}" style="width: 600px; height: 425px;" /></p>

<p>Taken from -&gt; <a href="http://pages.zeroturnaround.com/Java-Tools-Technologies.html?utm_source=Java%20Tools%20&amp;%20Technologies%202014&amp;utm_medium=allreports&amp;utm_campaign=rebellabs&amp;utm_rebellabsid=88">this link</a> and although&nbsp;this slide is very Java oriented (J rebel ...), I think that it gives a clear picture of what is going on in the Java Enterprise market and can reflect on other segments, the numbers may differ give or take 5-10%, which is quite impressive.</p>

<p><a href="http://www.cloudbees.com/company-team.cb#KohsukeKawaguchi">Kohsuke Kawaguchi</a> The Keynote speaker gave the opening and closing talks describing the main project focus which is on <a href="https://github.com/jenkinsci/workflow-plugin">workflow</a> and improving slave connectivity of both JNLP and SSH slaves basically improving they &quot;reporting&quot; capabilities between the master and slave, In addition &quot;out sourcing&quot; / sharing the Jenkins infrastructure testing, One of the pains I have had in a few projects is testing a Jenkins upgrade In one of my previous projects we came up with a set of shell scripts which did that in a very inefficient way, and I think being able to utlize the &quot;Jenkins official integration testing suite&quot; will drive stability into the upgrade lifecycle of Jenkins and perhaps enable us to be less conservative with LTS releases and using more and more cutting edge releases (latest).</p>

<p><img alt="" src="{% asset_path default/oops-jenkins.png %}" style="width: 40px; height: 47px; margin-left: 5px; margin-right: 5px; float: left;" /><span style="line-height: 1.6em;">&nbsp;</span><img alt="" src="{% asset_path default/happy-jenkins.png %}" style="width: 35px; height: 48px; margin-left: 5px; margin-right: 5px; float: left;" /><span style="line-height: 1.6em;">In continuation to that topic (&quot;testing upgrades&quot;) there is&nbsp;</span><em style="line-height: 1.6em;"><strong>Evgeny Zilslis</strong></em><span style="line-height: 1.6em;">&nbsp;who presented a different approch explaining how jenkins&nbsp;should become a&nbsp;</span><a href="http://martinfowler.com/bliki/PhoenixServer.html" style="line-height: 1.6em;"><strong><em>phonix&nbsp;server</em></strong></a><span style="line-height: 1.6em;">&nbsp;insted of a&nbsp;</span><a href="http://martinfowler.com/bliki/SnowflakeServer.html" style="line-height: 1.6em;"><b><i>snowflake server</i></b></a><span style="line-height: 1.6em;">&nbsp;using&nbsp;</span><em><strong><a href="https://github.com/opscode-cookbooks/jenkins" style="line-height: 1.6em;">chef jenkins cookbook</a></strong></em><span style="line-height: 1.6em;">&nbsp;</span><span style="color: rgb(0, 0, 255); font-family: 'trebuchet ms', sans-serif; line-height: normal;">Chef Software, Inc</span><span style="line-height: 1.6em;">&nbsp;(fomaly opscode),&nbsp;the only missing part in the puzzle for me was persistence, I have been doing something similar in one of my projects but the persistence of build/deployment logs is somthing which IMO is missing from Evgeny&#39;s solution. IMO the </span><em><strong><a href="https://github.com/Netflix/SimianArmy/wiki/Chaos-Monkey" style="line-height: 1.6em;">Chaos Monkey</a></strong></em><span style="line-height: 1.6em;">&nbsp;approch is awesome in order to assure the availability of Jenkins but the persistence is important and the problem with persistance is that we need a way of getting our&nbsp;&nbsp;</span><a href="http://martinfowler.com/bliki/PhoenixServer.html" style="line-height: 1.6em;"><strong><em>phonix jenkins server</em></strong></a><span style="line-height: 1.6em;">&nbsp;up from the ashes not only with it&#39;s configuration but with it&#39;s data also.</span></p>

<p>There is actually a pattern here we can see more and more of, which was also presented by <em><strong>Ohad Basan</strong></em> from RedHad who described their entire build pipeline using Jenkins and puppet utilizing pattens from the openstack approach of how to utilize Jenkins and achieve a deployment pipeline, Ohad mentioned the <a href="https://wiki.jenkins-ci.org/display/JENKINS/Build+Pipeline+Plugin">build pipeline</a> &amp; <a href="https://wiki.jenkins-ci.org/display/JENKINS/Multijob+Plugin">multijob</a> plugins and how the build pipeline plugin was more flexible considering it could trigger the same build with different parameters in the same execution.</p>

<p>The openstack approach should definitely be looked at when designing a CI &amp; CD solution and it&#39;s open -&gt;&nbsp;<a href="https://jenkins.openstack.org/">jenkins.openstack.org</a>&nbsp;&amp;&nbsp;<a href="http://ci.openstack.org/jenkins.html">ci.openstack.org/jenkins.html</a>.</p>

<p>Lastly unrelated to the main theme specified above there where three other notable talks:</p>

<ol>
	<li><span class="n fn" style="margin: 0px; padding: 0px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: inherit; vertical-align: baseline; font-variant: inherit; line-height: inherit;"><em><strong>Oren Katz</strong></em> from&nbsp;</span>Liveperson: using Jenkins to test infrastructure and update Ganglia monitor in order to enable their support desk to find issues before they become issues, quite impressive implementation, the only thing I was not clear about was the usage of <em><strong>rsync</strong></em> instead of<b><i>&nbsp;SCM.</i></b></li>
	<li><i><em><strong>Nir Koren</strong></em> from SAP:</i> I don&#39;t have this years presentation yet but there is his talk titled &quot;Quality on submit&quot; and <a href="http://www.slideshare.net/AgileSparks/nir-koren-qos?qid=22f1c81b-4986-47e3-b1e3-ed2b0daeeb6a&amp;v=qf1&amp;b=&amp;from_search=1">the slides</a>, Nir describes a process which is quite refreshing in a huge company (65,000 employees) like SAP and how Jenkins plays a key role in their development &amp; deployment processes.</li>
	<li><em><strong>Baruch Sadogursky</strong></em> from&nbsp;JFrog: using bintray to streamline your binaries, another great project (IMO) which enables you to freely store your binaries in the cloud for nothing also referred to &quot;<em><strong>Github for Binaries</strong></em>&quot;</li>
</ol>

<p>To conclude, there are quite a few approaches for how to use Jenkins and I hope this post / JUC summary might introduce a new term &quot;<em><strong>the Jenkins framework</strong></em>&quot;, Jenkins is a project to keep an&nbsp;eye on, for I am not sure if there is a limit to its grasp. Until next year&#39;s JUC ...</p>

<p>Over and out, (references below)</p>

<p>HP&nbsp;</p>

<p>References:</p>

<ol>
	<li>JUC Hertzlia: <a href="http://www.cloudbees.com/jenkins/juc-2014/herzliya">http://www.cloudbees.com/jenkins/juc-2014/herzliya</a></li>
	<li>Cloudbees:&nbsp;<a href="http://www.cloudbees.com/">http://www.cloudbees.com/</a></li>
	<li>JUC 2012 presentation<a href="http://prezi.com/u4zb3h6s5vql/devops-4-devlopers/">http://prezi.com/u4zb3h6s5vql/devops-4-devlopers/</a></li>
	<li>Jenkins / jrevel statistics:&nbsp;<a href="http://pages.zeroturnaround.com/Java-Tools-Technologies.html?utm_source=Java%20Tools%20&amp;%20Technologies%202014&amp;utm_medium=allreports&amp;utm_campaign=rebellabs&amp;utm_rebellabsid=88">this link</a></li>
	<li>Phonix&nbsp;server<em>&nbsp;</em><a href="http://martinfowler.com/bliki/PhoenixServer.html">http://martinfowler.com/bliki/PhoenixServer.html</a></li>
	<li>Snowflake server <a href="http://martinfowler.com/bliki/SnowflakeServer.html">http://martinfowler.com/bliki/SnowflakeServer.html</a></li>
	<li>Chef Jenkins cookbook <a href="https://github.com/opscode-cookbooks/jenkins">https://github.com/opscode-cookbooks/jenkins</a></li>
	<li>Chaos Monkey <a href="https://github.com/Netflix/SimianArmy/wiki/Chaos-Monkey">https://github.com/Netflix/SimianArmy/wiki/Chaos-Monkey</a></li>
	<li>workflow plugin:&nbsp;<a href="https://github.com/jenkinsci/workflow-plugin">https://github.com/jenkinsci/workflow-plugin</a></li>
	<li>Openstack&#39;s jenkins instance: <a href="http://jenkins.openstack.org/">http://jenkins.openstack.org/</a></li>
	<li>Openstakcs ci spec:&nbsp;<a href="http://ci.openstack.org/jenkins.html">http://ci.openstack.org/jenkins.html</a></li>
	<li>Delivery pipeline plugin: <a href="https://wiki.jenkins-ci.org/display/JENKINS/Delivery+Pipeline+Plugin">https://wiki.jenkins-ci.org/display/JENKINS/Delivery+Pipeline+Plugin</a></li>
	<li>MultiJob plugin:&nbsp;<a href="https://wiki.jenkins-ci.org/display/JENKINS/Multijob+Plugin">https://wiki.jenkins-ci.org/display/JENKINS/Multijob+Plugin</a></li>
</ol>

<p>&nbsp;</p>
