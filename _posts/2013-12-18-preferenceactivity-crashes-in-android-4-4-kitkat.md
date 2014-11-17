---
layout: post
title: PreferenceActivity Crashes in Android 4.4 (KitKat)
created: 1387358231
author: michaelh
permalink: preferenceactivity-crashes-android-4-4-kitkat
tags:
- Incubator
- fragment
- PreferenceActivity
- KitKat
- Android
---
<p>Are you using a custom&nbsp;PreferenceActivity&nbsp;in your Android application? &nbsp;Well then you better push a quick update because chances are your application will crash on Android 4.4.</p>

<p><span style="line-height: 1.6em;">Why? &nbsp;There was a new method &#39;</span><span style="font-family:georgia,serif;"><span class="normal">protected boolean&nbsp;</span><span class="sympad" style="margin-right: 2px;">isValidFragment</span>&nbsp;</span><span class="normal"><span style="font-family:georgia,serif;">(String&nbsp;fragmentName)</span>&#39;&nbsp;</span><span style="line-height: 1.6em;">added to the&nbsp;PreferenceActivity in API 19. &nbsp;The purpose of this protected method is probably to prevent issues with <a href="http://securityintelligence.com/new-vulnerability-android-framework-fragment-injection/#">Fragment Injection</a>. The default implementation of isValidFragment <a href="http://developer.android.com/reference/android/preference/PreferenceActivity.html#isValidFragment(java.lang.String)">will throw an exception for KitKat and above</a>.</span></p>

<p>How can you fix it? &nbsp;Simply add an implementation for &#39;isValidFragment&#39; to your class that derives from PreferenceActivity (example below). &nbsp;And let the app updates begin!</p>

<blockquote>
<p>protected boolean isValidFragment (String fragmentName)<br />
{<br />
&nbsp; &nbsp; if(MyPreferencesFragment.class.getName().equals(fragmentName)){<br />
&nbsp; &nbsp; &nbsp; &nbsp; return true;<br />
&nbsp; &nbsp; }<br />
&nbsp; &nbsp; return false;<br />
}</p>
</blockquote>

<p>&nbsp;</p>
