
import numpy as np
import time
import wdisp

# Create random images
im1 = np.random.rand(1024, 1024, 3)
im2 = np.random.rand(1024, 1024)
im3 = np.sin((np.arange(1024 * 1024) % 1024).reshape(1024, 1024) * 4 * np.pi / 1024)

# Starts the server in a new thread. Requires your program to regularly release the GIL
# so the server can run
wdisp.run_server_thread()

print("Server listening on", wdisp.config.root_url())

wdisp.imshow("image1", im1)
wdisp.imshow("image2", im2)
wdisp.imshow("image3", im3, vmin = -1, vmax = 1)

# Wait until user clicks continue in browser
print("Waiting for browser input")
wdisp.wait()
print("Input received")

print("Press Ctrl-C to stop program")
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    pass

