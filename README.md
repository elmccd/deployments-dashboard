# Deployments dashboard

> Universal dashboard app for tracking status of deployments
> System independent, works with any CI pipeline

## Running server

`npm run server` and open `localhost:3003`

## Tracking changes

After starting the server there is nothing there, to start monitoring
servers you can add and update them by calling /track endpoint.

GET `HOST:3003/track?id=server_id&build.status=pending`

It will add a new server indicator for given server id.

Example payload structure:
```js
{
  id: 'pre-prod', //REQUIRED
  destination: 'http://pre-prod.myorganization.com',
  build: {
    id: '56',
    link: 'http://link-to-your-ci/job/56',
    status: 'success', //one of success, fail, pending REQUIRED
    commit: '91968d6256a68c2ccebe21877b63df7812fe9139',
    commitLink: 'https://github.com/me/my-project/commit/91968d625',
  },
}
```

### Updating server status:

To update server status just call the track endpoint with updated values

GET `HOST:3003/track?id=server_id&build.status=fail`

### Real live case

GET `HOST:3003/track?id=server_id&build.status=pending&build.id=123&build.commit=15243234`

Now, you can repeat it request setting updated `build.status` and the
rest of the fields or you can use `persistent=true` option to only update
fields provided in request:

GET `HOST:3003/track?id=server_id&build.status=success&persistent=true`

Build ID and commit ID will be preserved from previous value.

### To monitor multiple instances provide them with unique IDs

GET `HOST:3003/track?id=test&build.status=success`
GET `HOST:3003/track?id=pre-prod&build.status=success`
GET `HOST:3003/track?id=production&build.status=success`

## Handling changes

Make sure to call track with fail or success after sending `pending`, if
you don't UI will not know if it's done and it will stay `pending` till
next track call.

## Build Frontend

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
