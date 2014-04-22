# TO DO

- Add social integration with ability to share your giftlist
- Fix auth issue (after logout, errors on re-login) (if you can’t log back in after deleting user, may need to call FB.logout())
- get it deploying to a physical phone
- Add swiping feature to home screen (like Tinder)
- Allow user to remove giftList items
- Set up tools: Travis, gulp/grunt, browserify, js-hint/js-lint pre-commit hook, a testing framework
- Revamp UI and navigation (incorporate Famo.us?)



# REFACTORS

- remove double-nested `for` loop in helpers.js -> saveDataToParse



# ICEBOX (non-critical)

- Add more api's so products are pulled from many places
- Allow user to specify their interests so we feed those things specifically
- Incorporate machine learning (or just take advantage of Amazon's recommendation capabilities)
- scheduled function to clean up data in parse (delete data associated with deleted users, etc.)



# MILESTONES COMPLETED

- switch database to parse
- Integrate with Amazon API
- Modify Amazon API to query beyond 10 items
- remove all references to the word ‘wishlist’ to avoid confusion —> everything is ‘gift list’