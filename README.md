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
