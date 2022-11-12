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