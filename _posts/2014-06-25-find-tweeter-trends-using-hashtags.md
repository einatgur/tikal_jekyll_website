---
layout: post
title: Find Tweeter Trends using Hashtags
created: 1403713280
author: yanai
permalink: find-tweeter-trends-using-hashtags
tags:
- JAVA
- Storm SpringBoot Tweeter
---
<h1><span style="line-height: 1.2em;">Abstract</span></h1>

<p>In our last Tikal Fuseday, we split into several groups to create data analytic applications. As in previous Fuseday, the idea was to learn and use lots of technologies, by creating a working &ldquo;crash application&rdquo; from scratch, developed in just a few hours of work.</p>

<p>With our team we had six SW developers, plus&nbsp;two Dev-Ops developers, and we set our goal in the morning &ndash; &ldquo;Create a simple application that analyzes Tweeter hashtags&rdquo;. We analyzed a big file filled with tweets (simulating on-line tweets), by extracting the date and hashtags per each tweet, accumulating the hashtag for a short period of time by intervals (1 sec each interval), and emit the aggregations into analytic storage. Then, yet another web application, provided a display API for examining the results in a bar-chart as the figure bellow</p>

<p><img alt="" src="{% asset_path default/Screen-Shot-2014-06-24-at-18_35_05.png %}" style="width: 1202px; height: 623px;" /></p>

<p><span style="line-height: 1.6em;">As you can see in the graph above, it can reveal the highest trending hashtags in the last few minutes.</span></p>

<p>&nbsp;</p>

<h1>Context</h1>

<p>We decided to create two decoupled services: <a href="https://github.com/tikalk/hashtag_processor">Hashtags processor</a> which does the logic for handling the stream, and a <a href="https://github.com/tikalk/hashtag_service/">Web application Service</a> which reads the stored results upon user requests. Here is the context view diagram for it:</p>

<p><img alt="" src="{% asset_path default/architecture.png %}" style="width: 901px; height: 555px;" /></p>

<p>&nbsp;</p>

<h1><span style="line-height: 1.6em;">Hashtag processor</span></h1>

<p>We chose to use <a href="https://storm.incubator.apache.org/">Storm</a> as our real time processor. You can look at the following Storm topology we created:</p>

<p><img alt="" src="{% asset_path default/topology.png %}" /></p>

<p>We created a <a href="https://github.com/tikalk/hashtag_processor/blob/master/src/main/java/com/tikal/fullstack/thashtag/topology/spouts/TweetsFileSpout.java">TweetsFileSpout</a> that reads the tweets from the file. Then we created a <a href="https://github.com/tikalk/hashtag_processor/blob/master/src/main/java/com/tikal/fullstack/thashtag/topology/bolts/HashtagTokenizerBolt.java">tokenizer bolt</a>, extracting date and hashtags for each and every tweet. The next bolt is the <a href="https://github.com/tikalk/hashtag_processor/blob/master/src/main/java/com/tikal/fullstack/thashtag/topology/bolts/HashtagAggregatorBolt.java">aggregator bolt</a>, which is connected back to the tokenizer bolt with hashtag &ldquo;field grouping&rdquo;, making sure all identical hashtags are been accumulated in the same bolt &ldquo;task&rdquo; (instance). The aggregator bolt accumulates hashtags in a map keyed by tweets intervals, and upon &ldquo;tick&rdquo; tuple emitted by Storm (configured 3 sec), it emits all accumulated tags counting to the last bolt - <a href="https://github.com/tikalk/hashtag_processor/blob/master/src/main/java/com/tikal/fullstack/thashtag/topology/bolts/HashtagPersistorBolt.java">persister bolt</a>. The persister bolt saves all hashtags counting to&nbsp;<a href="http://redis.io/">Redis</a>. Redis is a special key-value DB,&nbsp;that enables putting <a href="http://redis.io/topics/data-types">a few types</a> as the value. Specifically, the key in our Redis database is the time-interval, while the value is Redis&#39;s &ldquo;hash&rdquo; - mapping each hashtag to its accumulated counting in this interval (see next figure for the data model in Redis):</p>

<p><img alt="" src="{% asset_path default/redis-data.png %}" style="width: 611px; height: 415px;" /></p>

<h1>Hashtag Service</h1>

<p>We created simple <a href="http://projects.spring.io/spring-boot/">SpringBoot</a> application that exposes a single REST API &ndash; get last X seconds most trending hashtags. The result is array of JSONs with the last hashtags counting.</p>

<p>&nbsp;</p>

<h1>Client</h1>

<p>This was a HS application implemented with Angular +D3 application. It calls the Hashtag service and display results in a bar chart, showing most popular Hashtags in the last X seconds.</p>

<p>&nbsp;</p>

<h1>Running the application</h1>

<p>After downloading and building both processor and service application, you should do the following steps:</p>

<ul>
	<li>Run Redis</li>
	<li>Run Processor service. In order to run the application you can run the processor by the following command :</li>
</ul>

<p>java -jar thashtags-1.0.0-jar-with-dependencies.jar &lt;YOUR TWEETS FILE&gt; &lt;REDIS IP&gt;</p>

<ul>
	<li>Run&nbsp;<span style="line-height: 1.6em;">Web application Service:</span></li>
</ul>

<p>java -jar ./target/demo-0.0.1-SNAPSHOT.jar</p>

<ul>
	<li><span style="line-height: 1.6em;">Look on the REST api using http://localhost:8080/lastTweets/seconds/5</span></li>
	<li>See the displayed graph at http://localhost:8080/index.html</li>
</ul>

<p>&nbsp;</p>

<h1>Summary</h1>

<p>The code for the Hashtag Processor and Service applications were committed to the GitHUB. We enjoyed playing with data analytic and streaming technologies, and were happy to provide very initial, but working application.</p>
