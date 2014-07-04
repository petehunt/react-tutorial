#!/usr/bin/env python2
""" server.py -- React tutorial server, serving on localhost:8000  """

import SimpleHTTPServer
import SocketServer
import cgi
import json

COMMENTS_FILE = "comments.json"
PORT = 8000

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_POST(self):
        assert self.path == "/" + COMMENTS_FILE
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST',
                     'CONTENT_TYPE':self.headers['Content-Type']}
        )
        new_data = { u"author": form.getfirst("author"), u"text": form.getfirst("text") }
        with open(COMMENTS_FILE) as f:
            data = json.load(f)
        data.append(new_data)
        data_as_json = json.dumps(data)
        with open(COMMENTS_FILE, "w") as f:
            f.write(data_as_json)
        # send copy of data back as response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(data_as_json)


Handler = ServerHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)
httpd.serve_forever()
