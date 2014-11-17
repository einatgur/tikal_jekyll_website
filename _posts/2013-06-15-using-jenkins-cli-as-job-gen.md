---
layout: post
title: Using jenkins-cli as job Gen
created: 1371333980
author: hagzag
permalink: "/devops/using-jenkins-cli-job-gen"
tags:
- DevOps
- jenkins
- jenkins-cli
- configuration management (cm)
- job generation
- how-to
- tutorial
---
<p>Well a common use case for doing stuff with Jenkins jobs / configuration [ for example: enabling jobs, disabling jobs, executing jobs etc] is to use Jenkins-cli.jar which is included in your jenkins distribution.</p>
<p>In a large company where branches are branched on a daily basis and you need a build for each branch, job creation could become a bottleneck [ so could branch creation - but that a different topic :) ].</p>
<p>So my use case was to create a Job Generator which would take an existing job from branch 1.0 and create a job ( &amp; the ranch but as I said different topic ) for branch 2.0 with the corresponding name, so as I mentioned thank god for Jenkins in general, Jenkins-cli and in addition to that a shell script, <a href="http://www.gnu.org/software/sed/">sed</a>, <a href="http://xmlstar.sourceforge.net/">xmlstarlet</a> and again jenkins job parameters.</p>
<p>I needed a script which would export the job configuration to an xml file, search and replace for the SCM url, create the job so lets see how its done:</p>
<pre class="brush: ruby;" title="code">
execJenkinsCli(){ # excute jenkins-cli jar 
        jenkins_clinet_jar=./jenkins-cli.jar
        # download only if it&#39;s newwer than the local version [ curl -z ], the cli jar should be ofthe smae jenkins version ...
        curl -s -z ./jenkins-cli.jar ${JENKINS_URL}/jnlpJars/jenkins-cli.jar -o ${jenkins_clinet_jar} || { echo &quot;Echo  cannot obtain jenkins-cli.jar exiting&quot;; exit 2;}
        cli_cmd=$1
        cmd_params=$2
        cmd_prefix=&quot;${JAVA_CMD} -jar ${jenkins_clinet_jar} -s ${JENKINS_URL}&quot;

        ${cmd_prefix} who-am-i | grep &#39;Authenticated as: anonymous&#39; &amp;&gt;/dev/null &amp;&amp; anon=0
        #anon=$?
        if [ &quot;$anon&quot; != &quot;0&quot; ]; then
                #printf &quot;[ $FUNCNAME ] using jenkins-cli with private key auth&quot;
                exec ${cmd_prefix} ${cli_cmd} ${cmd_params}
        elif [ &quot;x&quot; = &quot;x${JENKINS_USER}&quot; ] || [ &quot;x&quot;  = &quot;x${JENKINS_PASS}&quot; ]; then
                printf &quot;[ $FUNCNAME ] cannot determin jenkins credentials\n&quot;;
                exit 3;
        else
                exec ${cmd_prefix} ${cli_cmd} ${cmd_params} --username ${JENKINS_USER} --password ${JENKINS_PASS}
        fi
}

execJenkinsCli get-job ${tmpl_job_name}  | \
  ${XML} ed -O -S -P -u &#39;//project/scm/locations/hudson.scm.SubversionSCM_-ModuleLocation/remote&#39; -v ${scm_url} | \
  execJenkinsCli create-job ${new_job_name}

  execJenkinsCli enable-job ${new_job_name} # our template is usually disabled, thus the cloned one is too ...
</pre>
<p>The full jobGen wrapper script can be <a href="https://gist.github.com/hagzag/9b0d9d74d1920e248959">found here</a></p>
<p>Tieing it all together:</p>
<ol>
	<li>
		Create a template job [preferably keep it disabled so if it has SCM triggers it doesn&#39;t start on any scm change ...] - see <a href="https://gist.github.com/hagzag/62b48fee2e28a9cf32c7">this gist</a></li>
	<li>
		Create a job which will generate the jobs for you - ${PRODUCT_NAME}.JobGen - with parameters see <a href="https://gist.github.com/hagzag/cfe6f2d47d37249aed91">this gist</a><br />
		<img alt="Job Gen Parameters" src="{{ asset_path upload/29/JobGen-params.png }} />
		<ul>
			<li>
				template_job [default value = ${PRODUCT_NAME}.Template]</li>
			<li>
				new_job_name</li>
			<li>
				scm_url [ if you don&#39;t know how to fund see<a href="http://www.tikalk.com/alm/xmlstarlet-nifty-command-line-xml-toolkit"> this section </a>]</li>
		</ul>
	</li>
	<li>
		Provide the required permision for this job (so only permitted people can generate jobs ...)</li>
</ol>
<p>&nbsp;</p>
<p>A few workds about this script:</p>
<ol>
	<li>
		It&#39;s just an implementation example (which I changed from the original which was working with perforce) - yet it could work wth git too :)</li>
	<li>
		The execJenkinsCli script does a few things here:
		<ul>
			<li>
				Download the latest jenkins-cli.jar file - useful if you update jenkins and you want (believe me you do) the client to be up2dat with the server (it will not download if its the same version ...</li>
			<li>
				Check to see if your using a private / public key auth [ available since jenkins 1.419 ] and will change the execution accordingly</li>
		</ul>
	</li>
</ol>
<p>Hope you find this useful.</p>
<p>HP</p>
