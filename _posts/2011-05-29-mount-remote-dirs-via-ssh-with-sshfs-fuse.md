---
layout: post
title: Mount remote dirs via ssh with sshfs / fuse
created: 1306703837
author: hagzag
permalink: "/devops/mount-remote-dirs-ssh-sshfs-fuse"
tags:
- DevOps
- ssh
---
<p>Well, there is nothing like a simple and easy innovative solutions to save the day -it's been around for quite a while and never really needed it until now ...</p>
<p>&nbsp;</p>
<p><u><strong>Use Case</strong></u><strong>:</strong></p>
<p>we moved Subversion from server A to server B and we wanted to bea ble to utilze the same backup scripts we were using so one (not real elegant way) was to mount the remote location via NFS which has its issues, from time to time you will meet stale NFS records and such so that is almost in all cases out of the question.</p>
<p>&nbsp;</p>
<p>A neat solution would be to mount over SSH a specific directory run svnhotbackup and close the share, I took this to another level by utilising this over a VDSL connection which worked like a charm, so how do we do this ?</p>
<p>&nbsp;</p>
<p>If you are on Ubuntu (<a href="#aptget">see install snippet below</a>):</p>
<p>&nbsp;</p>
<pre title="code" class="brush: css;">
sudo apt-get install sshfs
</pre>
<p>add fuse to your /etc/modules [edit /etc/modules and add the word fuse on a single line]</p>
<pre title="code" class="brush: css;">
vi /etc/modules ...
</pre>
<p>&nbsp;</p>
<p>On CentOs / Redhat / Fedora [ you need to enable <em><strong>rpmforge</strong></em> / <em><strong>epel</strong></em> repository ] - (<a href="#yum">see install snippet below</a>):</p>
<p>&nbsp;</p>
<p>on the host you want to mount generate an ssh key by executing</p>
<p>&nbsp;</p>
<pre title="code" class="brush: css;">
ssh-genkey -t rsa 
</pre>
<p>[press return twice with no passphrase]</p>
<pre title="code" class="brush: css;">
ssh-copy-id -i ~/.ssh/id_rsa.pub user@remotehost
</pre>
<p>- this will automatically add the public key to the ~/.ssh/authorized_keys file on the remote server for the specified user.  make a directory representing your remote server</p>
<pre title="code" class="brush: css;">
mkdir /mnt/remoteservername
</pre>
<p>Then in any place you can execute [prompt / shell script]:</p>
<pre title="code" class="brush: css;">
sshfs username@ipaddress:/remote/directory /mnt/remoteservername
</pre>
<p>then you can of course run:</p>
<pre title="code" class="brush: css;">
ls -l /mnt/remoteservername 
</pre>
<p>as if you were running on the local machine.  Back to our story above we could noe reference our svn setup as if it was local by running:</p>
<pre title="code" class="brush: css;">
svnadmin hotbackup /mnt/remoteservername/svn /my-local-bakcup-directory.
</pre>
<p>This quite neat don't you think ?</p>
<p>&nbsp;</p>
<p><a name="aptget">install snippet Ubuntu 11.04</a></p>
<pre title="code" class="brush: c++;">
user@myhost:~$ sudo apt-get install sshfs
[sudo] password for hagzag: 
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following NEW packages will be installed:
  sshfs
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 40.8 kB of archives.
After this operation, 143 kB of additional disk space will be used.
Get:1 http://il.archive.ubuntu.com/ubuntu/ natty/main sshfs i386 2.2-1build1 [40.8 kB]
Fetched 40.8 kB in 0s (164 kB/s)
Selecting previously deselected package sshfs.
(Reading database ... 176464 files and directories currently installed.)
Unpacking sshfs (from .../sshfs_2.2-1build1_i386.deb) ...
Processing triggers for man-db ...
Setting up sshfs (2.2-1build1) ...
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><a name="yum">install snippet centos-5.5</a></p>
<pre class="brush: c++;" title="code">
yum install fuse-sshfs
Loaded plugins: downloadonly, fastestmirror, priorities
Loading mirror speeds from cached hostfile
 * addons: centos.fastbull.org
 * base: centos.fastbull.org
 * epel: mirror01.th.ifl.net
 * extras: centos.fastbull.org
 * rpmforge: apt.sw.be
 * updates: centos.fastbull.org
158 packages excluded due to repository priority protections
Setting up Install Process
Resolving Dependencies
--&gt; Running transaction check
---&gt; Package fuse-sshfs.i386 0:2.2-5.el5 set to be updated
--&gt; Processing Dependency: fuse &gt;= 2.2 for package: fuse-sshfs
--&gt; Processing Dependency: libfuse.so.2(FUSE_2.2) for package: fuse-sshfs
--&gt; Processing Dependency: libfuse.so.2(FUSE_2.7) for package: fuse-sshfs
--&gt; Processing Dependency: libfuse.so.2(FUSE_2.6) for package: fuse-sshfs
--&gt; Processing Dependency: libfuse.so.2 for package: fuse-sshfs
--&gt; Processing Dependency: libfuse.so.2(FUSE_2.5) for package: fuse-sshfs
--&gt; Running transaction check
---&gt; Package fuse.i386 0:2.7.4-8.el5 set to be updated
---&gt; Package fuse-libs.i386 0:2.7.4-8.el5 set to be updated
--&gt; Finished Dependency Resolution

Dependencies Resolved

=======================================================================================================
 Package                               Arch            Version            Repository         Size
=======================================================================================================
Installing:
 fuse-sshfs                            i386            2.2-5.el5          rpmforge            51 k
Installing for dependencies:
 fuse                                  i386            2.7.4-8.el5        base                83 k
 fuse-libs                             i386            2.7.4-8.el5        base                72 k

Transaction Summary
=======================================================================================================
Install       3 Package(s)
Upgrade       0 Package(s)

Total download size: 206 k
Is this ok [y/N]: y
Downloading Packages:
(1/3): fuse-sshfs-2.2-5.el5.i386.rpm                                               |  51 kB     00:00     
(2/3): fuse-libs-2.7.4-8.el5.i386.rpm                                              |  72 kB     00:01     
(3/3): fuse-2.7.4-8.el5.i386.rpm                                                   |  83 kB     00:00     
---------------------------------------------------------------------------------------------------------
Total                                                                      47 kB/s | 206 kB     00:04     
Running rpm_check_debug
Running Transaction Test
Finished Transaction Test
Transaction Test Succeeded
Running Transaction
  Installing     : fuse-libs       1/3 
  Installing     : fuse            2/3 
  Installing     : fuse-sshfs      3/3 
Installed:
  fuse-sshfs.i386 0:2.2-5.el5                                                                                                                                                                                  
Dependency Installed:
  fuse.i386 0:2.7.4-8.el5  fuse-libs.i386 0:2.7.4-8.el5 Complete!
</pre>
<p>&nbsp;</p>
