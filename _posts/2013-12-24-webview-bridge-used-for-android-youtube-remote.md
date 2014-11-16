---
layout: post
title: WebView Bridge used for Android YouTube Remote
created: 1387910339
author: michaelh
permalink: webview-bridge-used-for-android-youtube-remote
tags:
- .NET
- Android
- Angular
- SignalR
- Hybrid
---
<p>What do you get when you mix an Android WebView with some AngularJS and sprinkle on some&nbsp;SignalR and a little native to boot? &nbsp;A new way to watch YouTube using YouTube Remote.</p>

<p>The YouTube Remote project, recently developed at the Tikal FuseDay Hackathon on December 24th 2013, allows users to select videos from their PC and play those videos on any connected (application running) Android device.</p>

<p>How does it work (See diagram)? &nbsp;An Android WebView is connected remotely to an Angular application that utilizes SignalR to communicate between the Android devices and the desktop clients. &nbsp;A light WebView bridge was built in order to connect the signals recieved from the WebView (running an&nbsp;Angular application utilizing SignalR) to a native YouTubePlayerView in order to play videos upon request.</p>

<p><img alt="" src="{% asset_path default/Slide1.PNG %}" style="width: 960px; height: 720px;" /></p>

<p>The light Android bridge allows code re-use on the remotely hosted Angular application. &nbsp;This offers two main advantages:</p>

<p>1) Quick updates to through application by pushing updates to remote server hosting the Angular application.</p>

<p>2) Share code by hosting the communication code on a shared remote server.</p>
