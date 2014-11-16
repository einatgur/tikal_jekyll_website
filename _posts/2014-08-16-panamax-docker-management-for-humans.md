---
layout: post
title: PanaMax - Docker Management for Humans
created: 1408200281
author: hagzag
permalink: "/devops/PanaMax_Docker_Management_4_Humans"
tags:
- DevOps
---
<div class="entry-content">
<p><img class="left" src="{% asset_path default/docker-logo-100x134.png %}" style="margin: 5px; border-width: 0px; border-style: solid; float: left;" title="'Docker logo'" /> As cool as Docker is there is quite a lot of stuff you need to start caring about, service discovery, orchestration, routing and so on, and there is a long line of technologies which help you achieve that, here is quite a long list just as an example:</p>

<ul>
	<li><a href="https://coreos.com/">CoreOS</a> &ndash; The orchestrator / Container host operating system comes prepackaged with <a href="https://www.docker.com/">Docker</a>, <a href="https://github.com/coreos/etcd">etcd</a> &amp; <a href="https://github.com/coreos/fleet">fleet</a></li>
	<li><a href="https://github.com/coreos/fleet">fleet</a> &ndash; A distributed init system paired with <a href="https://github.com/coreos/etcd">etcd</a> &amp; <a href="https://coreos.com/using-coreos/systemd">systemd</a></li>
	<li><a href="http://zookeeper.apache.org/">zookeeper</a>, <a href="https://github.com/lonnen/doozer">Doozer</a>, <a href="https://github.com/coreos/etcd">etcd</a>&ndash; share configuration across a cluster of servers (cluster manager)</li>
	<li><a href="https://flynn.io/">flynn</a> &ndash; A framework for building distributed systems in the past you might of heard of <a href="https://github.com/flynn/discoverd">discoverd</a> which is now part of flynn.</li>
	<li><a href="http://mesos.apache.org/">mesos</a>, <a href="https://github.com/GoogleCloudPlatform/kubernetes">Kubernetes</a>, <a href="http://openshift.github.io/geard/">geard</a>&ndash; cluster managers</li>
	<li><a href="http://www.fig.sh/">fig</a> &ndash; Orchestration of local development environments.</li>
	<li><a href="https://github.com/docker/libswarm">libswarm</a> &ndash; network services &ldquo;composer&rdquo; for containers.</li>
	<li><a href="https://github.com/crosbymichael/skydock">skydock</a> &ndash; Service Discovery for Docker.</li>
	<li><a href="https://github.com/progrium/ambassadord">ambassadord</a>, <a href="https://github.com/progrium/registrator">registrator</a>, <a href="https://github.com/progrium/consulate">consulate</a> &ndash; you will find these three work together in order to enable service registration and discovery / auto discovery for Docker containers, <a href="https://github.com/progrium/registrator">registrator</a> also uses <a href="http://www.consul.io/">consul</a> and <a href="https://github.com/coreos/etcd">etcd</a> in order to do that.</li>
	<li><a href="http://www.consul.io/">consul</a> &ndash; Built based on <a href="http://www.serfdom.io/">serf</a> a service discovery broker.</li>
	<li><a href="https://github.com/progrium/consulate">consulate</a> &ndash; another discovery service based on <a href="http://www.consul.io/">consul</a></li>
	<li><a href="https://github.com/progrium/configurator">configurator</a> &ndash; serve configuration files via REST API</li>
	<li><a href="https://github.com/progrium/registrator">registrator</a> &ndash; service registry bridge (a.k.a <a href="https://github.com/progrium/docksul">docksul</a>)</li>
</ul>

<p>And there is more (believe me I&rsquo;ve done my research &hellip;) If you need to spin up a single container you do not need all this stuff, but when you need to launch more than one container in order to bring your system up, and maybe span over more than 1 host you need a few of the tools listed above in order to achieve that. Looking at this list and knowing it is potentially mych longer &hellip; think how many tools you need to master in order to launch a POC &hellip; before you can start developing your system and develop a continuous delivery / deployment scheme for it !</p>

<h4>So how can you simplify the development life-cycle of a containerized solution / system ?</h4>

<p><img class="left" src="{% asset_path default/pmx_logo.png %}" title="'Panamax logo'" /> Panamax by <a href="http://www.centurylinklabs.com/">centurylinklabs</a> to the rescue. Panamax is (and I quote) a containerized app creator with an open-source app marketplace hosted in GitHub, I think the last bit is most important one the fact you can find on github a template of an existing &ldquo;containarized&rdquo; systems is awesome &ndash; very similar to the way you can share Docker files but here instead you get a <a href="http://www.fig.sh/">fig</a> file which describes your environment and &ldquo;tells&rdquo; your containers what to do, who to connect to etc. etc.</p>

<h3>About Panamax</h3>

<p><img class="left" src="{% asset_path default/coreos-100x100.png %}" style="width: 100px; height: 100px;" title="'CoreOs logo'" /> PanaMax is naturally based on CoreOs and has made some educated choices for example fleet and etcd which are shipped part of CoreOs, according to Lucas Carlson of <a href="http://www.centurylinklabs.com/">centurylinklabs</a> PanaMax will support other OS&rsquo;s and other orchestration frameworks in the future, as you may understand this was just released a few days ago (August 12 to be precise).</p>

<h4>Using Panamax</h4>

<p>After <a href="https://www.youtube.com/watch?v=15IKkYCfymk#t=434">installing PanaMax</a> and you have panamax up and running on your local machine you can search for existing systems as an example lets take the <a href="https://raw.githubusercontent.com/CenturyLinkLabs/panamax-public-templates/master/piwik.pmx">piwik exmaple</a> by searching in our local panamax ui via <a href="http://localhost:8888/">http://localhost:8888</a> (the default)<!-- more --></p>

<p><img class="left" src="{% asset_path default/panamax_search_piwik.png %}" style="height: 391px; width: 601px;" title="'piwik search'" /></p>

<p>Pressing the &ldquo;run template&rdquo; button will result in panamax parsing the pmx(fig) yaml file:</p>

<pre>
images:
- category: Web Tier
  name: Piwik
  source: cbeer/piwik
  description: Piwik web application
  type: Default
  ports:
  - host_port: 80
    container_port: 80
  links:
  - service: DB
    alias: db
- name: DB
  source: centurylink/mysql:5.5
  description: MySQL
  environment:
    - variable: MYSQL_ROOT_PASSWORD
      value: pass@word01
  ports:
  - host_port: 3306
    container_port: 3306
  category: DB Tier
  type: mysql
</pre>

<p><span style="line-height: 1.6em;">Then panamax will download the docker images from the section above in this example: </span><a href="https://registry.hub.docker.com/u/cbeer/piwik/builds_history/31636/" style="line-height: 1.6em;">cbeer/piwik</a><span style="line-height: 1.6em;"> &amp; </span><a href="https://registry.hub.docker.com/u/centurylink/mysql/builds_history/38801/" style="line-height: 1.6em;">centurylink/mysql:5.5</a></p>

<p><img class="left" src="{% asset_path default/panamax_run_piwik.png %}" style="width: 600px; height: 525px;" title="'piwik search'" /></p>

<p>Once the docker images are downloaded and spawn up you can examine the CoreOS Journal log and see exactly what occurred:</p>

<pre>
Aug 16 15:55:53 docker 140816 12:55:53 [Note] Server hostname (bind-address): &#39;0.0.0.0&#39;; port: 3306
Aug 16 15:55:53 docker 140816 12:55:53 [Note] - &#39;0.0.0.0&#39; resolves to &#39;0.0.0.0&#39;;
Aug 16 15:55:53 docker 140816 12:55:53 [Note] Server socket created on IP: &#39;0.0.0.0&#39;.
Aug 16 15:55:53 docker 140816 12:55:53 [Note] Event Scheduler: Loaded 0 events
Aug 16 15:55:53 docker 140816 12:55:53 [Note] /usr/sbin/mysqld: ready for connections.
Aug 16 15:55:53 docker Version: &#39;5.5.38-0ubuntu0.14.04.1-log&#39; socket: &#39;/var/run/mysqld/mysqld.sock&#39; port: 3306 (Ubuntu)
Aug 16 16:00:48 systemd Started Piwik web application.
Aug 16 16:00:49 docker Error response from daemon: No such container: Piwik
Aug 16 16:00:49 docker 2014/08/16 13:00:48 Error: failed to remove one or more containers
Aug 16 16:00:50 docker /usr/lib/python2.7/dist-packages/supervisor/options.py:295: UserWarning: Supervisord is running as root and it is searching for its configuration file in default locations (including its current working directory); you probably want to specify a &quot;-c&quot; argument specifying an absolute path to a configuration file for improved security.
Aug 16 16:00:50 docker &#39;Supervisord is running as root and it is searching &#39;
Aug 16 16:00:50 docker 2014-08-16 13:00:50,924 CRIT Supervisor running as root (no user in config file)
Aug 16 16:00:50 docker 2014-08-16 13:00:50,924 WARN Included extra file &quot;/etc/supervisor/conf.d/supervisord-apache2.conf&quot; during parsing
Aug 16 16:00:51 docker 2014-08-16 13:00:51,076 INFO RPC interface &#39;supervisor&#39; initialized
Aug 16 16:00:51 docker 2014-08-16 13:00:51,076 CRIT Server &#39;unix_http_server&#39; running without any HTTP authentication checking
Aug 16 16:00:51 docker 2014-08-16 13:00:51,076 INFO supervisord started with pid 1
Aug 16 16:00:52 docker 2014-08-16 13:00:52,098 INFO spawned: &#39;apache2&#39; with pid 11
Aug 16 16:00:53 docker 2014-08-16 13:00:53,315 INFO success: apache2 entered RUNNING state, process has stayed up for &gt; than 1 seconds (startsecs)</pre>

<p>As you recall CoreOs ships with fleet so you can basically run any fleet command and see what containers (units) are running on your system:</p>

<pre>
core@panamax-vm ~ $ fleetctl list-units
UNIT          STATE       LOAD    ACTIVE      SUB     DESC            MACHINE
DB.service      launched loaded   active       running      MySQL           0890a9ee.../10.0.2.15
Piwik.service       launched loaded   active       running      Piwik web application 0890a9ee.../10.0.2.15
jenkins_latest.service   launched loaded   deactivating stop-sigterm   -            0890a9ee.../10.0.2.15
</pre>

<figure class="code">&nbsp;</figure>

<p>Of course you can examine each image / service separately from the UI and see the container linking / exposed ports. <img class="left" src="{% asset_path default/panamax_service_piwik.png %}" style="width: 601px; height: 484px;" title="'piwik serviceh'" /></p>

<p>Same for the mysql image:<br />
you can see the container exposed ports, and system variables which are used by piwik to connect. <img class="left" src="{% asset_path default/panamax_service_mysql.png %}" style="width: 601px; height: 360px;" title="'piwik service'" /></p>

<p>The cool thing about panamax is &ldquo;forking&rdquo; a system by performing some changes and &ldquo;save as&rdquo; like so: <img class="left" src="{% asset_path default/panamax_save_changes.png %}" style="width: 600px; height: 263px;" title="'save as'" /></p>

<p><span style="line-height: 1.6em;">The first time you do this you will need to create a github token &ndash; make sure you have the following settings:</span></p>

<p><img class="left" src="{% asset_path default/github_app_token.png %}" style="height: 449px; width: 599px;" title="'github token'" /></p>

<p>Now I should choose my github repository and publish it &hellip; <img class="left" src="{% asset_path default/panamax_saveas.png %}" style="width: 600px; height: 709px;" title="'panamax save as'" /></p>

<p>And a few seconds later i have my own clone out there &hellip; <img class="left" src="{% asset_path default/github_my_fork.png %}" style="height: 403px; width: 601px;" title="'piwik fork'" /></p>

<h4>To summarize</h4>

<p>Panamax takes away a lot of headaches, it is quite user friendly and easy to share with your colleagues, The power of it being linked to Github is awesome (but may limit the usage for non github users). As you could see in this post the steps taken to create a template / clone a template, perform the application wiring (with fleet) was a few clicks &ndash; there is of course an API for panamax but I assume I will be able to discuss that only after I experiment a bit more with it. Two thumbs up for <a href="http://www.centurylinklabs.com/">centurylinklabs</a> putting together this great tool &ndash; definitely a tool to keep an eye on.</p>

<p>References used for this article:</p>

<ul>
	<li><a href="http://www.centurylinklabs.com/">centurylinklabs</a> a great resource for Docker &ndash; iv&rsquo;e been watching it for some time now &hellip;</li>
	<li><a href="http://panamax.io/">http://panamax.io/</a> &ndash; released Aug 12 2014</li>
	<li><a href="https://coreos.com/">CoreOS website</a> &ndash; Linux for Massive Server Deployments</li>
	<li><a href="http://devo.ps/">devo.ps</a> &ndash; An API for Infrastructure</li>
	<li><a href="http://devo.ps/blog/zookeeper-vs-doozer-vs-etcd/">A nice blog post ZooKeeper vs. Doozer vs. Etcd</a></li>
	<li><a href="http://phusion.github.io/baseimage-docker/">Base Image Docker &ndash; worth a read</a></li>
	<li><a href="http://www.centurylinklabs.com/">centurylinklabs</a>&rsquo;s <a href="https://github.com/CenturyLinkLabs/panamax-public-templates">templates repository </a>.</li>
</ul>
</div>
