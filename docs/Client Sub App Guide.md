1Guide to Client Sub Apps

The client is primarily made up of sub-apps, collections of pages bound to a router. This page will be a guide to the structure and contents of a sub-app, as well as how to integrate a completed sub-app into the program.

2Creating a Sub-App

A sub-app, broadly, has three parts: 2 in the client and 1 in the server. The client contains the pages and router for the sub-app, and the server contains the api routes.

3client/src/sub-app Folder

The sub-apps folder in the client contains separate folders for each sub-app, which further contains the pages of the sub-app and the router, if the app has one. Within this specific app's folder (the professional-program-app, for example), you develop the app just like you would develop any other, and can create sub folders or otherwise organize how you wish. If your sub app has multiple pages, you should have a router file that establishes the relative routes between each page (look at the professional-program-app/router.js as an example). At this point, don't worry about the overall route that points to the sub-app, that will be determined when integrating the sub-app.

3Shared Components and Stores

If your sub-app uses any custom components or Pinia stores, place those outside of the sub-apps folder. For stores especially, it is possible new apps will use, or old apps will be improved with, custom components or stores that are first added by a different app.

3Server Files

For any server api calls made by your sub-app, collect them into a single route file (unless they are extremely closely coupled to the route of an exisiting sub-app) and place them in the server's routes folder. Overall, the server doesn't make any distinctions between sub-apps, so place any server side files you create in the respective folder, but otherwise don't worry about it.

2Integrating a Sub-App

For your sub-app to be visible in the client and for its routes to work in the server, you will need to hook up the sub-app in a few places.

3Client Router

3Client Header

3Server Router