# htmx-sqlite-todo

A To-Do example based on HTMX and backed by SQLite.

Supported by NodeJs, Express, Handlebars and Body Parser.

## Scripts

- start: Starts the node/express server in watch mode.
- server: Configures the database to a known initial state. This uses the `todos_db.js` script file.

## Server (Node/Express)

This web/app server is configured to expose an hypermedia API using Express Router (`toDoRouter.js`). The templates are supplied using the (express-) handlebars view engine (`views` folder).

Data persistence is provided by a SQLite database file through the `better-sqlite3` package, as applied by the `toDo.js` module.

## Client (HTMX)

The main index.html file is composed from the `index` layout, wrapped around the `main` view. Then `index` layout also beings in the CSS file and a JS script. It also imports the HTMX library.

The web client issues the following API calls in response to user interaction.

- Read all - `hx-get='/todos' hx-trigger='load'` pulls in a list of all stored toDos as the screen loads.
- Create - `hx-post='/todos'` is fired when the submit button is pressed to create a new toDo entry.
- Delete - Each entry in the list of toDos can be removed using the `hx-delete='/todos/{{toDo.id}}'` action.
- Update - Also within each entry also has the ability to be marked as DONE, which results in the `hx-put='/todos/{{toDo.id}}?done={{toDo.done}}'` call being issued.

The files in the `views/partials` are used to build the main screen but also act as individual HTMX templates to respond to API requests.

## Architecture

```mermaid
block-beta
columns 14

    St["Stores"]:2
    space
    R["Routers"]:2
    space:4
    V["Views"]:2
    space:3

    space:14

    BS["Better
    SQLite"]:2
    space
    BP["body
    parser"]:2
    space
    Ex["Express"]:2
    space
    Hbs["express-
    handlebars"]:2
    space
    H["HTMX"]:2

    space:14

    Sq["SQLite"]:2
    space
    db[("&nbsp;&nbsp;todos db&nbsp;&nbsp;")]:2
    space
    N["Node"]:2
    space
    A["App
    (APIs)"]:2
    space
    B["Browser"]:2

    space:14

    block:key:14
        0["Key"]
        1["Third Party"]
        2["NPM Dependency"]
        3["JS Library"]
        4["Bespoke JS"]
        5[("&nbsp;Database&nbsp;")]
    end

    Sq --> db
    db --> Sq
    St --> BS
    BS -->Sq
    Ex --> R
    R --> St
    Hbs --> Ex
    Ex --> Hbs
    N --- Ex
    BP --> Ex
    Ex --> BP
    H --- A
    A --- Ex
    B --> H
    Hbs --> V

    style 1 fill:#f00,color:#fff
    style N fill:#f00,color:#fff
    style Sq fill:#f00,color:#fff
    style B fill:#f00,color:#fff
    style 2 fill:#f70,color:#fff
    style BS fill:#f70,color:#fff
    style BP fill:#f70,color:#fff
    style Hbs fill:#f70,color:#fff
    style Ex fill:#f70,color:#fff
    style 3 fill:#ff0
    style H fill:#ff0
    style 4 fill:#0f0
    style St fill:#0f0
    style R fill:#0f0
    style V fill:#0f0
    style A fill:#0f0
```
