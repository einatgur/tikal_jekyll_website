---
layout: post
title: 'Better Buttered: A look at Butter Knife, a View "injection" library for Android'
created: 1385560395
author: michaelh
permalink: better-buttered-look-butter-knife-view-injection-library-android
tags:
- Incubator
- Android
- annotation
- injection
---
<p>Better Buttered: A look at Butter Knife, a View &quot;injection&quot; library for Android</p>

<p>Code injection is usually something we try and avoid, but Jake Wharton of ActionBarSherlock fame (along with many other great open source Android libraries) is using injection for good.&nbsp; With his open source &ldquo;Butter Knife&rdquo; library, you can use annotations to conveniently create commonly used code for Views in Android.&nbsp; Let&rsquo;s take a look at how to implement it into your project today.</p>

<p><span style="font-size:20px;"><strong>Setup</strong></span></p>

<ol>
	<li>Add the library jar to your maven build or download from <a href="http://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&amp;g=com.jakewharton&amp;a=butterknife&amp;v=LATEST">here</a></li>
	<li>Add jar to your Android project(also java build) and configure appropriate annotation settings.&nbsp; See <a href="http://jakewharton.github.io/butterknife/ide-eclipse.html">here</a> for instructions for Eclipse and <a href="http://jakewharton.github.io/butterknife/ide-idea.html">here</a> for instructions for IntelliJ (if using external configuration, should just work without configuring).</li>
</ol>

<p>&nbsp;</p>

<p><span style="font-size:20px;"><strong>Implementation</strong></span></p>

<p>&nbsp;</p>

<p>Once the project and environment are correctly configured you can start using the annotation techniques to add convenience injection to your code.&nbsp; For instance if you would like to bind certain views you can use @InjectView annotation to bind view objects to their views (in addition the static inject function of ButterKnife must be called).&nbsp; For example if there is an EditText view in the corresponding xml with id R.id.editText, you can bind it to an EditText variable named text by the following</p>

<div><span style="font-family:courier new,courier,monospace;">@InjectView(R.id.editText) EditText text;</span></div>

<div><span style="font-family:courier new,courier,monospace;">@Override</span></div>

<div><span style="font-family:courier new,courier,monospace;">protected void onCreate(Bundle savedInstanceState) {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; super.onCreate(savedInstanceState);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; setContentView(R.layout.activity_main);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ButterKnife.inject(this);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;}</span></div>

<p>&nbsp;</p>

<p>In addition the Butter Knife library allows us to conviently set onClick methods for views.&nbsp; For instance if we had a Button buttonToast we could bind it and set an onClick listener with the code below</p>

<p>&nbsp;</p>

<div><span style="font-family:courier new,courier,monospace;">@InjectView(R.id.buttonAlert) Button buttonAlert;</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">@Override</span></div>

<div><span style="font-family:courier new,courier,monospace;">protected void onCreate(Bundle savedInstanceState) {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; super.onCreate(savedInstanceState);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; setContentView(R.layout.activity_main);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span><span style="font-family: 'courier new', courier, monospace; line-height: 1.6em;">ButterKnife.inject(this);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;}</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">@OnClick(R.id.buttonAlert)</span></div>

<div><span style="font-family:courier new,courier,monospace;">public void alertClicked(View v){</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; new AlertDialog.Builder(v.getContext())</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; .setMessage(getFormattedMessge())</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; .setNeutralButton(&quot;OK&quot;, new DialogInterface.OnClickListener() {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; @Override</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; public void onClick(DialogInterface dialog, int which) {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; dialog.dismiss();</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;}</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; })</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; .show();</span></div>

<div><span style="font-family:courier new,courier,monospace;">}</span></div>

<p>&nbsp;</p>

<p>In short, we can utilize Butter Knife to have cleaner and more understandable code and reduce development time but reducing redundant coding. &nbsp;Find out more about Butter Knife on <a href="http://jakewharton.github.io/butterknife/index.html">the official site</a>&nbsp;or <a href="https://github.com/JakeWharton/butterknife">the Butter Knife GitHub repo</a>.</p>

<p>&nbsp;</p>

<p>The code below is a full example of an Activity (and its corresponding layout) showing the usefulness of Butter Knife</p>

<p>&nbsp;</p>

<p><span style="font-size:20px;"><strong>MainActivity.java</strong></span></p>

<div><span style="font-family:courier new,courier,monospace;">package com.tikal.butterknife.example;</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">import butterknife.ButterKnife;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import butterknife.InjectView;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import butterknife.OnClick;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.os.Bundle;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.app.Activity;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.app.AlertDialog;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.content.DialogInterface;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.view.Menu;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.view.View;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.widget.Button;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.widget.EditText;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.widget.RatingBar;</span></div>

<div><span style="font-family:courier new,courier,monospace;">import android.widget.Toast;</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">public class MainActivity extends Activity {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private static final String PRE_TEXT1 = &quot;You have rated &quot;;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private static final String PRE_TEXT2 = &quot; with &quot;;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private static final String PRE_TEXT3 = &quot; stars&quot;;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @InjectView(R.id.editText) EditText text;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @InjectView(R.id.ratingBar) RatingBar rating;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @InjectView(R.id.buttonAlert) Button buttonAlert;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @InjectView(R.id.buttonToast) Button buttonToast;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Override</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; protected void onCreate(Bundle savedInstanceState) {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; super.onCreate(savedInstanceState);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; setContentView(R.layout.activity_main);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ButterKnife.inject(this);</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; }</span></div>

<div>&nbsp;</div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; @Override</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; public boolean onCreateOptionsMenu(Menu menu) {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Inflate the menu; this adds items to the action bar if it is present.</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; getMenuInflater().inflate(R.menu.main, menu);</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return true;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; }</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; @OnClick(R.id.buttonAlert)</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; public void alertClicked(View v){</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;new AlertDialog.Builder(v.getContext())</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; .setMessage(getFormattedMessge())</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; .setNeutralButton(&quot;OK&quot;, new DialogInterface.OnClickListener() {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; @Override</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; public void onClick(DialogInterface dialog, int which) {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; dialog.dismiss();</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }</span><span style="font-family: 'courier new', courier, monospace; line-height: 1.6em;">})</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; .show();</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; }</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; @OnClick(R.id.buttonToast)</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; public void toastClicked(View v){</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;Toast.makeText(v.getContext(), getFormattedMessge(), Toast.LENGTH_LONG).show();</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; }</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private String getFormattedMessge() {</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; return PRE_TEXT1 + text.getText().toString() + PRE_TEXT2 + rating.getRating() + PRE_TEXT3;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; }&nbsp;&nbsp;&nbsp;</span></div>

<div><span style="font-family:courier new,courier,monospace;">}</span></div>

<p>&nbsp;</p>

<p><span style="font-size:20px;"><strong>activity_main.xml</strong></span></p>

<div><span style="font-family:courier new,courier,monospace;">&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; xmlns:tools=&quot;http://schemas.android.com/tools&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; android:layout_width=&quot;match_parent&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; android:layout_height=&quot;match_parent&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; tools:context=&quot;.MainActivity&quot; &gt;</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; &lt;EditText</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:id=&quot;@+id/editText&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_width=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_height=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_alignParentTop=&quot;true&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_marginTop=&quot;20dp&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_centerHorizontal=&quot;true&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:ems=&quot;10&quot; &gt;</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;requestFocus /&gt;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; &lt;/EditText&gt;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;RatingBar</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:id=&quot;@+id/ratingBar&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_width=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_height=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_below=&quot;@+id/editText&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_centerHorizontal=&quot;true&quot; /&gt;</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; &lt;Button</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:id=&quot;@+id/buttonToast&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; style=&quot;?android:attr/buttonStyleSmall&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_width=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_height=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_centerHorizontal=&quot;true&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_below=&quot;@+id/ratingBar&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:text=&quot;Toast&quot; /&gt;</span></div>

<div>&nbsp;</div>

<div>&nbsp;</div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; &lt;Button</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:id=&quot;@+id/buttonAlert&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; style=&quot;?android:attr/buttonStyleSmall&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_width=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;android:layout_height=&quot;wrap_content&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_centerHorizontal=&quot;true&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:layout_below=&quot;@+id/buttonToast&quot;</span></div>

<div><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; android:text=&quot;Alert&quot; /&gt;</span></div>

<div>&nbsp;</div>

<div><span style="font-family:courier new,courier,monospace;">&lt;/RelativeLayout&gt;</span></div>
