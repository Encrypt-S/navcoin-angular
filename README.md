# NavDroid StakeBox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Stakebox installation instructions

- Flash the image to a microsd card using a program like [Etcher](https://etcher.io/).
- Make sure the ODroid is set to SD card mode (there is a small switch you need to flick).
- Insert the microsd card into your Odroid and boot it up.
- Connect the stakebox to a monitor and keyboard. 
- Plug in an ethernet cable for internet access or use the command line to connect to your wifi

### Find the IP address of the stakebox

- Connect the stakebox to a monitor and keyboard. 
- In terminal type `ifconfig` and press enter.
- Find your inet addr (eg. `192.168.1.99`).
- Write this down as you will need it to Log in to the stakebox

### Log In

On your computer (not the stakebox), open your web browser and visit `/login` at the ip address of the Stakebox, e.g. `192.168.1.99/login`

Accept the security certificates (there will be two of them).

Log in using the default username and password (`navdroid` for both)

After logging in we reccomend that you encrypt your wallet and change the username and password for the web interface


### How to encrypt your wallet

On the home page of the Stakebox in the first widget on the page `Wallet Status` will be a button that says `Encrypt Wallet`. 
Click that and follow the instructions.

### How to change the web interface password

Go to the Settings page and look for the `Change User Login` widget.

### Other

If you want to change things like the root password of the stakebox or your RPC username/password you will need to SSH into the stakebox and change these things manually for now.

