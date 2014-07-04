# React comment box example

This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).

## To use

```
npm install express
node server.js
```

And visit http://localhost:3000/. Try opening multiple tabs!

## Orientation

Some important files in this repository:

*index.html* - The HTML file to load in your browser.  It loads the React and other libraries through a Content Delivery
  Network (CDN) and executes the tutorial application *scripts/example.js*.

*scripts/example.js* - The completed tutorial as a JavaScript file with embedded [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) code.   If you view Chrome's JavaScript console, you will see a warning that the embedded JSX code was interpreted at runtime.

*scripts/showdown.js* - A JavaScript port of [Markdown](http://daringfireball.net/projects/markdown/), a simple mark-up language.  It is included directly from *index.html*, though the tutorial text uses a CDN version at http://cdnjs.cloudflare.com/ajax/libs/showdown/0.3.1/showdown.min.js.

*server.js* - A [node](http://nodejs.org)-based HTTP server that handles file GETs and the POST for updated comments.   It serves data on port 3000, so point your browser to [http://localhost:3000](http://localhost:3000).

*server.py* - A Python-based HTTP server that handles file GETs and the POST for updated comments.  It serves data on port 8000, so point your browser to [http://localhost:8000](http://localhost:8000).
