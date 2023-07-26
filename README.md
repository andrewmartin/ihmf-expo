# IHMF Expo App

```sh
yarn ios
```

Tips:

- In simulator, `CTRL + Z` launches the debug menu or hold down 3 fingers in iOS
- `npx expo start --dev-client -c` when swapping `.env` and update `.env` only

## Notifications

- https://github.com/node-apn/node-apn/blob/master/doc/apn.markdown#provider
-

Set up the key:

- https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_token-based_connection_to_apns
  - https://developer.apple.com/account/resources/authkeys/list

Create a token:

```
  const jwt = require("jsonwebtoken");
  const authorizationToken = jwt.sign(
  {
    iss: "YOUR-APPLE-TEAM-ID"
    iat: Math.round(new Date().getTime() / 1000),
  },
  fs.readFileSync("./path/to/appName_apns_key.p8", "utf8"),
  {
    header: {
      alg: "ES256",
      kid: "YOUR-P8-KEY-ID",
    },
  }
);
```

Add UDID (for testing):

- https://developer.apple.com/account for Team ID (4Z9ZKVC25R)
- https://developer.apple.com/account/resources/devices/list to add UDID. Find in Music app in iTunes
-

Get bundle identifier

- https://developer.apple.com/account/resources/identifiers
