---
layout: post
title: C# WinForms - Janus UITab Control Extension Method - RestoreTabs after tab
  closed or container resized
created: 1300751347
author: dror
permalink: "/android/c-winforms-janus-uitab-control-extension-method-restoretabs-after-tab-closed-or-container"
tags:
- ".NET"
- WinForms
- UITabPage
- UITab
- Tab Close
- Resize
- Janus
- Extension Method
- c#
---
<p>Restore Janus UITabPages after a tab is closed or the control is resized. Hide the navigation tool if that's applicable.&nbsp;Use C# Extension Methods to do that.</p>
<!--break-->
<p>&nbsp;Recently I was asked to resolve an issue with <a href="http://www.janusys.com/controls/">Janus Systems</a>&nbsp;UITab Control.</p>
<p>&nbsp;</p>
<p><u><strong>The Problem</strong></u></p>
<p>Whenever the user opens too many tabs some of the tabs are &quot;pushed&quot; over the visible area and are hidden from the user. A couple of navigation arrows are made available and the user can &quot;browse&quot; between the open tabs.</p>
<p>&nbsp;</p>
<p>Now, when the user closes a tab and there's enough space for hidden tabs to return into view one would expect that the tab would refresh itself, hide the navigation arrows if that's applicable and will be more dynamic. But what do you know it doesn't ...</p>
<p>&nbsp;</p>
<p><u><strong>The Solution</strong></u></p>
<p>In order to fix the issue and add this desired behavior to the UITab I looked into <a target="_blank" href="http://msdn.microsoft.com/en-us/library/bb383977.aspx">C# Extension Methods</a>, in short, it enable you to extend an existing control or an object without inheriting it and committing to all it's interfaces.</p>
<p>&nbsp;</p>
<p>I've added my own UITabExtensionMethods class and implemented a quick and elegant solution.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;">
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Janus.Windows.UI.Tab;

namespace UITabExt {
    /// &lt;summary&gt;
    /// Extend Janus UITab Control
    /// &lt;/summary&gt;
    public static class UITabExtensionMethods {

        /// &lt;summary&gt;
        /// This extension method takes care of restoring the displayed tab whenever
        /// a tab is closed or the UITab control is resized.
        /// This method should be invoked whenever &quot;&lt;b&gt;uiTab1_SelectedTabChanged&lt;/b&gt;&quot;
        /// or &quot;&lt;b&gt;uiTab1_Resize&lt;/b&gt;&quot; events are fired/
        /// This method tries to find the newly/selected tab, preserve it.
        /// The it will check if there are any TabPages to show.
        /// If there are it will invoke the EnusreVisible call twice,
        /// the first time is the the 1st tab (index = 0) and then the 2nd
        /// time is for the preserved tab.
        /// This will ensure us that whenever a TabPage is closed or the UITab is resized
        /// the tab strip (if it is shown) will display all the tabs that should be visible
        /// &lt;/summary&gt;
        /// &lt;param name=&quot;_uiTab&quot;&gt;&lt;/param&gt;
        public static void RestoreTabs(this UITab _uiTab) {
            // Ensure that our UITab object is initalized, if not exit gracefully.
            if (_uiTab == null) {
                return;
            }
   
            // Ensure that the parent form exists and that it is not minimized, if
            // so do nothing and exit
            From from = _uiTab.FindForm();

            if (form == null || form.WindowState == FormWindowState.Minimized)
            {
               return;
            }

            // If there are no tabs open, do nothing
            if (_uiTab.TabPages.Count &gt; 0) {
                // Define a local TabPage object to preserve the selected TabPage
                UITabPage selectedTabPage = _uiTab.SelectedTab;

                // First show the first tab
                _uiTab.EnsureVisible(_uiTab.TabPages[0]);

                // If a selected TabPage exists (not null)
                // Check if the selected tab is the first tab (index = 0),
                // if so, do nothing, otherwise show it
                if (selectedTabPage != null) {
                    if (selectedTabPage.Index &gt; 0) {
                        _uiTab.EnsureVisible(selectedTabPage);
                    }
                }
            }
        }
    }
}
</pre>
<p>&nbsp;</p>
<p>This solution works as it uses the control's own refresh mechanism.</p>
<p>&nbsp;</p>
<p>In order to invoke this extension method I've hooked into two event handlers for my UITab control, see below:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;">
        #region UITab Event Handlers

        /// &lt;summary&gt;
        /// 
        /// &lt;/summary&gt;
        /// &lt;param name=&quot;sender&quot;&gt;&lt;/param&gt;
        /// &lt;param name=&quot;e&quot;&gt;&lt;/param&gt;
        private void uiTab1_SelectedTabChanged(object sender, Janus.Windows.UI.Tab.TabEventArgs e) {
            uiTab1.RestoreTabs();
        }

        /// &lt;summary&gt;
        /// 
        /// &lt;/summary&gt;
        /// &lt;param name=&quot;sender&quot;&gt;&lt;/param&gt;
        /// &lt;param name=&quot;e&quot;&gt;&lt;/param&gt;
        private void uiTab1_Resize(object sender, EventArgs e) {
            uiTab1.RestoreTabs();
        }

        #endregion</pre>
<p>&nbsp;</p>
<p>Enjoy</p>
