---
layout: post
title: How to create a corporate test-store for Android and iOS applications
created: 1386075016
author: yorammi
permalink: how-to-create-a-corporate-test-store-for-android-and-ios-applications
tags:
- DevOps
- Mobile
- test
- store
- Android
- iOS
---
<p>During my <a href="http://www.slideshare.net/YoramMichaeli/what-boxismissing">RUNTIME BOXES FOR MOBILE or THE MISSING BOX</a>&nbsp;presentation I&#39;ve mentioned and showed a test-store which will enable corporate users to download and install Android applications before it is being uploaded to the store (Google Play, Amazon store and such).</p>

<p>This test-store can be very useful to organizations during their developement process for checking those applications before uploding it to the store to be available to customers.</p>

<p>This is valid for both Android and iOS appliactions (and probably also for Windows RT applications but I didn&#39;t tested it yet).</p>

<p>One option is to use cloud services such as <a href="https://testflightapp.com/">TestFlight</a>&nbsp;which manage all issues of provisionling, user-management and security very well but may have issues with multiple-uploads, adjustments to specific orginization needs and more.</p>

<p>Another option is to create corporate test-store which will be inhouse service available only to corporate users.</p>

<p>For establishment of such service you need to create a simple web-server which will expose 2 services:</p>

<ol>
	<li>Web page (HTML based) with list of available applications that includes the application-artifact-file (APK or IPA file) itself and information related to it.</li>
	<li>Shared folder with write-access so that a build process (preferred) or a manual upload will be able to upload the application-artifact-file and it&#39;s related information onto the server</li>
</ol>

<p>It would be best that an automatic process will build the application, upload it onto the web-server-shared folder and update the web page(s) accordingly (The automation of such process can be a subject for another post). Still, this can be done manually for each new version of an application.</p>

<p>If the site supports iOS applications (IPA files), it is important to set the site mime-types to identify <em>.plist</em> files as &#39;text/xml&#39; files. Please see <a href="http://tikalk.com/node/12276">Building iOS Apps over-the-air site</a> for more details.</p>

<p>For each application you better expose some information about it - except for the a link to the application for download and install -&nbsp;such as: application-display-name, icon, version, corporate-internal-meta-data (such as SDK version, group-of-applications, status and more) and build-information (date, builder name, etc.).</p>

<p>Here&#39;s an example of a test-store as I&#39;ve presentated in my presentation:</p>

<p><img alt="" src="{% asset_path default/TestStore.png %}" style="width: 400px; height: 300px;" /></p>

<p>Enjoy.</p>

<p>&nbsp;</p>

<p>&nbsp;</p>
