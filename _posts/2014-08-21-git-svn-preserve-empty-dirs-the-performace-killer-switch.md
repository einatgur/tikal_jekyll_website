---
layout: post
title: git svn --preserve-empty-dirs - the performace-killer switch
created: 1408629616
author: yorammi
permalink: "/devops/the-svn-performance-killer-switch"
tags:
- Incubator
- git
- svn
- git2svn
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">I have a task to migrate an SVN repository into a new GIT repository.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">The origin SVN repository is a very big one - it has more than 120000 revisions (and growing&hellip;) with many branches and tags. It is basically a Java project (maven build) which contains (too) many empty folders that - for build reasons - must remain also after the migration to GIT.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">As I usually do for such migrations, I&rsquo;m using the </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: bold; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">git svn</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;"> command for the migration.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">But testing the migration for the current task resulted with the estimation of about 2 weeks run(!!!) which I can&rsquo;t afford to have.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">After discussing this with the owners of the repository which consists of having the commit-history and preserving at least the main development branch, I manage to reduce the migration time into 18 </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: bold; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">hours</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;"> on a very powerful server.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Still, this seems not valid for us and then I&rsquo;ve discovered that the cause of the long migration is the usage of the </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: bold; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">--preserve-empty-dirs</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;"> flag. I&rsquo;ve noticed that running the same migration (only one branch with it full history) - without that flag - took only 80 </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: bold; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">minutes</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;"> on the same powerful machine!!!</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Still, even that were a big discovery (for me at least) it was not good for the project that needs to preserve those empty folders.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">For solving this I realized that while the empty folder are needed for build process at the HEAD revision, it is not needed for any of the history revisions.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Therefore I&rsquo;ve created the following migration process:</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">1. migrate the SVN repository without the --preserve-empty-dirs flag</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">2. SVN checkout the HEAD revision of the branch onto a separate folder</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">3. put an empty .gitignore file (or whatever dummy file you want) into each of the empty folders </span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">&nbsp;(the following command will do the job: </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); font-weight: bold; font-style: italic; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">find . -type d -empty -exec touch {}/.gitignore \;</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">)</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">4. overwrite the above folder onto the migrated folder </span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">5. commit the changes as a new GIT commit</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;">&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">This will result with a GIT repository that have a version of the code that passes build in its last commit and still have the history of all the code on the main development branch.</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Enjoy,</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">Yoram Michaeli</span></span></p>

<p><span id="docs-internal-guid-f2af8202-f8dc-66c1-9ef2-1eccef6b9d9d"><a href="mailto:yorammi@tikalk.com" style="text-decoration:none;"><span style="font-size: 15px; font-family: Arial; color: rgb(17, 85, 204); text-decoration: underline; vertical-align: baseline; white-space: pre-wrap; background-color: transparent;">yorammi@tikalk.com</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); vertical-align: baseline; white-space: pre-wrap; background-color: transparent;"> #yorammi </span></span></p>
