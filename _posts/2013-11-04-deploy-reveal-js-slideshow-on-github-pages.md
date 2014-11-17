---
layout: post
title: Deploy reveal.js slideshow on github-pages
created: 1383603607
author: hagzag
permalink: "/devops/deploy-revealjs-slideshow-github-pages"
tags:
- DevOps
- reveal.js github github-pages git
---
<p>Deploy <a href="https://github.com/hakimel/reveal.js/">reveal.js slideshow</a> on github-pages was ridiculously easy.</p>

<p>Cloned reveal.js master branch to my local machine:</p>

<ol>
	<li>git clone&nbsp;git@github.com:hakimel/reveal.js.git</li>
	<li>rm -Rf .git =&gt;&nbsp;this will remove the history - of you want to preserve history&nbsp;<em><strong>git remote rm origin</strong></em>&nbsp;and add your new remote&nbsp;</li>
	<li>git remote add origin git@github.com:tikalk-cookbooks/chef_workshop_presentation.git</li>
	<li>git add .</li>
	<li>git commit -m &quot;Initial commit&quot;</li>
	<li>git push origin master</li>
</ol>

<p>In order to push master to github pages you should create a branch names <em><strong>gh-pages</strong></em> and it&nbsp;<strong>must</strong> be named that, the commit &amp; push to this branch and about 2 minuets later you can browse to your presentation on gh-pages.</p>

<p><em><strong>Create a branch</strong></em>:</p>

<pre>
git branch hg-pages
git push origin gh-pages</pre>

<p>updating this &quot;site&quot; can be done by editing the stuff you want on the &quot;master&quot; branch, then merge those changes in the gh-pages branch and finally push those changes to the remote gh-pages which will automatically deploy youe reveal.js presentaion.</p>

<p>the merge sould look somthing like:</p>

<pre>
hagzag-Lap-hagzag:chef_workshop_presentaion(master) $ git checkout gh-pages&nbsp;

hagzag-Lap-hagzag:chef_workshop_presentaion(gh-pages) $ git merge master&nbsp;
Updating 0f4f1e1..fb0d73d

Fast-forward

&nbsp;css/custom.css | &nbsp; 4 ++++

&nbsp;index.html &nbsp; &nbsp; | 104 +++++++++++++++++++++++++++++++++++++++++++++++++-------------------------------------------------------

&nbsp;2 files changed, 53 insertions(+), 55 deletions(-)

&nbsp;create mode 100644 css/custom.css

git push origin gh-pages</pre>

<p>&nbsp;</p>

<p>the url is built from the followng pattern:</p>

<p>[github_username].github.io/[repo_name]</p>

<p>in this case:</p>

<p><a href="http://tikalk-cookbooks.github.io/chef_workshop_presentation/#/">http://tikalk-cookbooks.github.io/chef_workshop_presentation/</a></p>

<p>&nbsp;</p>

<p>Hope you find this useful !</p>

<p>HP</p>
