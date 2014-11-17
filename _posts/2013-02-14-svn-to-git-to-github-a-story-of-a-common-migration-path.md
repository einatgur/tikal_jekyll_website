---
layout: post
title: SVN to GIT to GitHub - a story of a common migration path
created: 1360880280
author: yorammi
permalink: "/devops/svn-git-github-story-common-migration-path"
tags:
- DevOps
- git
- GitHub
- scm
- svn
- migration
---
<p>Description of a&nbsp;common migration path&nbsp;- <strong>SVN</strong> to <strong>GIT</strong> to <strong>GitHub</strong>.</p>

<hr />
<h1><strong>Preview</strong></h1>

<p>This article describes a <strong>common migration path</strong>&nbsp;- SVN to GIT to GitHub&nbsp;- that I&#39;ve walked-in lately and can be used as a best-practice for many users even if not used as-is since each case have a different startup-status and different requirements.</p>

<p>The post can be useful for many of you since it contains the following content:</p>

<ul>
	<li><strong>Analysis</strong> of the given startup status, requirements, main components and more.</li>
	<li>Detailed <strong>technical information</strong> about steps to perfrom and other related information</li>
	<li>Process flow description.</li>
	<li><strong>Insights</strong> of decision taken during the process.</li>
	<li><strong>Links</strong> to related information and resources I&#39;ve used during the process.</li>
</ul>

<p><img alt="yes" height="20" src="http://www.tikalk.com/sites/all/modules/contrib/ckeditor/ckeditor/plugins/smiley/images/thumbs_up.gif" title="yes" width="20" />&nbsp;<span>I hope that the article would be useful for at least one of the readers. Comments will be most welcome.</span></p>

<h1><strong>In the beginning</strong></h1>

<p>First of all, I&#39;ll start by describing <strong>the trigger</strong> for this migration, the <strong>building blocks</strong> of it and all that is related to the initial process status.</p>

<p>&nbsp;</p>

<p><a href="http://www.tikalk.com">Tikal Knowledge</a> ALM group-members performs many <a href="http://en.wikipedia.org/wiki/Application_lifecycle_management">ALM</a> processes and projects for Tikal&#39;s customers.</p>

<p>One of those common processes is a migration from one source control system to another one.</p>

<p>In this case I&#39;ve been requested to migrate an existing <a href="http://subversion.tigris.org/">SVN</a>-server-based-system to a <a href="http://git-scm.com">GIT</a>-based-system which will be supported by using the <a href="https://github.com/">GitHub</a> services.</p>

<p>I won&#39;t get into the reasons leading the certain customer on the decision to perform this migration, but these days it is a very common migration that contains 2 major paths:</p>

<ul>
	<li><u><em>Migration from SVN to GIT</em></u> - there are many posts and articles trying to explain why one should perfrom it and you can google around it and get many of those posts. I recomment <a href="https://git.wiki.kernel.org/index.php/GitSvnComparsion">this simple comparison list</a> as a start.</li>
	<li><u><em>Using GitHub as the the main repository host</em></u> - read <a href="http://github.com/about">this&nbsp;web page</a> as a lead for choosing GitHub over other possible solutions.</li>
	<li>Beside this top-level requirement, there were some other requirements that I&#39;ll describe later on.</li>
</ul>

<h1><strong>Process startup-status and requirements</strong></h1>

<p>In this section I&#39;ll describe what were the status of the migrated-system and the migration-requirements.</p>

<p>Even that your system is probably not the exactly same and you may have different migration-requirements, I think that each one of you should prepare a similar list as a first step before starting to work on the migration.</p>

<p>&nbsp;</p>

<p>Here&#39;s some information about the system-to-be-migrated and other related details, as I had for my case:</p>

<ul>
	<li>a company with a small development team (less than <strong>10 developers</strong> that uses source contol system)</li>
	<li><strong>SVN server</strong> with:</li>
	<li>1 repository.</li>
	<li><strong>common SVN tree structure:</strong> trunk, branches and tags.</li>
	<li>about <strong>10 active branches</strong> and many legacy-non-active branches. The active branches were required to be migrated into the GIT system.</li>
	<li>few tags which are not really needed.</li>
	<li><strong>less than 5000 revisions</strong> which were asked to be migrated into the git system - meaning: the commit-history is needed.</li>
	<li>Many binary (too many) files committed into the repository including mp3 files, jar files, images and more.</li>
	<li>trunk contains many deprecated projects and <strong>2 active developement projects</strong>:</li>
	<li>one is the major project that have all the branches.</li>
	<li>another one that is valid only in its trunk version and can be migrated without saving the commit-history of it.</li>
	<li>SVN-server that resides on an <strong>ubuntu-linux server</strong>.</li>
	<li>The path to the repository root is <a href="http://svn/repo">http://svn/repo</a>. This path will be referred to later on in the post and should be replaced with your repository root path in order to be used in your system.</li>
</ul>

<p>The migration requirements:</p>

<ul>
	<li>Migrate from SVN to GIT preserving the 2 major developement projects only, while the other projects can not be migrated.</li>
	<li>Main developement project migration of all active branches and trunk version (SVN-trunk ==&gt; GIT-master-branch) including all commit-history.</li>
	<li>One direction migration, meaning: once the migration is done, there is no need to merge GIT-commits back into SVN-repository.</li>
	<li><a href="http://jenkins-ci.org/">Jenkins</a> projects should be switched from SVN to GIT.</li>
	<li>Once the migration is done, all clients should start working in GIT within a short time.</li>
	<li>Each of the 2 major developement projects will have a separate GitHub/GIT-repository.</li>
	<li>The work on the migration process will be parallel to the continous developement process, meaning: developers will continue committing changes to the SVN-repository during the whole process and the freeze-time - at the end of the process before switching to work in GIT - will be short as much as possible.</li>
</ul>

<h1><strong>High-level description of the process flow</strong></h1>

<p>List of the migration-steps which - most of it - will be detailed in the following sections:</p>

<ul>
	<li><strong>SVN repository backup</strong> - the first step before any other work is done!</li>
	<li><strong>SVN cleanup</strong> - for the best and smooth migration it is best to perform most of the cleanup in the SVN repository and leave only few cleanup actions to be done on the migrated GIT-repository.</li>
	<li><strong>Environment preparations</strong> - actions such as preparing a clean migration-folder, GitHub-company-account purchasing and GitHub-admin-user creation.</li>
	<li><strong>Migration-script preparation</strong>.</li>
	<li><strong>First migration</strong> from SVN to GIT and to GitHub.</li>
	<li><strong>End-to-end test</strong> of migration, client-side use-case and Jenkins-build.</li>
	<li><strong>SVN commit-freeze</strong>.</li>
	<li>Team basic GIT and GitHub <strong>training short-session</strong>.</li>
	<li><strong>Jenkins-jobs migration</strong> from SVN to Git/GitHub.</li>
	<li>SVN-related files <strong>cleanup</strong> and GIT-projects <strong>adjustment</strong> - meaning: remove all .svn folders and add build-products folders into gitignore files.</li>
</ul>

<h1><strong>Working environment preparations</strong></h1>

<p>Before performing any migration-step, the working environment must be prepared in order to avoid delays in the process.</p>

<ul>
	<li><strong>git command line </strong>should be installed on the working machine. See reference <a href="#ref2">(2)</a> for details about such installation.</li>
	<li><strong>svn</strong> should be installed as well for performing the cleanup mentioned earlier and for creating the authorized users file.</li>
	<li><strong>GitHub user</strong> should be created for you, be set as the <strong>company account owner</strong> and <strong>create a first repository</strong>.&nbsp;See reference <a href="#ref3">(3)</a> for details.</li>
	<li><strong>Generate SSH key</strong> in order for the machine you&#39;re running on to push repositories into the GitHub account. See reference <a href="#ref4">(4)</a> for instructions of how to perform it.</li>
</ul>

<h1><strong>Migration preparation steps</strong></h1>

<p>Before starting to work on the migration you must create a text file (e.g. authors-transform.txt) containing all SVN users and their email and name information.</p>

<p>Run this command for creating the file:&nbsp;</p>

<hr />
<p><span><strong><em>svn log -q | awk -F &#39;|&#39; &#39;/^r/ {sub(&quot;^ &quot;, &quot;&quot;, $2); sub(&quot; $&quot;, &quot;&quot;, $2); print $2&quot; = &quot;$2&quot; &lt;&quot;$2&quot;&gt;&quot;}&#39; | sort -u &gt; authors-transform.txt</em></strong></span></p>

<hr />
<p>and then fill it with the users real names and email addresses. Make sure you fill details even for users who are not working to the company anymore - don&#39;t delete it since the migration will fail for converting revisions that unknown user committed.</p>

<p>&nbsp;</p>

<p>The second step I recommend to perform is to cleanup the SVN repository.</p>

<p>What I did was:</p>

<ul>
	<li>Backup SVN repository (using <a href="http://svnbook.red-bean.com/en/1.1/re31.html">svnadmin dump</a> utility)</li>
	<li>I&#39;ve created a special SVN tag which I&#39;ve called it <em>tags/legacy</em>, I&#39;ve created 3 sub-folders in it: trunk, &nbsp;branches and tags and I&#39;ve moved all depracated resources from all the SVN repository into it.</li>
	<li>I&#39;ve deleted all resources I was told specificly that I can delete safely</li>
</ul>

<p>&nbsp;</p>

<p>In my case there were a second sub-tree in trunk that I was allowed to move as is without the need to preserve the commit history, therefore I&#39;ve created a new repository in GitHub, created a new local repository, SVN-exported the project into it, committed the files into the local repository and uploaded it to GitHub.</p>

<h1><strong>Main migration script</strong></h1>

<p>In order to perform a repeatable migration process - which were required because of the need to run it more than once during the migration process - I&#39;ve created a shell script. I&#39;ve even configure it to run using a jenkins job but this is not a must for the process.</p>

<p>First of all I&#39;ll describe the basic blocks of the script.</p>

<p>As first step I&#39;ve created a new empty folder (in my case: /opt/svn2git but it can be anywhere as long that it is empty, have the needed permission and no-one is expected to access it and messup your work...)</p>

<h2>SVN to GIT migration command</h2>

<p>The basic command to use for that purpose is <strong><a href="http://www.kernel.org/pub/software/scm/git/docs/git-svn.html">git svn</a></strong>. The format of the full command which I&#39;ve used is:</p>

<hr />
<p><span><strong>git svn clone -s --no-metadata --prefix=svn/ --no-follow-parent --authors-file=transform.txt http://svn/repo &lt;target-repository-name&gt; --user=&lt;SVN user&gt; --ignore-paths=http://svn/repo/tags</strong></span></p>

<hr />
<p>The first time you run the command it can take hours to be done, depending on the size of the repository and network performance.</p>

<p>It is recommeneded to run it manually and see that it works OK.</p>

<p>Please notice that that command should run in the repository parent folder (e.g. /opt/svn2git) while all other git command should run in the root of the created local repository folder (e.g. /opt/svn2git/company-main).</p>

<p>Once it is done running, a new git repository is created which contains a replication of your SVN repository (e.g. for my case:&nbsp;/opt/svn2git/company-main).</p>

<p>The created git repository contains all the branches you had in SVN repository as remote branches with both <strong>svn/</strong> and <strong>origin/</strong> prefix.</p>

<p>You can see the list of all branches by running:</p>

<hr />
<p><b><i>git branch -a</i></b></p>

<hr />
<p>An example output can be:</p>

<hr />
<p><strong><span>&nbsp; remotes/origin/trunk</span></strong></p>

<p><strong><span>&nbsp; remotes/origin/br_1.0</span></strong></p>

<p><strong><span>&nbsp; remotes/origin/br_2.0</span></strong></p>

<p><strong><span>&nbsp; remotes/origin/br_3.0</span></strong></p>

<p><strong><span>&nbsp; remotes/svn/trunk</span></strong></p>

<p><strong><span>&nbsp; remotes/svn/br_1.0</span></strong></p>

<p><strong><span>&nbsp; remotes/svn/br_2.0</span></strong></p>

<p><strong><span>&nbsp; remotes/svn/br_3.0</span></strong></p>

<hr />
<h2>Connect the local GIT repository with the matching GitHub repository</h2>

<p><span>When you create a new repository in GitHub, you will see - on the repository web page - a list of command to perform for pushing the local repository into the GitHub one.</span></p>

<p>The command for connection the local GIT repository with the GItHub repository using SSH protocol is in the following format:</p>

<hr />
<p><strong>git remote add origin git://github.com:&lt;company&gt;/&lt;target-repository-name&gt;.git</strong></p>

<hr />
<p>Run it once and it won&#39;t be neccassary to inlcude it in the migration script.</p>

<p>Notice that this command should run in the local repository folder.</p>

<h2>Local GIT to GitHub push command-sequance</h2>

<p>For each branch in SVN you want to have a matching branch in GIT expect for one excetion which is <strong>trunk</strong> which in better renamed to be <strong>master</strong> for GIT and GitHub repositories.</p>

<p>I found out that the <strong>git push origin --all</strong> will not be good for my purposes therefore I&#39;ve built a set of commands that is repeated for all branches but master (which has a bit different set of commands that I&#39;ll list as well).</p>

<p>For each branch add those command to the script:</p>

<hr />
<p><strong>rm -fr .git/rebase-apply</strong></p>

<p><strong>git checkout -f &lt;branch-name&gt;</strong></p>

<p><strong>git reset</strong></p>

<p><strong>git rebase svn/&lt;branch-name&gt;</strong></p>

<p><strong>git push -u origin &lt;branch-name&gt;</strong></p>

<hr />
<p>For the master/trunk migration, add those lines to the script:&nbsp;</p>

<hr />
<p>&nbsp;<strong>rm -fr .git/rebase-apply</strong></p>

<p><strong>git checkout -f master</strong></p>

<p><strong>git reset</strong></p>

<p><strong>git rebase svn/trunk</strong></p>

<p><strong>git push -u origin master</strong></p>

<hr />
<p>Now that you have a script that perform 2 main actions:</p>

<ul>
	<li>migrate SVN repository to a local GIT repository.</li>
	<li>Push all branches code from local GIT repository to GitHub repository.</li>
</ul>

<p><a id="fck_paste_padding">﻿</a></p>

<p>You should run the script at least once in order to have the GitHub repository ready.</p>

<p>While the first run of the script may take a long time (took hours for me), each of the next run of it perform a delta-update of both the SVN-to-GIT migration (updates only the new SVN revisions since the last run) and the push to GitHub so it will be a very fast run.&nbsp;</p>

<h1><strong>Migration story</strong></h1>

<p>Once the migration script was ready and I&#39;ve got an approval for performing the actual migration, here are the final steps we performed:</p>

<ul>
	<li>I&#39;ve make sure that all the developers performed the <strong>final SVN commits </strong>and I&nbsp;made them know that uncommitted files will force them to manually copy of those files into the GIT local repository without any SCM-merge-tool supporting it.</li>
	<li><strong>SVN commit freeze</strong> - this can be done using the SVN-ACL-mechanism but - in my case - we just annouced a commit-freeze.</li>
	<li>I&#39;ve run the <strong>SVN-to-GIT-to-GitHub script for the last</strong><strong> time</strong> and validated that it runs with no errors and that I can see the latest commits in the GitHub repository.</li>
	<li>We gave a <strong>short training session</strong> which included demonstatration of establishing a GIT/GItHub working environment and common developer-workflow along with basic git-concept explanation.</li>
	<li><strong>GIT cleanup</strong> from .svn folders and <strong>ignore-lists creation</strong> - the developers were instructed to help in performing that step.&nbsp;</li>
</ul>

<h1><strong>Beware of...</strong></h1>

<p>During the migration process I&#39;ve encountered obsticles, so - in order to help you prevent getting into those issues - here are some warnings:</p>

<ul>
	<li><strong>make sure</strong> that no one - but the user that you perform the migration with - have push privileges to the GitHub repository. Permit it only after the final migration. That includes company-account owners that have full privileges by-definition.</li>
	<li><strong>Inspect</strong> the migration log each time you perform any action.&nbsp;</li>
</ul>

<h1><strong>Last words</strong></h1>

<p>As I&#39;ve already wrote in the preview of this article, it cannot be used as-is for migrating your company or project SCM in the same path, but it can help you in some aspects of it, whether it is a technical aspect or a conceptual one.</p>

<p>In any case, you&#39;re welcome to comment on it, ask questions that me or someone in Tikal&#39;s ALM team can answer or you can directly connect us.</p>

<h1><strong>References</strong></h1>

<ul>
	<li>(1)&nbsp;<a href="http://www.tikalk.com/alm/blog/hybrid-environment-setup-during-migration-svn-git" target="_blank">www.tikalk.com/alm/blog/hybrid-environment-setup-during-migration-svn-git</a></li>
	<li><a name="ref2">(2)</a> git command line installation: download -&nbsp;<a href="http://git-scm.com/downloads" target="_blank">git-scm.com/downloads</a>, instructions -&nbsp;<a href="https://help.github.com/articles/set-up-git" target="_blank">help.github.com/articles/set-up-git</a></li>
	<li><a name="ref3">(3)</a> Creating GitHub user:&nbsp;<a href="https://help.github.com/articles/signing-up-for-a-new-github-account" target="_blank">help.github.com/articles/signing-up-for-a-new-github-account</a></li>
	<li>&nbsp; &nbsp; &nbsp;Create a company account:&nbsp;<a href="https://help.github.com/articles/creating-a-new-organization-account--2" target="_blank">help.github.com/articles/creating-a-new-organization-account--2</a></li>
	<li>&nbsp; &nbsp; &nbsp;Set as account owner:&nbsp;<a href="https://help.github.com/articles/transferring-organization-ownership" target="_blank">help.github.com/articles/transferring-organization-ownership</a></li>
	<li>&nbsp; &nbsp; &nbsp;Create a repository:&nbsp;<a href="https://help.github.com/articles/create-a-repo" target="_blank">help.github.com/articles/create-a-repo</a></li>
	<li><a name="ref4">(4)</a> GitHub-SSH-key generation:&nbsp;<a href="https://help.github.com/articles/generating-ssh-keys" target="_blank">help.github.com/articles/generating-ssh-keys</a></li>
</ul>

<p>&nbsp;</p>

<p><span>---</span></p>

<p><span><em><strong>Yoram Michaeli</strong></em></span></p>

<p><span><em><strong>Tikal ALM expert</strong></em></span></p>

<p><a href="mailto:yorammi@tikalk.com"><span><em><strong>yorammi@tikalk.com</strong></em></span></a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>
