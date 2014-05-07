### To Do

- get it deploying to a physical phone
- Add social integration with ability to share your giftlist
- Fix auth issue (after logout, errors on re-login) (if you can’t log back in after deleting user, may need to call FB.logout())
- Add swiping feature to home screen (like Tinder)
- Allow user to remove giftList items
- Set up tools: Travis, gulp/grunt, browserify, js-hint/js-lint pre-commit hook, a testing framework
- Revamp UI and navigation (incorporate Famo.us?)



### Refactors

- remove double-nested `for` loop in helpers.js -> saveDataToParse



### Icebox

- Add more api's so products are pulled from many places
- Allow user to specify their interests so we feed those things specifically
- Incorporate machine learning (or just take advantage of Amazon's recommendation capabilities)
- scheduled function to clean up data in parse (delete data associated with deleted users, etc.)
- add a 'see what your friends think' social feature



### Milestones Completed

- switch database to parse
- Integrate with Amazon API
- Modify Amazon API to query beyond 10 items
- remove all references to the word ‘wishlist’ to avoid confusion —> everything is ‘gift list’


---


### Marketing Plan

- Email bloggers in the space and ask them what they think about the product (whether they choose to blog about it or not). Check out [blogher](http://www.blogher.com/)
- Create a Pinterest presence since Pinterest is made up of Giftlist's target demographic. Post infographics, etc.
- Create a Chrome/Firefox extension to reach a broader audience, pull ppl into the mobile app
- Consider making a kindle version to pull in different demographic & strengthen relationship with Amazon



### User Retention Plan

- During sign-up process, make sure to gather user email address for continued interaction, use email engagement
- Incorporate push notifications to bring back old users



### Biz Dev Plan

- Make full use of the developer services offered by the Amazon API, iOS store, Google Play store. Build relationships and good things will happen.
