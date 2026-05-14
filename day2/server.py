#!/usr/bin/env python3
"""
Simple HTTP Server for Day2 Project
Serves the website on http://localhost:3000
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 3000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Server running on http://localhost:{PORT}")
        print(f"📂 Available routes:")
        print(f"   http://localhost:{PORT}/ - Main page")
        print(f"   http://localhost:{PORT}/index1.html - Contact form")
        print(f"   http://localhost:{PORT}/index2.html - TechBootcamp page")
        print(f"\n📝 Press Ctrl+C to stop the server\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✅ Server stopped")

if __name__ == "__main__":
    run_server()
