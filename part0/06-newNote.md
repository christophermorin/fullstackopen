sequenceDiagram
Note left of browser: Browser uses all client side JS to perform this.
browser->>browser: Browser: Using event handlers, prevent default submit.
browser->>browser: Browser: Grab the data from FORM element and render a new note to the DOM.
browser->>browser: Browser: Push new note to notes array.
browser->>server: Browser: Using XML, send a POST request of the notes array as JSON.
server-->>browser: Server: Res with 201 created, NOT with 302 redirect, effectively updating the notes array stored server side.
