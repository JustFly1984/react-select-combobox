# Project setting up

Create env specific [`.env.development` | `.env.production` | `.env.testing`] config file as `.example.env.env-name`

To execute e2e tests — run `yarn test` then after test window pops up press `Run all specs` button.

## CloudFront Content-Security-Policy

### Development

```js
'Content-Security-Policy-Report-Only'

`
default-src 'self';
object-src 'none';
style-src 'self' blob: 'unsafe-inline';
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com;
img-src 'self' data: https://i.ytimg.com https://s3.amazonaws.com https://www.google-analytics.com;
frame-src https://www.youtube.com https://sentry.io;
connect-src 'self' https://api2-dev.bitgoals.com https://api2-dev.poolotto.com wss://ws2-dev.poolotto.com https://www.google-analytics.com;
report-uri https://fe8edc5daf1b6e7d23c06df8d700e6d9.report-uri.com/r/d/csp/reportOnly;
`
```

### Production

```js
'Content-Security-Policy'

`
default-src 'self';
object-src 'none';
style-src 'self' 'unsafe-inline';
script-src 'self' https://www.google-analytics.com;
img-src 'self' data: https://s3.amazonaws.com https://i.ytimg.com https://www.google-analytics.com;
frame-src https://www.youtube.com https://sentry.io;
connect-src 'self' https://api.bitgoals.com https://api.poolotto.com wss://ws.poolotto.com https://www.google-analytics.com;
report-uri https://fe8edc5daf1b6e7d23c06df8d700e6d9.report-uri.com/r/d/csp/reportOnly;
`
```
