---
layout: post
title: Add comment into Jira issue from Jenkins
created: 1386174782
author: gil
permalink: add-comment-into-jira-issue-from-jenkins
tags:
- DevOps build
---
<p>With all the Jira plugins in Jenkins, I was sure that I could do it easily but my problem was that I couldn&#39;t find a way to get the Jira issue ID using a certain Jenkins environment.</p>

<p>I then googled a little bit to find that there&#39;s a very easy way to get into any elemnet of a Jira issue using curl command. Now, what was left is to find all the &quot;missing&quot; variables in the puzzle so I&#39;ll have all the info I need to add into the comment. So that is what I have added into a shell step in Jenkins:</p>

<p><strong>###############################################################<br />
# The below is a code that adds comments into the Jira<br />
###############################################################</strong></p>

<p>commitsList=`git log ${GIT_PREVIOUS_COMMIT}^..${GIT_COMMIT} --pretty=oneline | awk &#39;{print $1}&#39;` <strong># get all commits&#39; SHA1 in a push</strong></p>

<p>for c in $commitsList<br />
do<br />
&nbsp; isJiraCommit=`git log --format=%B -n 1 $c | grep -i &quot;jira id&quot;` || true <strong># check if commit message includes &quot;jira id&quot; in it&nbsp;</strong><br />
&nbsp; jiraId=`git log --format=%B -n 1 $c | grep -i &quot;jira id&quot; | awk &#39;{print $3}&#39;` <strong># get the Jira ID</strong><br />
&nbsp; if [ &quot;X$isJiraCommit&quot; != &quot;X&quot; ] <strong># If there&#39;s a Jira ID that attached to this commit</strong><br />
&nbsp; then<br />
&nbsp; &nbsp; data=&quot;\&quot;body\&quot;:&quot;<br />
&nbsp; &nbsp; data+=&quot;\&quot;Commit: http://&lt;git server&gt;/testing/sandbox/commit/$c\n&quot; <strong># First line in comment would be a link to the certain commit in our GitLab</strong><br />
&nbsp; &nbsp; data+=&quot;Branch: ${BRANCH_NAME}\n&quot; <strong># branch name</strong><br />
&nbsp; &nbsp; numLines=`git log --format=%B -n 1 $c | wc -l`<br />
&nbsp; &nbsp; tailNum=`echo &quot;$numLines - 1&quot; | bc`<br />
&nbsp; &nbsp; headNum=`echo &quot;$tailNum - 1&quot; | bc`<br />
&nbsp; &nbsp; data+=&quot;log message:\n&quot;<br />
&nbsp; &nbsp; git log --format=%B -n 1 $c | tail -$tailNum | head -$headNum &gt; /tmp/commitMessage.txt <strong># write log message of the commit to file</strong><br />
&nbsp; &nbsp; while read line <strong># get the log message of the commit line by line</strong><br />
&nbsp; &nbsp; do<br />
&nbsp; &nbsp; &nbsp; data+=&quot;$line\n&quot;<br />
&nbsp; &nbsp; done &lt; /tmp/commitMessage.txt<br />
&nbsp; &nbsp; data+=&quot;\&quot;&quot;<br />
&nbsp; &nbsp; curl -D- -u gils:Split2013 -X POST --data &quot;{$data}&quot; -H &quot;Content-Type: application/json&quot; http://tlv-jira01:8080/rest/api/2/issue/$jiraId/comment <strong># curl command to update the issue comment</strong><br />
&nbsp; &nbsp; data=<br />
&nbsp; fi<br />
done</p>

<p>and the result will look like that:</p>

<p><img alt="" src="{% asset_path default/Untitled(1).jpg %}" style="width: 658px; height: 356px;" /></p>

<p>&nbsp;</p>

<p>The only issue I have encountered with that is that the data syntax that is part of the curl command should contain quotes&nbsp;in it:</p>

<p>&quot;body&quot;: &quot;&lt;message&gt;&quot;</p>

<p>and because it is being sent with quotes, you&#39;ll have to add back slash befor each&nbsp;quote in the data:</p>

<p>&quot;\&quot;body\&quot;: \&quot;&lt;message&gt;\&quot;&quot;</p>

<p>&nbsp;</p>

<p>That&#39;s it.&nbsp;</p>

<p>&nbsp;</p>

<p>BTW, the curl command can add many things to the Jira issue. There&#39;s a lot of documentaions about that.</p>
