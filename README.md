# cvrp-draw
A tool for routes visualization

# how to use
Just execute script run.sh (which depends on phantomjs and openlayers).

The script currently needs that routing data (output JSON from OSRM) is pre-loaded in variables (inside drawmap.html), because if they are loaded in real-time the phantomjs script won't have enough time to render them in the output image.
We plan to fix this issue in future versions.

Another way to workaround this issue is to open drawmap.html, which will automatically load routes from pre-defined points.

We plan to include different alternative drawing frameworks (in Python) and also to integrate drawing features with a combinatorial optimization language, such as CombView: https://github.com/igormcoelho/language-combview.

MIT License
2017

