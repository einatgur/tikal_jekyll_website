---
layout: post
title: World Cup Out'n'About
created: 1404138664
author: dmitri
permalink: world-cup-outnabout
tags:
- JAVA
- Fuse day
- Spark
- Big Data
- Analytics
- Scala
- Spring
---
<p><em>When you hear &#39;Big Data&#39; and &#39;Analytics&#39; in the same sentence it&#39;s usually about Storm and Hadoop. This time our team decided to take something different for a trial.</em></p>

<p><span style="font-size:18px;">The task</span></p>

<p>We asked to become data scientiests for a day and analyze a large text file filled with tweets. We also asked to develop a WEB application for presenting the results. And, as usual, we only had 8 hours to accomplish it.</p>

<p><span style="font-size:18px;">The goal</span></p>

<p>Assosiating tweets with a country and then showing it on map, seemed to us valuable. Check! Tracking tweet&#39;s sources and calculating TOP-5 popular ways to post a tweet, came up as the second idea. And then we carried away a bit and decided to integrate a mobile application that pushes tweets to our system.</p>

<p><span style="font-size:16px;">The team</span></p>

<p>2 server side developers, 2 JS developers, 4 Android developers and no Dev-Ops developers.</p>

<p><span style="font-size:18px;">Technology Stack</span></p>

<p>Although Storm and Cassandra seemed as a perfect match for the task, we decided to see how easely <a href="http://spark.apache.org/">Spark</a> and <a href="http://www.mongodb.org/">Mongo</a> can takle it. We chose Spring Boot as the fastest way to create and deploy an aplication server. We also agreed to use REST-full services so our JS-based and Android clients could have a simple way to communicate with the server.</p>

<p><span style="font-size:18px;">Architecture</span></p>

<p>We decided to decouple the data analysis process from the rest system components and use Mongo as a midleware for data exchange:</p>

<p><img alt="" height="336" src="{% asset_path default/wc_hld.png %}" width="760" /></p>

<p><span style="font-size:18px;">Data Driver</span></p>

<p>We used Scala for a driver development. The driver takes tweets, bookmarks it, marks sources, calculates TOP-5 and sends the results to the Mongo.</p>

<pre class="brush: scala;" title="code">
val tweets = sc.textFile(path).flatMap(tweet =&gt; {
  //Create tuples by wanted tags
  WorldCupDictionary.DICTIONARY.filter(
    tag =&gt; tweet.toLowerCase.contains(tag)
  ).map(tag =&gt; (tag, tweet))
}).map(tuple =&gt; {
  //Convert JSON string to a tweet object
  (tuple._1, WorldCupDictionary.MAPPER.readValue(
   tuple._2, 
   classOf[Object2ObjectOpenHashMap[String, Object]]))
}).map(tuple =&gt; {
//Convert tweet object to a world cup object
  val map = new BasicBSONObject()
  map.put(
     &quot;country&quot;, tuple._1)
  map.put(
    &quot;twit&quot;, tuple._2(&quot;text&quot;).toString)
  map.put(
    &quot;source&quot;, tuple._2(&quot;source&quot;).toString.replaceAll(
      &quot;(&lt;a href=\&quot;(.*)\&quot;&gt;)|(&lt;/a&gt;)&quot;, &quot;&quot;
))
&nbsp; map.put(
    &quot;userName&quot;, tuple._2(&quot;user&quot;)
    .asInstanceOf[java.util.Map[String,String]](&quot;screen_name&quot;))
  try{
    map.put(&quot;dateInt&quot;, WorldCupDictionary.CUP_DATE_FORMAT.format(
      WorldCupDictionary.TWITTER_DATE_FORMAT.parse(
        tuple._2(&quot;created_at&quot;).toString)
      ).toLong
    )
  } catch { case ex: Exception =&gt; println(ex)}
  
  map

}).cache()</pre>

<p><span style="font-size:18px;">REST Services</span></p>

<p>While <a href="http://projects.spring.io/spring-boot/">Spring Boot</a> creates the skeleton of the project and provides predefned full REST api, <a href="http://projects.spring.io/spring-data/">Spring Data</a> generates for us the all necessary queries:</p>

<pre class="brush: scala;" title="code">
@Repository
public interface TweetRepository extends MongoRepository&lt;Tweet,String&gt;{
}
</pre>

<pre class="brush: scala;" title="code">
@Service
public class TweetService {
  @Autowired
  private TweetRepository repository;
  public void save(Tweet twit) {
    repository.save(twit);
  }

  public List<tweet> fndAll() {
    return repository.fndAll();
  }
}</tweet>&nbsp; 
</pre>
