# Web socket events

## _Connect_

Client issues a _connect_ request and receives a clientId

### Request

```json
["connect"]
```

### Response

```json
[
  "connect",
  {
    "clientId": <uuid>
  }
]
```

## _Join_

Client issues a _join_ request to a view, all clients in the view receive the response

### Request

```json
[
  "join",
  {
    "clientId": <uuid>,
    "viewId": <url>
  }
]
```

### Response

```json
[
  "join",
  {
    "viewId": <url>,
    "clients": [
      {
        "id": <uuid>,
        "color": <hex>
      }
    ]
  }
]
```

## _Move_

Client issues _move_ request at an interval

### Request

```json
[
  "move",
  {
    "clientId": <uuid>,
    "viewId": <url>,
    "position": [<x>, <y>]
  }
]
```

## _Update_

Server issues _update_ response to all clients with view state at an interval

### Response

```json
[
  "update",
  {
    "viewId": <url>,
    "clients": [
      {
        "id": <uuid>,
        "position": [<x>, <y>]
      }
    ]
  }
]
```
