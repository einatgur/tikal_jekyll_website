---
layout: post
title: Maven 3.x preview
created: 1264458046
author: liya
permalink: "/devops/maven-3x-preview"
tags:
- DevOps
- build
- maven
---
<p>'Maven 3.x will be the version Maven for the people', says Jason van Zyl, and it does look promising!</p>
<p>At the moment there is a 3.0.alpha.6 version released, I could't find any roadmap or dates for the planned main release yet.</p>
<p>I didn't have a chance to &quot;play around&quot; enough with this release to be able to say that all that promised is there :), but I've summarized some main issues from the Maven 3.x previews I found in several blogs/presentations/apache info pages:</p>
<p>&nbsp;</p>
<p>* Backward compatibility</p>
<p class="rteindent1">- Loads of Integration testing is done to ensure backwards compatibility</p>
<p class="rteindent1">- Stricter validation of the POM is added</p>
<p class="rteindent1">- Configured plugins should have their versions specified (a warning appears otherwise)</p>
<p class="rteindent1">&nbsp;</p>
<p>* Site/reporting is now completely extracted from the Maven core</p>
<p class="rteindent1">- Currently the Site plugin doesn&rsquo;t work with Maven 3.x, yet should until the final release (though reports still work)</p>
<p class="rteindent1">- It's recommended to switch to the use of external quality monitoring tools</p>
<p class="rteindent1">&nbsp;</p>
<p>* What will be new to users:</p>
<p class="rteindent1">- Versionless parent elements<br />
- Better error and integrity reporting<br />
- XML Pom format using attributes instead of elements<br />
- Scripted POM Formats (pom.{rb|groovy|py})<br />
- Mixins - compositional forms of Maven POM configuration</p>
<p><br />
* What will be new to plugin developers:</p>
<p class="rteindent1">- Plugin extension points<br />
- Annotations instead of old javadoc tags<br />
- Lifecycle extension points<br />
- Queryable lifecycle</p>
<p class="rteindent1">&nbsp;</p>
<p>* Mercury - is a standalone product , a replacement for the current Maven Artifact subsystem, and a complete replacement for the HTTP and DAV portions of the existing transport.</p>
<p>&nbsp;</p>
<p>* Maven Embedder - The IDE can literally listen for the Build process, and be part of it, not just launch it.<br />
(currently being used in m2eclipse, IDEA, Netbeans)</p>
<p><br />
* Incremental build support (used heavily in M2Eclipse for performance improvements, these are changes to the plugin API)</p>
<p>&nbsp;</p>
<p>If you're planning to upgrade your maven 2.x builld to maven 3.x, you should first take a look here <a href="http://cwiki.apache.org/MAVEN/maven-3x-compatibility-notes.htmlcwiki.apache.org/MAVEN/maven-3x-compatibility-notes.html">cwiki.apache.org/MAVEN/maven-3x-compatibility-notes.html</a><br />
On the same page you can find the 'Plugin Compatibility Matrix' that indicates which plugins are affected by the API changes in Maven 3.x and might not function properly.</p>
<p>&nbsp;</p>
<p><u>References:</u></p>
<p>- Apache Maven 3.x wiki - <a href="http://cwiki.apache.org/MAVEN/maven-3x.html">cwiki.apache.org/MAVEN/maven-3x.html</a></p>
<p>- Jason van Zyl's Maven 3 Presentation - <a href="http://www.scribd.com/doc/14458957/Jasons-Maven-3-Presentation">www.scribd.com/doc/14458957/Jasons-Maven-3-Presentation</a><br />
- Presentation by Pierre-Antoine Gregoire &quot;Introduction to project industrialization using Maven&quot; - <a href="http://www.slideshare.net/zepag/introduction-to-project-industrialization-with-maven-2">www.slideshare.net/zepag/introduction-to-project-industrialization-with-maven-2</a><br />
- Blog post by Eingestellt von Reikje &quot;What's new in Maven 3&quot; - <a href="http://javasplitter.blogspot.com/2009/11/whats-new-in-maven-3.html">javasplitter.blogspot.com/2009/11/whats-new-in-maven-3.html</a><br />
&nbsp;</p>
<p>&nbsp;</p>
