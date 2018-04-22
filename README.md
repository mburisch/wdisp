# wdisp
An imshow for showing images in a browser.

Provides an imshow function which transfers an image to the included http server for showing
in a browser. Multiple images can be uploaded and viewed at the same time. The browser
automatically refreshes the view if a new image is uploaded or changed. 

## Example
````
# Starts the server in a new thread.
wdisp.run_server_thread()

# im1 and im2 are numpy arrays
wdisp.imshow("image1", im1)
wdisp.imshow("image2", im2, vmin = -1, vmax = 1)

# Wait until user clicks continue in browser
wdisp.wait()
````

![Image overview](https://github.com/mgb4/wdisp/blob/master/doc/overview.jpg)
![Image view](https://github.com/mgb4/wdisp/blob/master/doc/image.jpg)

## Server
The server can be run either with a blocking call, in new thread or in a new process. 
````
wdips.run_server()
wdips.run_server_thread()
wdips.run_server_process()
````
By default the server listens on port **4300** but this can be changed. Also by
default the server runs in daemon mode, i.e. does not keep the process alive.

The last uses the multiprocessing library, hence some attention must be paid with
regards to the main module as the new process imports the main module again. 
````
if __name__ == "__main__":
    wdips.run_server_process()
````
Refer to the documentation of the multiprocessing library for more details about this.

As a last option the server can also be run from the command line.
````
python -m wdisp
````
or with specifying the port
````
python -m wdisp --port 1000
````

## Functions
For showing images the following functions are provided
````
imshow(name, image, vmin, vmax)
close(name)
close_all()
wait()
````
*vmin* and *vmax* are optional values, for scaling the input values for display. 
