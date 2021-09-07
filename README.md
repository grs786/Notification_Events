# Introduction 
 Allow you to hold the firebase notifications and SSE events under one roof.

# Getting Started

1.  Install the npm and import it into you project as PushNOtification and SseEvents methods from npm root directory. 
2.  Methods for push notifications:
    -> PushNOtification.fcmService.registerAppWithFCM(); for app registration 
    -> PushNOtification.fcmService.register(onRegister, onNotification, onOpenNotification); for app token registration 
    -> onNotification method used for handle the events when notification received like 
      const options = {
        soundName: "default",
        playSound: true //,
         largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
         smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
        };
    -> PushNOtification.localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      );
    -> onOpenNotification used when notification banner is being clicked.

3. Methods for SSE Events
  -> PushNOtification.SseEvents.getSSEEvents

# Storing events to reducers/asyncstorage
1. When we receive any sse event, can store all the event in any reducers/asyncstorage so that it will be used all across the application.

# Additional link and npm installation
1. For adding push notifications to the project follow few steps:
  -> Install firebase npm package, npm i @react-native-firebase/app --save
  -> https://www.npmjs.com/package/@react-native-firebase/app use the npm link for better and updated documentation.
  -> Then  need to register our application to the firebase console using https://console.firebase.google.com/u/0/ 
  -> Configure your app on firebase console i.e. android and iOS seperately. 
  -> Reference link for android configuration : https://rnfirebase.io/screencasts/android-installation 
  -> Reference link for ios configuration : https://rnfirebase.io/screencasts/ios-installation

2. For adding sse event to the project follow few steps:
  -> Install firebase npm package, npm i react-native-sse --save
  -> Open the channel for sse events using its addEventListener events method with "open" as first argument.


# Build and Test
TODO: Describe and show how to build your code and run the tests. 
