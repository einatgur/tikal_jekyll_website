---
layout: post
title: Mind The Stack - Architecture stories by Israeli startups
created: 1401093622
author: yifat
permalink: mind-the-stack-architecture-stories-by-israeli-startups
tags:
- Incubator
- architecture
---
<table border="0" cellpadding="2" cellspacing="2" style="width: 100%;">
	<tbody>
		<tr>
			<td style="width: 105px;">
			<p><img alt="" src="{{ asset_path fullstack-logo.png }}" style="line-height: 1.6em; width: 80px; height: 80px;" /></p>
			</td>
			<td colspan="2">
			<h1>Mind The Stack</h1>

			<h1>Architecture stories by Israeli startups</h1>
			</td>
		</tr>
		<tr>
			<td colspan="3"><img alt="" src="{{ asset_path fs-event2.png }}" style="height: 237px; width: 600px;" /></td>
		</tr>
		<tr>
			<td colspan="3">
			<p>Israeli startup will share with us their decision points and consideration while assembling an architecture.</p>

			<p><font color="#333333"><a href="http://www.meetup.com/full-stack-developer-il/events/173484402/">Read the event full agenda, comments, and reviews</a>.&nbsp;</font></p>
			</td>
		</tr>
		<tr>
			<td colspan="3">
			<h2>Tabtale story: Building a publishing and monitoring mobile games architecture with high scale</h2>
			</td>
		</tr>
		<tr>
			<td><img alt="" src="{{ asset_path assaf_g.png }} style="width: 100px; height: 100px; float: left;" /></td>
			<td colspan="2">
			<p>At Tabtale we are setting up an entire server side for the all the publishing services. These services include dynamic game configurations, error collection, analytics, social services and more.Tabtale is among the world&rsquo;s top app publishers with millions of downloads so we are putting a great deal of effort in creating an extremely highly scalable and fault tolerant architecture.&nbsp;In this talk I will go over the architecture decisions taken to support the scalability and diversity that is required from the server side services while keeping the management of this infrastructure sane.&nbsp;<br />
			30min&nbsp;By: Assaf Gannon</p>
			</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><iframe allowfullscreen="" frameborder="0" height="200" marginheight="0" marginwidth="0" scrolling="no" src="http://www.slideshare.net/slideshow/embed_code/35121649" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" width="250"></iframe>&nbsp;<iframe allowfullscreen="" frameborder="0" height="200" scrolling="no" src="//www.youtube.com/embed/o_-IrXtSYxQ" width="250"></iframe></td>
		</tr>
		<tr>
			<td colspan="3">
			<h2>FTBPro story: &nbsp;Growing X20 without spending an extra penny on hosting</h2>
			</td>
		</tr>
		<tr>
			<td><img alt="" src="{{ asset_path dork.png }}" style="width: 100px; height: 100px;" /></td>
			<td colspan="2">
			<p>A year ago we started a big change in&nbsp;FTBpro. We completely changed the visual design, moved to a single page architecture and started exploring new ways to minimise load on our servers - both when serving our actual website, and mobile API responses.We&#39;ll focus on how scaling considerations are now an integral part of our architecture, which enabled us to serve 20x more traffic than we did 1 year ago, with the same setup and with no additional costs.&nbsp;<br />
			45min&nbsp;By: Dor Kalev &nbsp;(<a href="https://speakerdeck.com/dorkalev/growing-x20-without-spending-an-extra-penny-on-hosting">View the slides</a>)</p>
			</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td colspan="2"><script async class="speakerdeck-embed" data-id="086e0c60c2e001314e2606393c0335dc" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script><iframe allowfullscreen="" frameborder="0" height="200" scrolling="no" src="//www.youtube.com/embed/d56sFMHWJQc" width="250"></iframe></td>
		</tr>
		<tr>
			<td colspan="2" rowspan="1">
			<h2>Taboola story: &nbsp;Scaling Data Architecture using Apache Spark</h2>
			</td>
		</tr>
		<tr>
			<td>
			<p><img alt="" src="{{ asset_path tals.png }} style="width: 100px; height: 100px;" /></p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>

			<p>&nbsp;</p>
			</td>
			<td>
			<p><span style="line-height: 1.6em;">At taboola we are getting a constant feed of data (many billions of user events a day). In this talk we will share some points about our data scale challenges and how and we are using Apache Spark together with Cassandra, for both real time data stream processing as well as offline data processing. &nbsp;</span></p>

			<p>Apache Spark is an open source project - Hadoop-compatible computing engine that makes big data analysis drastically faster, through in-memory computing, and simpler to write, through easy APIs in Java, Scala and Python. This project was born as part of a PHD work in UC Berkley&#39;s AMPLab (part of the BDAS - pronounced &quot;Bad Ass&quot;) and turned into an incubating Apache project with more active contributors than Hadoop. Surprisingly, Yahoo! are one of the biggest contributors to the project and already have large production clusters of Spark on YARN.Spark can run either standalone cluster, or using either Apache mesos and ZooKeeper or YARN and can run side by side with Hadoop/Hive on the same data. One of the biggest benefits of Spark is that the API is very simple and the same analytics code can be used for both streaming data and offline data processing.&nbsp;<br />
			45min By: Tal Sliwowicz</p>
			</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td><iframe allowfullscreen="" frameborder="0" height="200" marginheight="0" marginwidth="0" scrolling="no" src="http://www.slideshare.net/slideshow/embed_code/34919951" style="border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;" width="250"></iframe>​&nbsp;<iframe allowfullscreen="" frameborder="0" height="200" scrolling="no" src="//www.youtube.com/embed/Rxo5lFnNFkQ" width="250"></iframe></td>
		</tr>
	</tbody>
</table>
