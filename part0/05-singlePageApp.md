```mermaid
sequenceDiagram
browser->>server: Browser: GET req for HTML files and scripts
server-->>browser: Server: Res with only one HTML file and JS scripts
Note left of browser: Brower executes JS scripts, rendering the relevant HTML/DATA
```