sequenceDiagram
browser->>server: Browser: POST req to server address new_note. Server accesses the  POST data from req.body, creates a new note.
server-->>browser: Server: Res with 302 redirect, causing a new browser GET req for /notes.
browser->>server:  Browser: new GET req, fetching style sheets, scripts and data from notes(JSON), which now also includes the new note.