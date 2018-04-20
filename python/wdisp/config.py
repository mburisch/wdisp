
import os.path


def address():
    return "http://localhost"

def port():
    return 4300

def wwwroot():
    return os.path.dirname(__file__) + "/wwwroot"

def url_for(path):
    return address() + ":" + str(port()) + "/api" + path

