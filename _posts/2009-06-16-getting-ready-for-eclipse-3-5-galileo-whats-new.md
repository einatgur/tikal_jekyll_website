---
layout: post
title: 'Getting Ready for Eclipse 3.5 (Galileo): What’s New?'
created: 1245187543
author: lior.kanfi
permalink: "/devops/getting-ready-eclipse-35-galileo-what’s-new"
tags:
- DevOps
- Galileo
---
<p>With the announcement of&nbsp; <a href="http://download.eclipse.org/eclipse/downloads/drops/S-3.5RC3-200905282000/">Release     Candidate 3</a>,&nbsp; it&rsquo;s a couple of weeks until Eclipse 3.5 code named &ldquo;Galileo&rdquo; will reach GA status. This new release of the popular Java development environment includes several new features and improvements over its previous version.</p>
<p>The new features include:</p>
<p>&nbsp;</p>
<p><b>Platform and UI</b></p>
<p>&nbsp;</p>
<p class="rteindent1">Solaris x86 has joined the lineup of supported     configuration</p>
<p class="rteindent1">The Install New Software wizard now supports auto-complete     in the Work with:combo</p>
<p class="rteindent1">A new intro theme called &quot;Slate&quot; has     been added</p>
<p class="rteindent1">Switching between open editors and multiple     editor pages has been streamlined.</p>
<p class="rteindent1">You can now safely skip the history cleanup step     for a faster shutdown</p>
<p class="rteindent1">For general prompts and dialogs regarding     editors, or the current Workbench window, sheets are now used on Mac Cocoa</p>
<p class="rteindent1">Applications can now programmatically select     portrait or landscape mode when printing, or when opening a PrintDialog.</p>
<p class="rteindent1">The Eclipse rich client platform now includes an     implementation of OSGi declarative services (DS)</p>
<p class="rteindent1">You can now pin the Properties view to a given     selection</p>
<p class="rteindent1">A new preference page supports managing the     startup prompt to select a workspace</p>
<p class="rteindent1">The About Dialog now provides a mechanism for     plug-ins to contribute installation pages to the platform about dialog</p>
<p class="rteindent1">The Install New Software wizard will now open     immediately without waiting to connect to any update sites</p>
<p class="rteindent1">Double-click on the vertical folding line now collapses     the folding region</p>
<p class="rteindent1">There are several enhancements to the Compare     Editor</p>
<p class="rteindent1">You can now quickly switch between suspended     threads in the Debug view</p>
<p class="rteindent1">Support for Cocoa and OpenGL on Cocoa</p>
<p class="rteindent1">Support has been added to the FileTransfer class to allow for copy/paste operations between the Explorer and the Nautilus file manager.</p>
<p class="rteindent1">Several Improvements on the Project Explorer</p>
<p class="rteindent1">Textual editors now support block (aka column or     rectangular) selection mode</p>
<p class="rteindent1">You can now apply a patch directly in the     Synchronize view</p>
<p class="rteindent1">Comparing Word document changes in Eclipse now     uses the Word compare support to show you the changes as revisions</p>
<p class="rteindent1">&nbsp;</p>
<p><b>Equinox</b></p>
<p>&nbsp;</p>
<p class="rteindent1">The Equinox DebugOptions API has been enhanced     to support dynamic changes to option settings</p>
<p class="rteindent1">A new debug tracing API, org.eclipse.osgi.service.debug.DebugTrace, has been added to enhance and simply writing of debug trace messages</p>
<p class="rteindent1">The OSGi R4.2 Core Specification is adding a       number of small API additions to the core Framework</p>
<p class="rteindent1">New Equinox concurrency API</p>
<p class="rteindent1">&nbsp;</p>
<p><b>Plug-in Development     Environment</b></p>
<p>&nbsp;</p>
<p class="rteindent1">There is a new new Target Platform State view</p>
<p class="rteindent1">You can now create and share a target definition     composed of software from software sites</p>
<p class="rteindent1">The new Category Definition editor can be used     to assign categories to features when exporting</p>
<p class="rteindent1">You can now view API changes relative to an API     baseline</p>
<p class="rteindent1">View information about menus by invoking Plug-in     Spy in menu introspection mode</p>
<p class="rteindent1">The OSGi Declarative Services (DS) tooling has     been enhanced to support the latest version of the DS specification</p>
<p class="rteindent1">You can now initialize product definitions from       OSGi launch configurations.</p>
<p class="rteindent1">There is a new target platform preference page</p>
<p class="rteindent1">Plug-in export now supports the creation of     source bundles</p>
<p class="rteindent1">The declarative services tooling now supports     the latest OSGi declarative services specification (1.1) update</p>
<p class="rteindent1">The JAR signing support in PDE has been expanded     to include support for keypasses</p>
<p class="rteindent1">The target editor has been enhanced to support     new features in target definitions</p>
<p class="rteindent1">API tools can now analyze use of system libraries and create problems when code accesses members that may not be present at runtime</p>
<p class="rteindent1">You can now launch JUnit Plug-in tests in a     non-UI thread</p>
<p class="rteindent1">Eclipse Application launch configurations now     support start levels and auto-start settings</p>
<p class="rteindent1">The Plug-in Registry view now supports browsing     for OSGi services</p>
<p class="rteindent1">A new extension has been added to PDE/Build that     enables users to fetch artifacts from p2 repositories</p>
<p class="rteindent1">API tooling now supports two restrictions on interfaces: @noimplement and @noextend. This allows an interface to be extended when it is not intended to be implemented directly</p>
<p class="rteindent1">You can now be alerted to breaking API changes     even if you have incremented the major version of your plug-in</p>
<p class="rteindent1">PDE has enhanced bundle and feature export to install the resulting exported bundles/feature into the currently running workbench</p>
<p class="rteindent1">Supports exporting features, plug-ins and     product with binary cycles</p>
<p class="rteindent1">PDE has added declarative services tooling to       help author service component definitions</p>
<p class="rteindent1">&nbsp;</p>
<p><b>Java development     tools</b></p>
<p>&nbsp;</p>
<p class="rteindent1">The NLS string hover now has an Open in     Properties File action</p>
<p class="rteindent1">In Callers mode, the Call Hierarchy now has an     Expand With Constructors action in the context menu</p>
<p class="rteindent1">The Java compare editor now updates its       structure while you are typing inside the editor</p>
<p class="rteindent1">There is a new toString() generator</p>
<p class="rteindent1">An Open Implementation hyperlink has been added     for overridable methods, which directly opens the implementation</p>
<p class="rteindent1">Compiler compliance follows execution     environment</p>
<p class="rteindent1">Debug view now offers a breadcrumb which shows     the current active debug context</p>
<p class="rteindent1">The Runnable JAR File Export wizard can now also package the required libraries into the exported runnable JAR file or into a folder next to the JAR</p>
<p class="rteindent1">Content Assist can now propose the available     constructors of a class when the completion happens in an allocation expression</p>
<p class="rteindent1">The compiler can now issue a warning if dead     code is detected</p>
<p class="rteindent1">The path of a library, variable or container     entry can now be anywhere relative to the project</p>
<p class="rteindent1">In the headers of Javadoc hovers and the Javadoc     view, references to other types and members are now links</p>
<p class="rteindent1">The JUnit4 version shipped with Eclipse has been     updated to 4.5</p>
<p class="rteindent1">The Javadoc view and hovers now support the     {@inheritDoc} tag and add links to overridden methods</p>
<p class="rteindent1">Comparing identical values is now detected by       the compiler and reported as a warning by default</p>
<p>&nbsp;</p>
<p>The <a href="http://wiki.eclipse.org/Galileo#Milestones_and_Release_Candidates">schedule     for the complete Galileo Simultaneous Release project</a> informs that there     will be 2 more RC before the GA version which is scheduled for June 24<sup>th</sup>.</p>
