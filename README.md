# Discontinued

This add-on has been discontinued.

## Why?
### It's a pain

Fixing a typo and verifying it worked took forever. The Add-on SDK involved restarting Firefox with a clean profile every time, which involved several minutes of waiting for loading and logging into Facebook again, just to find out I'd left off a semicolon and had to start all over again. This did not make Firefox an appealing environment.


### Firefox is dropping support

Mozilla announced they're dropping support for the Add-on SDK. Since the add-on can do approximately nothing without the Add-on SDK, the lack of support is mildly irritating.


## Uninstalling the add-on

To uninstall the add-on, go to the page [about:blank](about:blank) in Firefox, click the `Extensions` tab on the left, and click the `Remove` button next to the add-on's entry.


## Moving on

Most of the code was ripped out and stolen for the [Facebook Bot](https://github.com/Mirisong/Facebook-Bot). The Facebook Bot is built on Web-Extensions instead, which Firefox is aggressively promoting, so hopefully they won't abandon it for a while. It also has a nifty change watcher that automatically reloads the add-on without affecting Firefox at all, so changing stuff only takes a few seconds instead, which is quite a bit nicer.


## Good riddance

Some people dislike Web-Extensions' removal of some special features of the Add-on SDK and XUL based add-ons. I, however, am glad to be rid of it. Bye forever, Add-on SDK.



# Song's Facebook Admin Tool

A Firefox add-on that deletes Facebook posts in bulk.

# Warning

*This add-on is currently in beta. Please be careful using it.*

# Getting to the feeds

- Log into Facebook and click on your group in the left navigation bar.
- Under the group's banner is a horizontal menu with buttons like `Discussion`, `Sale Posts`, `Members`, `Photos`, etc. Click the `Sale Posts` option.
- You will now be in the `Available` feed.
- To switch to the `Sold` or `Archived` feeds, look just below the button your just clicked. there's a big bold `All Sale Posts` message. Look directly right of that for a gray `Recently Posted` drop down menu and click it to open it.
- In the newly opened menu, click either `Sold` or `Archived` to go to your sold or archived posts feed. Note that the `Archived` option is *untested* and may not work (it's probably harmless, but might just break the page instead of extracting stuff like you want).
- You'll now be in the `Sold` or `Archived` feed, depending on the option you clicked.

# Extracting a list of posts out of a feed

- Follow the instructions in `Getting to the feeds` above to get to the desired feed.
- The extracter *only* works on posts that are *currently loaded* in the page. If you want to extract a lot of posts at once, you'll need to scroll a long way down the page to load them. The `Page Down` key on your keyboard seems to be pretty fast at this.
- Once you have a a satisfactory number of posts loaded, click the add-on's button and choose `Extract posts`.
- The page will be replaced with a list of links. You can copy these out and paste them somewhere else (like Notepad) for safe keeping.
- If you want the page to go back to normal, you can just refresh it; otherwise, closing it out is fine.

# Deleting a list of extracted posts
- Log into Facebook with an account that can delete the posts.
- Click the add-on's button and choose the `Delete posts` option.
- Paste your list of links into the box that appears.
- Scroll down if necessary and click the `OK` button just below the input box.
- The add-on will open a new tab and start loading the links into it one by one, deleting each one in turn.
- You can watch the add-on work, open a different tab to work in, or go do something that's actually interesting while it deletes all those annoying posts.

# Note about security

This add-on is *not* a hack that lets you delete arbitrary posts. If you can't delete a post manually with the currently signed in account, then the add-on can't delete it automatically. So for example, if your friend makes a really embarrassing post about you, this tool can't delete it unless you can log into their account. Not even if it's *really* embarrassing and you *really* want to delete it.

# Note

The author gave the add-on a list of several hundred posts and it successfully deleted them all, so it seems to work okay, but it still isn't extremely well tested and already has several known "problems" (like not being able to cancel once it starts). Please be aware that you're using this at your own risk, and be careful!
