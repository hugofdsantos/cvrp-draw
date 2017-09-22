#!/bin/bash

command -v phantomjs >/dev/null 2>&1 || { echo >&2 "I require phantomjs but it's not installed.  Aborting."; exit 1; }
# exec phantomjs download.js
phantomjs --local-to-remote-url-access=true --ssl-protocol=any --ignore-ssl-errors=yes  download.js 


