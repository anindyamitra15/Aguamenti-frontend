# Aguamenti-Frontend

## Developing
- Open your terminal and enter: ``cd ./aguamenti-frontend``
- Enter ``npm i`` to install all the JavaScript packages using npm (node-js package manager). It is expected to use the internet and take 5-7 minutes to install all the packages.
- Enter ``ng serve --open`` to open the app in the default browser
- When you update any files under ``./src`` directory, it will auto reload the application updating the changes.
- For testing PWA, build the application using ``ng build``, let the process finish and serve the ``./dist`` folder with an http sevrer. Note that auto-reload will not be functional, every time a change is made, it should be built and re-served.

## Tools/Technologies used
- Angular
- Angular Material
- SocketIO
- NodeJS

## Deployment
- Deployment is handled in [aguamenti-ui-deploy](https://github.com/anindyamitra15/aguamenti-ui-deploy) repository.
- There are few steps that needs to be performed after ng build and copying the `./dist` folder to the deployment repository:
  - change base path in `index.html` to ```<base href="/aguamenti-ui-deploy/">```
  - Copy index.html and rename it to 404.html in the same folder.
  - Push it to aguamenti-ui-deploy
