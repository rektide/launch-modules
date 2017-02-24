# launch-modules

> Launch an array of modules

Utility for quickly launching an array of javascript modules via Node.js's cluster.

# Install

`npm install launch-modules`

# Usage

## Programmatically

`require("launch-modules")(["fs", ".", "./a")` would to launch three modules, fs (which loads but exits silently), the default file in the caller's directory, and a.js as resolved by the caller.

## Shell

launch-modules also functions as a command line utility, trying to run all arguments as modules.

`launch-modules ./first-module.js ./second-module.js`

# API

`launchModules( modules, message, doneCb)` is the only export. Parameters:

* **modules** is an array of modules to fork
* **message** is an optional additional message payload to send to the workers when they launch
* **doneCb(err)** is an optional callback fired,
  a. with an `err` of the first module not,
  a. or with no arguments if all modules are forked.
