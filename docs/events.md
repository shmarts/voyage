# Web socket events

## _On connection_

Client connects, a clientId is sent

### Response

```json
[
  "CONNECT",
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
  "JOIN",
  {
    "clientId": <uuid>,
    "viewId": <url>
  }
]
```

### Response

```json
[
  "JOIN",
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
  "MOVE",
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
  "UPDATE",
  {
    "viewId": <url>,
    "state": [
      {
        "clientId": <uuid>,
        "position": [<x>, <y>]
      }
    ]
  }
]
```
