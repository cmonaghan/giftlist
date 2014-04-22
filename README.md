# Giftlist

Tinder for shopping. Like and dislike your favorite items to build your giftlist and share with friends.

To run:

    cd app/www

    python -m SimpleHTTPServer

In your browser, navigate to:

    localhost:8000

Like magic!



## Running the application in an emulator


#### Prerequisites:

- Install [npm](http://nodejs.org/)
- Install the iOS SDK by downloading 'Xcode' from the App Store
- Install the [Android SDK](http://developer.android.com/sdk/index.html)


#### Do this once:

Install Cordova

    sudo npm install -g cordova

Navigate to the giftlist/app directory

    cd app

Add platforms

    cordova platform add ios
    cordova platform add android


#### Everytime you modify the app:

Build the app

    cordova build

Run the app in the iOS emulator

    cordova emulate ios


#### Resources:

[PhoneGap documentation](http://docs.phonegap.com/en/3.4.0/guide_cli_index.md.html#The%20Command-Line%20Interface)


#### Changing the app name:

The app name, description, and author can be modified in `app/www/config.xml`

The app name and URL can be modified in `app/.cordova/config.json`


#### How to open the project in Xcode:

Open the file `app/platforms/ios/Giftlist.xcodeproj` from the finder


#### Notes:

Never modify any files in the `app/platforms` folder. These files are overwritten everytime you run `cordova build`
