---
layout: post
title: Installing Gitorious on centos 5.5
created: 1281391653
author: shalom
permalink: "/devops/installing-gitorious-centos-55"
tags:
- DevOps
- git gitorious centos 5.5
---
<p>I recently installed <a href="http://gitorious.org/">Gitorious</a> on our centos 5.5 development machine and written down this recipe of the steps I took to acomplish it.</p>
<p>this is not a complete guide to installing gitorious and some of the steps here may be different depending on the os version, installed packages etc.</p>
<p>you should consult other documents available on the web, I followed these guides and a lot of googling and <a href="http://groups.google.com/group/gitorious">gitorious google group</a>, read them for more details on the various components.</p>
<p><br />
http://cjohansen.no/en/ruby/setting_up_gitorious_on_your_own_server<br />
http://gitorious.com/gitorious/mainline/blobs/master/doc/recipes/install-centos.txt</p>
<p>&nbsp;</p>
<p>Most of the scripts I use are taken from gitorious doc/recipes/ with my changes, check to see there are no major changes in future releases of gitorious. the scripts are attched here as a zip file. Please register to view and download attached zip.</p>
<p>&nbsp;</p>
<p>My installation assumes there is ruby 1.8 installed on the machine and we want to use ruby 1.9 with gitorious, so we'll install ruby 1.9 to a non standard location and we have to remember that all the way.</p>
<p>&nbsp;</p>
<p>http clones are disabled, it requires a domain name with no subdomain, like http://tikalk.com, gitorious uses a subdomain 'git.' for http clones.</p>
<p>&nbsp;</p>
<p>We will use <a href="http://mmonit.com/monit/">Monit</a> to control and monitor the various daemons, its the last section of this doc.</p>
<p>&nbsp;</p>
<p>This installation procedure is for centos 5.5, it should be identical on other versions except for the package installations.<br />
you should check every command before executing it, this is not a script.</p>
<p>&nbsp;</p>
<p>note that if any step during the process fails you end up with a non working gitorious and a hard time finding the problems.</p>
<p>&nbsp;</p>
<p>I do not explain how to set up gitorious for ssl and this installation disables ssl.</p>
<p>&nbsp;</p>
<p>choose a name for the site, we're using git.tikalk.com.<br />
Gitorious needs to be able to resolve its site name through dns, If installing on a vm or on a home network with no dns, add an alias in the hosts file on the machine where gitorious is installed. and also on your client machine.<br />
for example:<br />
192.168.1.107&nbsp;&nbsp;&nbsp; git.tikalk.com</p>
<p>&nbsp;</p>
<p>lets start..</p>
<p>All the following is executed with root privileges, and as 'git' user where noted.</p>
<p>&nbsp;</p>
<h5>Install a whole banch of packages</h5>
<p>install rpmforge<br />
http://wiki.centos.org/AdditionalResources/Repositories/RPMForge?action=show&amp;redirect=Repositories/RPMForge<br />
<br />
install epel repository<br />
http://fedoraproject.org/wiki/EPEL/FAQ#How_can_I_install_the_packages_from_the_EPEL_software_repository.3F<br />
<br />
install yum priorities<br />
http://wiki.centos.org/PackageManagement/Yum/Priorities<br />
<br />
in my setup epel and rpmforge have the same priority.<br />
&nbsp;</p>
<pre class="brush: python;" title="code">
yum update
yum groupinstall &quot;Development tools&quot;</pre>
<p>because I started with a clean os I just took this list from yum log. some of these may not be necessary because I installed some tools to work with like screen.</p>
<pre title="code" class="brush: python;">
yum install imake pyspi autoconf automake libstdc++ libtool automake17 pstack redhat-rpm-config automake14 automake15\
automake16 apr neon apr-util libtermcap-devel glibc-devel keyutils-libs-devel libsepol-devel libselinux-devel\
e2fsprogs-devel krb5-devel curl-devel cyrus-sasl-devel apr-devel openldap-devel expat-devel db4-devel apr-util-devel\
httpd-devel sphinx bzip2-devel libtiff-devel lcms-devel ghostscript-devel libXau-devel  uuid uuid-devel memcached\
libntlm libntlm libgsasl libgsasl-devel libgpg-error-devel libgcrypt-devel gnutls-devel libidn-devel mod_xsendfile\
distcache apg geoip httpd sqlite sqlite-devel httpd-devel libjpeg libjpeg-devel readline-devel curl-devel pcre pcre-devel\
zlib zlib-devel openssl openssl-devel libyaml libyaml-devel gcc gcc-c++ autoconf automake readline readline-devel\
glibc-devel openssl openssl-devel pcre pcre-devel kernel-devel kernel-headers glibc-common glibc-headers sqlite-devel\
ruby-sqlite3 dspam-sqlite3 java-1.6.0-openjdk java-1.6.0-openjdk-devel aspell aspell-en


yum install git git-svn
</pre>
<h5>&nbsp;</h5>
<h5>Install some packages from source</h5>
<p>gitorious currently works with those version, you may want to try newer versions.</p>
<pre title="code" class="brush: python;">
cd /usr/src
	
wget 'http://www.geocities.jp/kosako3/oniguruma/archive/onig-5.9.1.tar.gz'
tar xvfz onig-5.9.1.tar.gz 
cd onig-5.9.1
./configure 
make &amp;&amp; make install
cd ..

yum remove ImageMagick
wget 'ftp://ftp.imagemagick.net/pub/ImageMagick/ImageMagick-6.5.9-10.tar.gz'
tar xvzf ImageMagick-6.5.9-10.tar.gz
cd ImageMagick-6.5.9-10
./configure --prefix /usr 
make &amp;&amp; make install</pre>
<p>&nbsp;</p>
<p>note the /usr prefix in ImageMagick, or install to the default location and create links to /usr/bin , <br />
I think ruby needs that in /usr/bin and not /usr/local/bin which is the default for ImageMagick.<br />
If you installed ImageMagick to the default location then link it.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
sudo ln -s /usr/local/bin/Magick-config /usr/bin/Magick-config
sudo ln -s /usr/local/bin/Magick++-config /usr/bin/Magick++-config
sudo ln -s /usr/local/bin/MagickCore-config /usr/bin/MagickCore-config
sudo ln -s /usr/local/bin/MagickWand-config /usr/bin/MagickWand-config
cd ..</pre>
<p>&nbsp;</p>
<h5>Install and setup mysql</h5>
<pre title="code" class="brush: python;">
yum install mysql mysql-server mysql-devel mysql++-devel mysql++

chkconfig --add mysqld
chkconfig mysqld on

service mysqld start
mysqladmin -u root password 'root'
</pre>
<p>&nbsp;</p>
<p>set password to all root accounts and remove anonymous accounts<br />
http://dev.mysql.com/doc/refman/5.1/en/default-privileges.html<br />
http://dev.mysql.com/doc/refman/5.1/en/adding-users.html</p>
<p>login to mysql client program and:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
create database gitorious;
CREATE USER 'gitorious'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON gitorious.* TO 'gitorious'@'localhost';
</pre>
<p>&nbsp;restart mysql.</p>
<p>&nbsp;</p>
<h5>Install activemq</h5>
<p>if using a different activemq version check its docs.<br />
disable multicasting if its enables.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
cd /usr/src
wget 'http://apache.spd.co.il/activemq/apache-activemq/5.3.2/apache-activemq-5.3.2-bin.tar.gz'
tar xzvf apache-activemq-5.3.2-bin.tar.gz -C /usr/local/
ln -s /usr/local/apache-activemq-5.3.2 /usr/local/apache-activemq
sh -c 'echo &quot;export ACTIVEMQ_HOME=/usr/local/apache-activemq&quot; &gt;&gt; /etc/activemq.conf'
sh -c 'echo &quot;export JAVA_HOME=/usr/&quot; &gt;&gt; /etc/activemq.conf'
sh -c 'echo &quot;export ACTIVEMQ_OPTS=\&quot;-Xmx512M\&quot;&quot; &gt;&gt; /etc/activemq.conf'

adduser activemq
chown -R activemq /usr/local/apache-activemq/data
</pre>
<p>&nbsp;</p>
<p>do this fix:<br />
http://activemq.apache.org/web-console.html<br />
<br />
there is probably a bug with jmx:<br />
https://issues.apache.org/activemq/browse/AMQ-2122<br />
in a vm or local network add the hostname from /etc/sysconfig/network to /etc/hosts, it will fix the jmx problem.</p>
<p>we're going to use the stomp connector,<br />
backup activemq.xml</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
mv /usr/local/apache-activemq/conf/activemq.xml /usr/local/apache-activemq/conf/activemq.xml.org</pre>
<p>and enable the stomp configuration</p>
<pre title="code" class="brush: python;">
cp /usr/local/apache-activemq/conf/activemq-stomp.xml /usr/local/apache-activemq/conf/activemq.xml</pre>
<p>&nbsp;</p>
<p>make sure the transport connectors look like that:</p>
<pre title="code" class="brush: python;">
&lt;transportConnectors&gt;
            &lt;transportConnector name=&quot;stomp&quot; uri=&quot;stomp://0.0.0.0:61612?transport.closeAsync=false&quot;/&gt;
            &lt;transportConnector name=&quot;stomp+nio&quot; uri=&quot;stomp+nio://0.0.0.0:61613?transport.closeAsync=false&quot;/&gt;
&lt;/transportConnectors&gt;</pre>
<p>&nbsp;</p>
<p>we will disable the web console and demos , comment or delete this line in activemq.xml:<br />
&lt;import resource=&quot;jetty.xml&quot;/&gt;</p>
<p>&nbsp;</p>
<p>we will run activemq with the java service wrapper,<br />
see activemq startup script in the attached zip, copy it to /etc/init.d/activemq.<br />
notice this script is for 64 bit machine, replace linux-x86-64 with linux-x86-32 if your on a 32 bit machine. <br />
see the actiivemq launchers in ACTIVEMQ_HOME/bin/linux.<br />
make is executable.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
chmod u+x /etc/init.d/activemq</pre>
<pre title="code" class="brush: python;">
mkdir -p /var/run/activemq
/sbin/chkconfig --add activemq
/sbin/chkconfig activemq on
</pre>
<p>start it</p>
<pre title="code" class="brush: python;">
/etc/init.d/activemq start</pre>
<p>&nbsp;</p>
<p>check that activemq is running</p>
<pre title="code" class="brush: python;">
netstat -an|grep &quot;61612&quot;
netstat -an|grep &quot;61613&quot;</pre>
<p>&nbsp;</p>
<p>monitoring activemq<br />
there are many ways to monitor activemq:<br />
http://activemq.apache.org/how-can-i-monitor-activemq.html<br />
<br />
you can enable activemq web console at http://localhost:8161/admin/<br />
see: http://activemq.apache.org/web-console.html<br />
<br />
we will just enable jmx monitoring at the command line from localhost, we don't want to expose too many ports on this machine. if activemq is going to be under high load then other approaches are necessary.<br />
<br />
just tell activemq to start a management connector:<br />
see: http://activemq.apache.org/jmx<br />
in activemq.xml</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
&lt;managementContext&gt;
            &lt;managementContext createConnector=&quot;true&quot; connectorPort=&quot;1999&quot;/&gt;
&lt;/managementContext&gt;</pre>
<p>&nbsp;</p>
<p>and restart activemq<br />
<br />
and using the command line tools we can now query activemq:<br />
see: http://activemq.apache.org/activemq-command-line-tools-reference.html<br />
<br />
list brokers:<br />
/usr/local/apache-activemq/bin/activemq-admin list --jmxurl service:jmx:rmi:///jndi/rmi://localhost:1999/jmxrmi<br />
<br />
to view all mbeans and their attributes:<br />
/usr/local/apache-activemq/bin/activemq-admin query --jmxurl service:jmx:rmi:///jndi/rmi://localhost:1999/jmxrmi<br />
<br />
to view all Gitorious queues and their attributes:<br />
/usr/local/apache-activemq/bin/activemq-admin query -QQueue=*Git* --jmxurl service:jmx:rmi:///jndi/rmi://localhost:1999/jmxrmi</p>
<p>&nbsp;</p>
<p>Create /etc/logrotate.d/activemq</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
/usr/local/apache-activemq/data/*log {
    missingok
    notifempty
}
</pre>
<p>and set its permissions:</p>
<pre title="code" class="brush: python;">
chmod 644 /etc/logrotate.d/activemq</pre>
<p>&nbsp;</p>
<h5>Install memcached</h5>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
yum install memcached
/sbin/chkconfig --add memcached
/sbin/chkconfig memcached on
/sbin/service memcached start
</pre>
<p>&nbsp;</p>
<h5>Install ruby</h5>
<p>As mantioned, we already have ruby 1.8 installed and used as default ruby by some applications, we don't want to override the default installation,so we'll install ruby-1.9.1 to /usr/local/ruby/ruby191 and add symlinks:<br />
/usr/local/ruby/ruby-home -&gt; /usr/local/ruby/ruby191<br />
/usr/local/ruby/gem-home -&gt; /usr/local/ruby/ruby191/lib/ruby/gems/1.9.1<br />
/usr/local/ruby/ruby -&gt; /usr/local/ruby/ruby191/bin/ruby<br />
/usr/local/ruby/gem -&gt; /usr/local/ruby/ruby191/bin/gem<br />
/usr/local/ruby/rake -&gt; /usr/local/ruby/ruby191/bin/rake</p>
<p>&nbsp;</p>
<p>We will add the path to ruby191 in every script we use, we will export those in git's user bashrc file.<br />
with this setup it should be easy to install another ruby version and replace a ruby version for Gitorious.<br />
for example for trying ruby enterprise edition.<br />
replacing a ruby version requires changing those links and changing the passenger LoadModule directive to reflect the required ruby installation.<br />
see bug: http://www.ruby-forum.com/topic/213353</p>
<p>note that I had strange problems with newer ruby patch levels, you may want to try other patches, 378 works.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
cd /usr/src
wget 'ftp://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.1-p378.tar.gz'
tar xvzf ruby-1.9.1-p378.tar.gz
cd ruby-1.9.1-p378
./configure --prefix /usr/local/ruby/ruby191
make &amp;&amp; make install
/usr/local/ruby/ruby191/bin/gem update --system
cd ..

ln -s /usr/local/ruby/ruby191 /usr/local/ruby/ruby-home
ln -s /usr/local/ruby/ruby191/lib/ruby/gems/1.9.1 /usr/local/ruby/gem-home
ln -s /usr/local/ruby/ruby191/bin/ruby /usr/local/ruby/ruby
ln -s /usr/local/ruby/ruby191/bin/gem /usr/local/ruby/gem
ln -s /usr/local/ruby/ruby191/bin/rake /usr/local/ruby/rake</pre>
<p>export some paths on the current shell for the rest of the installation process:</p>
<pre title="code" class="brush: python;">
export RUBY_HOME=/usr/local/ruby/ruby-home
export GEM_HOME=/usr/local/ruby/gem-home
export PATH=$RUBY_HOME/bin:$PATH</pre>
<p>&nbsp;</p>
<h5>Install gems</h5>
<p>REMEMBER TO USE /usr/local/ruby/gem , if the paths above where exported then just gem would be the correct version.<br />
we must make sure all gems are installed correctly or we'll have a lot of pain later..<br />
when I installed everything works great, if you're not lucky newer gems version may expose problems.</p>
<p>&nbsp;</p>
<p>aword about gems:</p>
<p>I'm not a ruby developer but I&nbsp;know all the following gems should be installed succesfuly , some of them don't always succeed because of compatability issues. for example I could install mongrel only with: gem install mongrel --pre</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
/usr/local/ruby/gem uninstall json_pure
/usr/local/ruby/gem install json_pure --no-ri --no-rdoc --version=&quot;1.2.3&quot;

/usr/local/ruby/gem install rack --no-ri --no-rdoc --version=&quot;1.0.1&quot;

/usr/local/ruby/gem install rdiscount --no-ri --no-rdoc --version=&quot;1.3.1.1&quot;
/usr/local/ruby/gem install stomp --no-ri --no-rdoc --version=&quot;1.1&quot;
/usr/local/ruby/gem install diff-lcs --no-ri --no-rdoc
</pre>
<p>&nbsp;</p>
<p>install more gems</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
/usr/local/ruby/gem install --no-ri --no-rdoc rails mongrel ruby-hmac ruby-openid mime-types oniguruma textpow chronic \
BlueCloth ruby-yadis ruby-openid rmagick geoip ultrasphinx rspec rspec-rails RedCloth echoe daemons geoip mysql rmagick</pre>
<p>&nbsp;</p>
<p>If all this went well we won't need any other gems. if not, ruby will complain during db migrate or other stages and we will probably be in a problem..</p>
<p>&nbsp;</p>
<p>Install ruby data base binding, this is important<br />
read this:<br />
http://forums.mysql.com/read.php?116,359591,359591#msg-359591<br />
http://forums.mysql.com/read.php?116,353922,359544#msg-359544</p>
<p>&nbsp;</p>
<p>run command mysql_config and copy the path from the line that starts with Usage: <br />
&quot;Usage: /usr/lib/mysql/mysql_config [OPTIONS]&quot;<br />
and install mysql-ruby with --with-mysql-config=</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
wget 'http://rubyforge.org/frs/download.php/51087/mysql-ruby-2.8.1.tar.gz'
tar xzvf mysql-ruby-2.8.1.tar.gz
cd mysql-ruby-2.8.1
/usr/local/ruby/ruby extconf.rb --with-mysql-config=/usr/lib/mysql/mysql_config
make &amp;&amp; sudo make install</pre>
<p>&nbsp;</p>
<h5>Install and configure gitorious</h5>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
mkdir -p /opt/gitorious
cd /opt/gitorious/
git clone git://gitorious.org/gitorious/mainline.git gitorious
ln -s /opt/gitorious/gitorious/ /var/www/gitorious
cd /var/www/gitorious
ln -s /opt/gitorious/gitorious/script/gitorious /usr/local/bin/gitorious
rm /opt/gitorious/gitorious/public/.htaccess
mkdir log
mkdir tmp
mkdir tmp/pids
mkdir public/tarballs-cache
mkdir public/tarballs-work</pre>
<p>&nbsp;</p>
<p>create git user</p>
<pre title="code" class="brush: python;">
adduser git
chown -R git:git /opt/gitorious/
mkdir /var/git
chown -R git:git /var/git
</pre>
<p>&nbsp;</p>
<p><strong>FROM NOW ON WE ARE LOOGED WITH git USER</strong></p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
su git </pre>
<p>the git user will always use our new ruby version.<br />
edit /home/git/.bashrc or /home/git/.bash_profile and add the following three lines:</p>
<pre title="code" class="brush: python;">
export RUBY_HOME=/usr/local/ruby/ruby-home
export GEM_HOME=/usr/local/ruby/gem-home
export PATH=$RUBY_HOME/bin:$PATH

</pre>
<p>source it:</p>
<pre class="brush: python;" title="code">
source /home/git/.bashrc</pre>
<p>&nbsp;</p>
<p><strong>PERMISIONS HERE ARE CRITICAL OR GIT DAEMON WILL NOT WORK</strong></p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
mkdir /home/git/.ssh
chmod -R 700 /home/git/.ssh
touch /home/git/.ssh/authorized_keys
chmod 600 /home/git/.ssh/authorized_keys
mkdir /opt/gitorious/repos
chmod -R 700 /opt/gitorious/repos
cd /var/www/gitorious
chmod ug+x script/*
chmod -R ug+w config/ log/ public/ tmp/
cp config/database.sample.yml config/database.yml
cp config/gitorious.sample.yml config/gitorious.yml
cp config/broker.yml.example config/broker.yml</pre>
<p>&nbsp;</p>
<p>edit config/database.yml and set mysql password in the production section.<br />
edit config/gitorious.yml, follow the instructions in the doc/recipes/install-centos.txt.<br />
make sure to edit the production section and NOT the test section.<br />
create the secret with 'apg -m 64' and paste it as a one line to the property cookie_secret.</p>
<p>gitorious.yml:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: python;">
cookie_secret: BeijeunchumJodheyddivpoavNopZobegipjissoshVoabWudsOvCepaigvarsIdSwiavyitMityoryisBakinwuxyeitOrrAtAdd,ufDejaur(oshDyRyncyftyojImtocImRatunfewnErnepVeyChejdedpafCupBochHennEnAwcawpisdabsOkOjbebecOkPowOrgyedLotPosEgnitDouvrainQuaijShelpajPhutechdoumsAwUcWeuvmeufnishnybErkOrgavFawyefradoodcanEaravNinHuvkunRinobsOlojencoj8thympIaglothelCiefekAfthijyeargyac\glyGrasopundojNoblerd^OfNabif

  repository_base_path: &quot;/opt/gitorious/repos&quot;
  extra_html_head_data:
  system_message:
  gitorious_client_port: 80
  gitorious_client_host: git.tikalk.com
  gitorious_host: git.tikalk.com
  gitorious_user: git
  gitorious_support_email: 'gitorious@tikalk.com'
  exception_notification_emails:  'gitorious@tikalk.com'
  mangle_email_addresses: true
  public_mode: true
  locale: en
  archive_cache_dir: &quot;/var/www/gitorious/public/tarballs-cache&quot;
  archive_work_dir: &quot;/var/www/gitorious/public/tarballs-work&quot;
  only_site_admins_can_create_projects: false
  hide_http_clone_urls: true
  is_gitorious_dot_org: false</pre>
<p>&nbsp;</p>
<p>NOTE:<br />
the archive_cache_dir in gitorious.yml must point to a folder under gitorious public or we'll not ba able to download tarballs, I couldn't make it work even with xsendfile XSendFileAllowAbove on.I could make http clones work only if the git repos are also under gitorious public, not when the repos are under /home/git, so its not a good solution, still have to figure that out.</p>
<p>&nbsp;</p>
<p>NOTE:<br />
our site name is git.tikalk.com, the cname git. is reserved by gitorious and used to identify http clones. it requires us to have another domain name, one without a subdomin, and therefor we disabled http clones.there's another thing to do, edit app/models/site.rb and change HTTP_CLONING_SUBDOMAIN to something other then git otherwise gitorious will constantly complain in log messages about that 'git.' is reserved. this is only when your site name starts with git.</p>
<p>&nbsp;</p>
<p>There's nothing to do in config/broker.yml</p>
<p>&nbsp;</p>
<p>Remember: our ruby installation is in git's PATH</p>
<pre title="code" class="brush: python;">
cd /var/www/gitorious</pre>
<p>if all went well with our gems installations earlier then the following will do nothing.</p>
<pre title="code" class="brush: python;">
rake gems:install RAILS_ENV=production</pre>
<p>make sure the log dir is owned by git, if not change it</p>
<pre title="code" class="brush: python;">
chown -R git:git log</pre>
<p>migrate db:</p>
<pre title="code" class="brush: python;">
rake db:migrate RAILS_ENV=production</pre>
<p>Then, add a site administrator:</p>
<pre title="code" class="brush: python;">
env RAILS_ENV=production ruby script/create_admin</pre>
<p>&nbsp;</p>
<p>ultrasphinx bootstrap, this will actually start the ultrasphinx search daemon, we will create a startup script for it later.</p>
<pre title="code" class="brush: python;">
rake ultrasphinx:bootstrap RAILS_ENV=production</pre>
<p>add crontabs (still with git user):</p>
<pre title="code" class="brush: python;">
crontab -e
* */1 * * * cd /var/www/gitorious &amp;&amp; /usr/local/ruby/rake ultrasphinx:index RAILS_ENV=production</pre>
<p>&nbsp;</p>
<p>disable girorious ssl:<br />
edit config/environments/production.rb and add a line:<br />
&nbsp;&nbsp; SslRequirement.disable_ssl_check = true<br />
- TODO: enable ssl</p>
<p>&nbsp;</p>
<p>to force production uncomment this line in config/environment.rb<br />
ENV['RAILS_ENV'] ||= 'production'</p>
<p>&nbsp;</p>
<p><strong>LOGOUT FROM GIT USER TO ROOT</strong></p>
<p>&nbsp;</p>
<p>Create /etc/logrotate.d/gitorious<br />
TODO: I'm not sure why gitorious docs suggest to restart the daemons with logrotate? when monitoring the daemons with monit then the postrotate script is not necessary.<br />
paste this content to /etc/logrotate.d/gitorious:</p>
<pre title="code" class="brush: python;">
/var/www/gitorious/log/*log {
    missingok
    notifempty
    sharedscripts
    postrotate
        /sbin/service git-daemon restart &gt; /dev/null 2&gt;/dev/null || true
	/sbin/service git-poller restart &gt; /dev/null 2&gt;/dev/null || true
        /bin/touch /var/www/gitorious/tmp/restart.txt &gt; /dev/null 2&gt;/dev/null || true
endscript
}

/var/www/gitorious/db/sphinx/log/*log {
    missingok
    notifempty
    sharedscripts
    postrotate
        /sbin/service git-ultrasphinx restart &gt; /dev/null 2&gt;/dev/null || true
endscript
}</pre>
<p>change the file permission</p>
<pre title="code" class="brush: python;">
chmod 644 /etc/logrotate.d/gitorious</pre>
<p>&nbsp;</p>
<h5>Install Phusion Passenger</h5>
<p>make sure our ruby installation is still in you path, or export it:</p>
<pre title="code" class="brush: python;">
export RUBY_HOME=/usr/local/ruby/ruby-home
export GEM_HOME=/usr/local/ruby/gem-home
export PATH=$RUBY_HOME/bin:$PATH
</pre>
<p>then:</p>
<pre title="code" class="brush: python;">
gem install passenger --no-rdoc --no-ri
/usr/local/ruby/ruby-home/lib/ruby/gems/1.9.1/bin/passenger-install-apache2-module
</pre>
<p>follow instructions, copy and keep the directives it prints at the end of the installation, it will be something like this:</p>
<pre title="code" class="brush: python;">
LoadModule passenger_module /usr/local/ruby/ruby191/lib/ruby/gems/1.9.1/gems/passenger-2.2.15/ext/apache2/mod_passenger.so
   PassengerRoot /usr/local/ruby/ruby191/lib/ruby/gems/1.9.1/gems/passenger-2.2.15
   PassengerRuby /usr/local/ruby/ruby191/bin/ruby
</pre>
<p>&nbsp;</p>
<h5>Apache httpd</h5>
<p>&nbsp;</p>
<pre class="brush: python;" title="code">
yum install mod_xsendfile</pre>
<p>&nbsp;</p>
<p>on a clean install edit /etc/httpd/conf.d/welcome.conf and change &quot;Options -Indexes&quot; to &quot;Options Indexes&quot;.<br />
<br />
as root create a file /etc/httpd/conf.d/gitorious.conf, copy the file from the attached zip and replace the passenger directives with the output from passenger installations change server name an other values.<br />
read about xsendfile.<br />
restart apache.</p>
<p>&nbsp;</p>
<p>if you have permission errors when starting apache see this:</p>
<p>http://www.modrails.com/documentation/Users%20guide.html#_the_apache_error_log_says_that_the_spawn_manager_script_does_not_exist_or_that_it_does_not_have_permission_to_execute_it</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h5>Setting up daemons</h5>
<p>&nbsp;</p>
<p>create git-daemon <br />
see&nbsp; git-daemon in the attached zip.<br />
copy it to /etc/init.d/git-daemon.<br />
change the ruby path to reflect your installation.<br />
make it executable.</p>
<pre title="code" class="brush: python;">
chmod +x /etc/init.d/git-daemon</pre>
<p>add it as a init script:</p>
<pre title="code" class="brush: python;">
/sbin/chkconfig --add git-daemon
/sbin/chkconfig git-daemon on

/etc/init.d/git-daemon start
</pre>
<p>the git daemon listenes on port 9418 for git clone requests, we shoud open that port in centos:</p>
<pre title="code" class="brush: python;">
iptables -A INPUT -p tcp --dport 9418 -j ACCEPT
service iptables save</pre>
<p>&nbsp;</p>
<p>create ultrasphinx daemon.<br />
see git-ultrasphinx in the attached zip.<br />
copy it to /etc/init.d/git-ultrasphinx.<br />
make it executable.</p>
<pre title="code" class="brush: python;">
chmod +x /etc/init.d/git-ultrasphinx</pre>
<p>add it as a init script:</p>
<pre title="code" class="brush: python;">
/sbin/chkconfig --add git-ultrasphinx
/sbin/chkconfig git-ultrasphinx on
- start it, or restart because it was started before when we bootstrupted it
/etc/init.d/git-ultrasphinx restart
</pre>
<p>&nbsp;</p>
<p>create poller daemon.<br />
note that its possible to execute a few poller instances, we will only execute one.<br />
its pid file is: /var/www/gitorious/tmp/pids/poller0.pid<br />
remember also that the poller depends on activemq and wil not start if activemq is not running.<br />
see git-poller in the attached zip.<br />
copy it to /etc/init.d/git-poller.<br />
make it executable.</p>
<pre title="code" class="brush: python;">
chmod +x /etc/init.d/git-poller</pre>
<pre title="code" class="brush: python;">
/sbin/chkconfig --add git-poller
/sbin/chkconfig git-poller on
- start it
/etc/init.d/git-poller start</pre>
<p>&nbsp;</p>
<p>check it with:<br />
ps U git <br />
you should see git-daemon, searchd and poller, and maybe some cron jobs, this is my output:<br />
[root@centos www]# ps U git<br />
&nbsp; PID TTY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; STAT&nbsp;&nbsp; TIME COMMAND<br />
17586 ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sl&nbsp;&nbsp;&nbsp;&nbsp; 0:00 /usr/local/ruby/ruby-home/bin/ruby /var/www/gitorious/script/git-daemon -d<br />
17774 ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0:00 searchd --config /var/www/gitorious/config/ultrasphinx/production.conf<br />
17855 ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rl&nbsp;&nbsp;&nbsp;&nbsp; 0:06 poller&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
17859 ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0:00 crond<br />
17860 ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ss&nbsp;&nbsp;&nbsp;&nbsp; 0:00 /bin/sh -c cd /var/www/gitorious &amp;&amp; /usr/local/ruby/rake ultrasphinx:index RAILS_ENV=production<br />
17861 ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rl&nbsp;&nbsp;&nbsp;&nbsp; 0:00 /usr/local/ruby/ruby191/bin/ruby /usr/local/ruby/rake ultrasphinx:index RAILS_ENV=production<br />
<br />
<br />
or <br />
netstat -an|grep 9418<br />
you should see the git-daemon process<br />
<br />
netstat -an|grep 3312<br />
for ultrasphinx<br />
<br />
&nbsp;</p>
<p>&nbsp;</p>
<h5>Email setup</h5>
<p>We'll send notification emails through a gmail account.<br />
The best is to configure sendmail, I didn't.<br />
Gitorious uses sendmail by default , or it can be setup to send smtp directly,some problems I had: couldn't make ruby smtp send emails through a gmail account, and even if I could I don't think it will overcome network errors and queue emails for later sending, sendmail will but is too much configuration. So i'm using a solution common to the Mutt community, msmtp which is sendmail compatible(almost) , and msmtpq wrapper scripts to overcome failure when sending. msmtpq and msmtpQ are two scripts, msmtpQ send emails and if it fails it keeps them in a file system queue. msmtpq can priodically process this queue and try to send the emails. so we'll use msmtpQ to send emails and set a cron job to run msmtpq for every 10 minutes.<br />
<br />
msmtpq has recently been updated to be one script but I couldn't make it work, it keeps a queue file also with success.<br />
http://www.mail-archive.com/msmtp-users@lists.sourceforge.net/msg00127.html<br />
<br />
I will use the two scripts I have on my machine or you can try and find them somewhere in mutt users mailing list.<br />
I also could not find a recent centos RPM for msmtp, it is easily installed on ubuntu , opensuse and debian, nothing for centos.</p>
<p>so we'll install froum source:<br />
make sure you have those packages installed:</p>
<pre title="code" class="brush: python;">
yum install openssl openssl-devel libgsasl libgsasl-devel gnutls gnutls-devel libidn libidn-devel
</pre>
<p>&nbsp;and install msmtp:</p>
<pre class="brush: python;" title="code">
cd /usr/src
wget 'http://sourceforge.net/projects/msmtp/files/msmtp/1.4.21/msmtp-1.4.21.tar.bz2/download'
tar xjvf msmtp-1.4.21.tar.bz2
cd msmtp-1.4.21
./configure
make &amp;&amp; make install</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>create the two scripts msmtpq and msmtpQ, copy them from the attached zip file, or try to find them in <a href="http://www.mail-archive.com/mutt-users@mutt.org/">mutt users - mailing list</a>.<br />
in both you can change three arguments: Q for the queue location, LOG for log location, and the MSMTP executable. defaults are good for me, see where msmtp was installed for you.<br />
copy both scripts to /usr/local/bin and make them executable.</p>
<pre title="code" class="brush: python;">
chmod +x /usr/local/bin/msmtpQ
chmod +x /usr/local/bin/msmtpq
</pre>
<p>&nbsp;</p>
<p>NOTE:<br />
look at vendor/rails/actionmailer/lib/action_mailer/base.rb line 690,if there will be a return-path configured then emails will not be sent, it will break the msmtp command line.</p>
<p>&nbsp;</p>
<p><strong>LOGIN with git user</strong></p>
<pre title="code" class="brush: python;">
su git
touch ~/.msmtprc
chmod 600 ~/.msmtprc
</pre>
<p>NOTE: if the queue directory does not exist sending mail will fail and ruby just reports a broken pipe, even though msmtp does return a nice message. so create the queue folder:</p>
<pre title="code" class="brush: python;">
mkdir ~/.msmtp.queue</pre>
<p>create the log files otherwise the scripts fail, couldn't find the time to fix it. and thus 'create' in the logrotate is mandatory.</p>
<pre title="code" class="brush: python;">
touch ~/.msmtpq.log
touch ~/.msmtpQ.log
touch ~/.msmtp.log</pre>
<p>still logged with git user edit ~/.msmtprc and change to your email account:</p>
<p>msmtprc:</p>
<p>remove the ' from the email addresses, I put it just to fix a html error in this post.</p>
<pre class="brush: python;" title="code">
defaults
account default
host smtp.gmail.com
port 587
timeout off
auth on
user 'gitorious@tikalk.com'
password PASSWORD
auto_from off
from 'gitorious@tikalk.com'
tls on
tls_starttls on
tls_certcheck off
maildomain gmail.com
logfile ~/.msmtp.log</pre>
<p>&nbsp;</p>
<p>config gitorious with msmtpQ</p>
<pre title="code" class="brush: python;">
cd /var/www/gitorious
cp config/environments/production.rb config/environments/production.rb.org
</pre>
<p>edit config/environments/production.rb,<br />
find the line :</p>
<p>config.action_mailer.delivery_method = :sendmail<br />
and add bellow it:</p>
<pre title="code" class="brush: ruby;">
config.action_mailer.sendmail_settings = {
        :location =&gt; &quot;/usr/local/bin/msmtpQ&quot;,
        :arguments =&gt; &quot;-t -- &quot;
        }</pre>
<p>Notice the arguments, it will not work without the -- , it was a lot of pain to figure that out.<br />
The application will run with the git user and environment and thus will use the .msmtprc in git's home.<br />
as I mentioned before, see vendor/rails/actionmailer/lib/action_mailer/base.rb</p>
<p>&nbsp;</p>
<p>finally create a cron job for msmtpq, still with git user logged in. the cron should run with git's environment and thus use the .msmtprc in git's home. This job will do nothing most of the time.</p>
<pre title="code" class="brush: python;">
crontab -e
*/10 * * * *     /usr/local/bin/msmtpq -r
</pre>
<p>&nbsp;</p>
<p>to check email sending is working from ruby:<br />
login as git and cd to /var/www/gitorious.<br />
start irb:</p>
<pre title="code" class="brush: ruby;">
irb(main):001:0&gt; IO.popen(&quot;/usr/local/bin/msmtpQ -t -- shalom@tikalk.com&quot;,&quot;w+&quot;) do |sm|
irb(main):002:1* sm.print(&quot;Hello from irb&quot;)
irb(main):003:1&gt; sm.flush
irb(main):004:1&gt; end
</pre>
<p>the email should be send or you'll see the eror if ruby prints it.</p>
<p>&nbsp;</p>
<p>NOTE: if for some reason a user registered but didn't receive the email he will be pending activation and will not be able to register again with that email. in this case either delete the record in the db or copy the registration time column to the activation time column.</p>
<p>&nbsp;</p>
<p><strong>LOGOUT FROM git user.</strong></p>
<p>&nbsp;</p>
<p>Create /etc/logrotate.d/git-msmtp with this content:</p>
<pre title="code" class="brush: python;">
/home/git/.msmtp*log {
    create
    missingok
    notifempty

}</pre>
<p>and set its permisions:</p>
<pre title="code" class="brush: python;">
chmod 644 /etc/logrotate.d/git-msmtp</pre>
<p>&nbsp;</p>
<p>you may want to create a cron to delete the spool mails that git user receives for all the other cron jobs, to view those emails: mutt -f /var/spool/mail/git</p>
<pre title="code" class="brush: python;">
crontab -e
@weekly rm /var/spool/mail/git</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h5>Monitoring daemons with Monit</h5>
<p>read monit docs at http://mmonit.com/monit/<br />
we can install monit with yum from epel repository, but to get the latest version:</p>
<pre title="code" class="brush: python;">
wget 'http://packages.sw.be/monit/monit-5.1.1-1.el5.rf.x86_64.rpm'
or for 32 bit os:
wget 'http://packages.sw.be/monit/monit-5.1.1-1.el5.rf.i386.rpm'

rpm -i monit-5.1.1-1.el5.rf.XXX.rpm

sudo chmod 0700 /etc/monit.conf
</pre>
<p>the rpm installes a sysv init script for monit but we want it to start by inittab,so remove the sysv init script:</p>
<pre title="code" class="brush: python;">
chkconfig monit off</pre>
<p>remember that git-poller depends on activemq.</p>
<p>we will start our daemons with monit so first remove them from sysv init:</p>
<pre title="code" class="brush: python;">
chkconfig git-daemon off
chkconfig git-ultrasphinx off
chkconfig git-poller off
chkconfig activemq off</pre>
<p>&nbsp;</p>
<p>create a file /etc/monit.d/gitorious-monitrc, copy from attached zip.<br />
make sure you set the correct pid files for the daemons, mine may be different locations then yours, aspecially the activemq one depends on the OS arch.<br />
I'm not going to document all details on configuring monit, read the monit manual.<br />
with activemq monit will monitor the java warper, the java wraper monitors the real java process.</p>
<p>in monit.conf: REMOVE&nbsp;THE&nbsp;' FROM&nbsp;THE&nbsp;EMAIL&nbsp;ADDRESS</p>
<pre title="code" class="brush: python;">
set daemon 120 with start delay 240
set logfile /var/log/monit.log
set idfile /var/.monit.id
set statefile /var/.monit.state

set alert 'youremail@somewhere.com'  with reminder on 5 cycle

set mailserver 
smtp.gmail.com port 465 username &quot;community@tikalk.com&quot; password &quot;xxx&quot; using SSLV3, 
smtp.gmail.com port 587 username &quot;community@tikalk.com&quot; password &quot;xxx&quot; using TLSV1,
     with timeout 15 seconds

set eventqueue
      basedir /var/monit
      slots 5000
</pre>
<p>run syntax check with monit -t</p>
<p>we start monit from init, add to /etc/inittab:</p>
<pre title="code" class="brush: python;">
mo:2345:respawn:/usr/bin/monit -Ic /etc/monit.conf</pre>
<p>then:</p>
<pre title="code" class="brush: python;">
telinit q</pre>
<p>&nbsp;</p>
<p>Create /etc/logrotate.d/monit with this content:</p>
<pre title="code" class="brush: python;">
/var/log/monit.log {
    create
    missingok
    notifempty
}</pre>
<p>and change its permissions:</p>
<pre title="code" class="brush: python;">
chmod 644 /etc/logrotate.d/monit</pre>
<p>&nbsp;</p>
<p>set your time zone by changing in config/environmet.rb<br />
config.time_zone = 'UTC'<br />
to your time zone.<br />
discover timezones with:<br />
su - git<br />
cd /var/www/gitorious<br />
rake -D time<br />
rake time:zones:local<br />
<br />
restart gitorious with:<br />
touch tmp/restart.txt<br />
&nbsp;</p>
<p>&nbsp;</p>
<p>we're done, restart apache.</p>
<p>You may encounter problems related to SELinux so you can disable SELInux and when everything works enable it and hope it still works, or fix the SELinux issues.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
