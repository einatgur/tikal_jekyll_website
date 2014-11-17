---
layout: post
title: Getting Started With Xcode
created: 1302035634
permalink: getting-started-with-xcode
tags:
- Incubator
- Mobile
- iOS
---
<p>I have been developing for iPhone for almost 2 years now.  I got started when my company asked if anyone had experience in iPhone development and of course I raised my hand and said “I do”!  Little did they know,  I had never opened xcode let alone compiled a single iPhone app.</p>
<p>I spent the next two weeks watching Stanford University’s iPhone lectures during my train rides to work each day.  I quickly learned all about Objective C and Apple’s strict guidelines for deploying apps on the Apple App Store.  I would like to share some of my experiences with you here.</p>
<p>If you are serious about iPhone development then the following are absolutely required:</p>
<p>1) Mac – for developing</p>
<p>2) iPhone – for debugging</p>
<p>3) Apple Developer Account – to install apps on your iPhone</p>
<p>4) xcode – iPhone SDK version</p>
<p>5) a little patience <img src='http://ogonium.com/wp-includes/images/smilies/icon_wink.gif' alt=';)' class='wp-smiley' /> </p>
<p>OK,  now I am sure some of you are not thrilled at the idea of having to shell out your hard earned cash on that Mac you are going to need.  Some of you might even think about taking a PC and “turning” it into a Mac by downloading some version of the OSX86 project.  I highly recommend getting a Mac that supports the latest version of xcode.  Your life as an iPhone developer will be much easier.</p>
<p>Next you should get yourself an iPhone.  This is important since you will need to test any app you create on a device before you upload it to apple for approval.  The simulator included with xcode is great but, it will not come close to showing you what your actual user experience is going to be.  The simulator is running on your computer and therefore the CPU is faster,  battery is a non-issue and any animations you create will perform very well.  Testing on a device will also reveal any memory leaks you may have so you can figure out how to fix ‘em.</p>
<p>Next I recommend getting a developer license.  Head on over to:<a href="http://developer.apple.com/devcenter/ios/index.action" target="_blank">http://developer.apple.com/devcenter/ios/index.action</a>.  Here you will find a great deal of help.  Take some time to read some of the How-Tos and watch some of the videos.   If you don’t already have an Apple ID create one and login.  You don’t have to pay any money just yet.  You can download xcode for free.  The first time you will have to worry about money is when you want to start testing on your device.  You will need to purchase an annual license to be a member of the Apple Developer Program.  The cost is 99 dollars.</p>
<p>Once you download xcode run the installer.  When it is done find it in your Application folder and run it.  You will get the following window:</p>
<p>Xcode Opening Window.</p>
<div class="wp-caption alignnone" style="width: 816px"><img title="Xcode Opening Window" src="{% asset_path default/Screen-shot-2011-02-17-at-3.55.00-PM.png %}" alt="Xcode Opening Window" width="806" height="528" /><p class="wp-caption-text">Xcode Opening Window</p></div>
<p>Click on: Create a new Xcode project.</p>
<p>The next window will look something like this:</p>
<p>Xcode Project Types.</p>
<div class="wp-caption alignnone" style="width: 779px"><img title="Xcode Project Types" src="{% asset_path default/Screen-shot-2011-02-17-at-4.03.51-PM.png %}" "alt="Xcode Project Types." width="769" height="721" /><p class="wp-caption-text">Xcode Project Types.</p></div>
<p>Go ahead and select Navigation based application.  Also,  select the check box for Core Data.  Core Data is described here: <a href="http://en.wikipedia.org/wiki/Core_Data" target="_blank">http://en.wikipedia.org/wiki/Core_Data</a> and a great tutorial is here:<a href="http://blog.sallarp.com/iphone-core-data-uitableview-drill-down/" target="_blank">http://blog.sallarp.com/iphone-core-data-uitableview-drill-down/</a>.</p>
<p>Once you complete the new project wizard your xcode window will look something like this:</p>
<p>Xcode Project Window.</p>
<div class="wp-caption alignnone" style="width: 903px"><img title="Xcode Project Window" src="{% asset_path default/Screen-shot-2011-02-17-at-4.03.51-PM.png %}" "alt="Xcode Project Window" width="893" height="825" /><p class="wp-caption-text">Xcode Project Window</p></div>
<p>Now I will briefly explain what the folders and items are in the xcode project.  The blue icon at the top represents the project and double clicking on it will open a window to configure project properties.  In this window you will be able to configure things like build output folder,  target os,  and developer certificate configuration.  It is a good idea to open this window and look through it to familiarize yourself with what is available.  However,  when getting started it is not likely you will have to touch any of these settings.</p>
<p> </p>
<p>The next folder is called Classes.  This is where you can (and should) store all your classes that will make up your models, controllers, and views.  Xcode won’t enforce any of this, but it is a good idea to keep your code organized into logical sections.</p>
<p> </p>
<p>Other sources starts out containing a *.pch file and your application’s main.m file.  Your application will run in a loop.  It will listen for user interaction and other events from the system and process them in the main run loop.  You will most likely never touch this file.  The *.pch file is your pre compiled header.  It is not necessary to ever edit this file.  However,  sometimes you will want to define some application level constants using #define and this is a good place to put them.  This way all your constants will be available throughout your application.</p>
<p> </p>
<p>The resources folder will contain your application images,  sounds,  database diagrams (if using core data) and any XIB files you create to represent your views.  I usually add subfolders to store the images and XIBs separately so I can easily find the file I want to work on later.</p>
<p> </p>
<p>Frameworks contains libraries that are used in your application.  For example, if you want to add support for Maps to your application you would right click on this folder and select add existing Framework.  In the popup that shows next select the MapKit.framwork folder and click OK.  The folder already comes configured with the most commonly used Frameworks.  UIKit contains the views like buttons,  switches,  view controllers and labels your app will use.  Foundation contains objects to represent strings,  url requests,  dates and other such datatypes.  If you open the folder with the arrow next to it you can see the header files included with each framework.  This will help determine what each framework can do.  Coregraphics is used to draw on the screen.  Lastly,  CoreData contains the headers to support the coredata feature we selected when opting for coredata support when we created our app.</p>
<p> </p>
<p>The Products folder contains a shortcut to your app.  Until you first compile your app it will show up in red text indicating that Xcode cannot find it in the specified location.  This is fine.</p>
<p> </p>
<p>Targets contains references to your application bundle.  Here you can configure what headers and source files and XIBs will get compiled into your app.  More often this will just happen on its own and it will be rare that you have to even venture inside this folder.</p>
<p> </p>
<p>Executibles contains a reference to you app as an executable.  Double clicking on the contents will show a window where you can configure items such as launch parameters.</p>
<p> </p>
<p>Find results will contain active project searches.  Select Edit -> Find -> Find In Project…  to bring up the project find window.  Once you do a search you can close the window and the results will appear here as well.</p>
<p> </p>
<p>Bookmarks will contain your project bookmarks.  To add a bookmark simply press Command+D while at a particular line of code and type a name.  The newly created bookmark will appear in the Bookmarks folder of your Xcode project.</p>
<p> </p>
<p>SCM will contain information regarding source control management.  I will not go into particulars here but it is worth looking up.</p>
<p> </p>
<p>The Project Symbols smart group, one of the built-in smart groups provided by Xcode, allows you to view all of the symbols defined in your project. You can sort symbols by type, name, file, and file path, and you can search for symbols that match a string. To see the symbols defined in your project, select the Project Symbols smart group in the Groups & Files list. The detail view displays the symbols in your project.</p>
<p> </p>
<p>The last two items are smart folders that contain your projects implementation (*.m) and XIB files.</p>
<p> </p>
<p>The project that we added sets up a basic app for you that contains the following important classes</p>
<p> </p>
<p>1) DemoAppDelegate – This is your app’s delegate class.</p>
<p>2) RootViewController – This is the view controller that is first displayed.</p>
<p>3) Demo.xcdatamodel – This contains the CoreData Entity Diagram.</p>
<p>4) MainWindow.xib – the first XIB file used to define the view.</p>
<p>5) RootViewController.xib – Defines the view used in the RootViewController.</p>
<p> </p>
<p>If you click the build and run button you will see the following running inside the simulator window:</p>
<p>Xcode Simulator Window.</p>
<div class="wp-caption alignnone" style="width: 657px"><img title="Xcode Simulator Window" src="{% asset_path default/Screen-shot-2011-02-20-at-10.52.42-AM.png %}" "alt="Xcode Simulator Window" width="647" height="965" /><p class="wp-caption-text">Xcode Simulator Window</p></div>
<p>This is what you for free when creating a new UINavigation based project.</p>
<p> </p>
<p>To get you started I will show you the code that gets the view up and the code that handles the buttons displayed.</p>
<p> </p>
<p>Inside the DemoAppDelegate.m file you will see a function like this:</p>
<p> </p>
<p><code>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {</p>
<p>// Override point for customization after application launch.</p>
<p>// Add the navigation controller's view to the window and display.</p>
<p>[self.window addSubview:navigationController.view];</p>
<p>[self.window makeKeyAndVisible];</p>
<p>return YES;</p>
<p>}<br />
</code><br />
 </p>
<p>As the name implies this function is run when the application is done starting up for the first time.  The navigationController which is defined inside the MainWindow.xib file is added as the main view of the window.  The navigationController contains a root view controller called RootViewController that contains the code for the buttons that are used to edit and add new items to the table view.</p>
<p> </p>
<p>Inside the RootViewController.m file there is a function:</p>
<p> </p>
<p><code>- (void)viewDidLoad {</p>
<p>[super viewDidLoad];<br />
// Set up the edit and add buttons.</p>
<p>self.navigationItem.leftBarButtonItem = self.editButtonItem;<br />
UIBarButtonItem *addButton = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemAdd target:selfaction:@selector(insertNewObject)];</p>
<p>self.navigationItem.rightBarButtonItem = addButton;</p>
<p>[addButton release];</p>
<p>}</code></p>
<p> </p>
<p>This function adds the edit button defined in the RootViewController.xib file as the navigation bar’s left bar button item.  A new add button is added with an action of insertNewObject.</p>
<p> </p>
<p><code>- (void)insertNewObject {</p>
<p>// Create a new instance of the entity managed by the fetched results controller.</p>
<p>NSManagedObjectContext *context = [self.fetchedResultsControllermanagedObjectContext];</p>
<p>NSEntityDescription *entity = [[self.fetchedResultsControllerfetchRequest] entity];</p>
<p>NSManagedObject *newManagedObject = [NSEntityDescriptioninsertNewObjectForEntityForName:[entity name]inManagedObjectContext:context];</p>
<p>// If appropriate, configure the new managed object.</p>
<p>[newManagedObject setValue:[NSDate date] forKey:@"timeStamp"];</p>
<p>// Save the context.</p>
<p>NSError *error = nil;</p>
<p>if (![context save:&error]) {</p>
<p>/*<br />
Replace this implementation with code to handle the error appropriately.<br />
abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. If it is not possible to recover from the error, display an alert panel that instructs the user to quit the application by pressing the Home button.<br />
*/</p>
<p>            NSLog(@"Unresolved error %@, %@", error, [error userInfo]);</p>
<p>            abort();</p>
<p>     }</p>
<p>}</code></p>
<p> </p>
<p>This function accesses the Managed Context and adds a new item to the database.  If you read the tutorial on CoreData provided above, you will know all about how the table view is automatically updated.</p>
<p> </p>
<p>Please go through the rest of the code.  This project is a great starting point and will get you started as an iPhone developer.</p>
<p> </p>
