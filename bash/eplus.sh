#! /bin/bash
node ./dist/index.js \
	-p /usr/lib/chromium-browser/chromium-browser \
	-r "_\\d{3,}.m3u8" \
	-d .live.eplus.jp \
	$@ && bash /tmp/ytdl-cmd.sh
