# HALO demo app

[Deployed app](https://halo-demo.onrender.com/)

[Render dashboard](https://dashboard.render.com/static/srv-chhoalrhp8ufj5ocqvlg)

Based on https://github.com/hygraph/hygraph-examples/tree/master/with-reactjs

## Running locally

```
npm install
npm start
```

## HALO API

**Note:** You need to pass the `X-Auth-Token` header with the value of your Developer's API token. Contact [Singe dev team](m.diaz@singenetwork.com) if you don't have one.

### Workflow

We assume that there will be a **HALO** button somewhere in your app, and when the user presses this button, you'll need to do the following:

1. Request the relevant cards from the `/v1/cards` endpoint.
2. Present card titles to the user (for example, as buttons).
3. When the user selects a card, show all card information (description, images, etc.)
4. Send the ID of the card, selected by the user, to the `/v1/cards/:id/select` endpoint.

See below for the parameters and response types for each endpoint.

### API endpoint

`https://halo-api.onrender.com/`

### GET `/v1/cards`

Returns a list of relevant cards.

Parameters (sent in a query string):

- `category` (string: see below): situation type (required).
- `userId` (string): a unique user identifier (required).
- `lat` / `lon` (float): user location, latitude and longitude (required).
- `gender` (string: `Feminine`, `Masculine`, or `Diverse`): user gender (optional).

The result will look like this:

```json5
{
  "data": [
    {
      "id": "clhoufil2q7730cwbjuym7alt",
      "title": "End the ride",
      "description": "The behavior of the driver seems inappropriate and becomes a threat.",
      "images": [
        {
        "url": "https://media.graphassets.com/bCF4Ots6R76VjzTU6c8X",
        "description": "Doors lock, driver becomes threatening",
      },
        {
        "url": "https://media.graphassets.com/69ee6Jq2Q3SY6wBuUJKr",
        "description": "Notify driver of clothing caught in door (imaginary clothing also works)",
      },
        {
        "url": "https://media.graphassets.com/vllD9NVQuq0dDaKjLnZU",
        "description": "Quietly unfasten seatbelt in preparation",
      },
      ]
    },
    // More cards
  ]
}
```

### POST `/v1/cards/:id/select`

Stores the card, selected by the user.

Parameters (sent in a URL):

- `id` (string): card ID (required).

Parameters (sent in a query string):

- `userId` (string): a unique user identifier (required).
- `lat` / `lon` (float): user location, latitude and longitude (required).
- `gender` (string: `Feminine`, `Masculine`, or `Diverse`): user gender (optional).

The result will look like this:

```json
{
  "data": {
    "accepted": true
  }
}
```

### Categories

`MassTransit`, `Car`, `Street`, `Train`, `Bus`, `Platform`.

### Error handling

In case of an error, the response will look like so:

```json
{
  "errors": [
    "code": 104,
			"message": "Validation error: Required at \"lon\"; Invalid enum value. Expected 'MassTransit' | 'Car' | 'Street' | 'Train' | 'Bus' | 'Platform', received 'Buss' at \"category\""
  ]
}
```
