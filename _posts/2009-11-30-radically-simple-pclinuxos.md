---
layout: post
title: 'Radically Simple ?   PCLinuxOS '
created: 1259621252
author: shalom
permalink: "/devops/radically-simple-pclinuxos"
tags:
- DevOps
- PCLinuxOS apt-get upgrade linux
---
<p>I know this post doesn't fit any of our groups ,but i had to share with you my very short experience with yet another linux distro, <a href="http://pclinuxos.com/">PCLinuxOS </a>, which i think is a nice one, a little window&rsquo;sh ,well.. maybe more then a little, it even has the &lsquo;My Computer&rsquo; icon on the Desktop.</p>
<p>but apparently it also works well, I installed it on a very old Pentium 3 machine with 512M and it works perfect, smooth installation,no hardware problems, at least not for the few hours I played with it. BTW while I&rsquo;m typing here with abiword I see strange characters on the screen so I don&rsquo;t know about it..<br />
Anyway, it looks like a good linux for windows users on a home PC, or for someone who doesn&rsquo;t want to go with the Ubuntu mainstream(myself included). <br />
It comes bundled with many applications,graphics and multimedias and such,&nbsp; a lot of configuration options, very colorful , I especially like the regional settings with all the flags. I like flags..<br />
<br />
But, Beware! it took me two installation retries to learn never to do an <em>upgrade</em> using synaptic or <em>apt-get</em>, at least not with this distro. it&rsquo;s very tempting to click the button 'Mark All Upgrades' in synaptic and it looks like everything is fine, but the system won&rsquo;t reboot after that because <em>apt-get upgrade</em> doesn&rsquo;t check for dependencies or something like that linux gurus over-there can explain better then me.<br />
<br />
so if you really want to upgrade never do an <em>upgrade</em> but <em>update</em> and then <em>dist-upgrade</em><br />
<em>root&gt;apt-get update &amp;&amp; apt-get dist-upgrade</em><br />
go take a break, and if that fails try<br />
<em>root&gt;apt-get update --fix-broken &amp;&amp; apt-get dist-upgrade</em><br />
hope this one works..<br />
<br />
And ﻿Voila , you have another working linux machine to play with for some time until you have to recover it again from some bizarre crash.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><img width="1200" height="960" alt="" src="/files/upload/12/snapshot3.png" /></p>
