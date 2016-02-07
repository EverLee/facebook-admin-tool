# Song's Facebook Admin Tool

A Firefox add-on that deletes Facebook posts in bulk.

# Warning

*This add-on is currently in beta. Please be careful using it.*

# To use

- Get a list of group permalink URLs to delete. Group permalink URLs look like:
`https://www.facebook.com/groups/<numbers>/permalink/<numbers>/`
Most post titles in a trade group's feed are suitable links; you can right click
and copy the link location. URLs should be written in a text editor (like Notepad),
one per line.
- Once the links are listed, sign into Facebook with an account that can delete them.
Click on the add-on's blue S button to open a text box, then copy the URLs out of the
text editor and paste them into the add-on's text box.
- Once the URLs are pasted in, press the enter key to submit and the add-on will
automatically open each URL and delete the post in it.

# On security

This add-on is *not* a hack that lets you delete arbitrary posts. If you can't delete
a post manually with the currently signed in account, then the add-on can't delete
it automatically. So for example, if your friend makes a really embarrassing post
about you, this tool can't delete it unless you can log into their account. Not even
if it's *really* embarrassing and you *really* want to delete it.

# Note

The author gave the add-on a list of several hundred posts and it successfully deleted
them all, so it seems to work okay, but it still isn't extremely well tested and already
has several known "problems" (like not being able to type the links in directly and not
being able to cancel once it starts). Please be aware that you're using this at your own
risk, and be careful!
