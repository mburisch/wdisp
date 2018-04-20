
from setuptools import setup

long_description = "An imshow which shoes the images in a browser."
	
setup(
    name = 'wdisp',
    version = '1.0.0',
    description = "imshow for a browser",
    long_description = long_description, 

    url = "https://github.com/mgb4/wdisp",
    author = "Michael Burisch",
    author_email = "michael.burisch@gmx.com",
    
    keywords = "camera calibration marker detection",

    classifiers=[
        "Development Status :: 4 - Beta",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3"
    ],
    
    #packages = find_packages(where = "annulus"),
    #packages = find_packages(include = ["annulus"]),
	packages = ["annulus"],
	python_requires='>=3',
)