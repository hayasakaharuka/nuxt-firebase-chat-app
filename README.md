# nuxt-firebase-chat

> Nuxt x Firebase Chat Sample

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project at localhost:5000
$ npm run generate
$ mkdir public
$ npm run copy
$ firebase serve

# deploy
$ firebase deploy
```

### create .envrc
firebaseのプロジェクト作って、
「ウェブアプリに Firebase を追加」からkeyとかを入れる
```
# .envrc
export APIKEY=
export AUTHDOMAIN=
export DATABASEURL=
export PROJECTID=
export STORAGEBUCKET=
export MESSAGINGSENDERID=
```

その他
```
npm i node-sass sass-loader
npm i -g firebase-tools
firebase use --add ### default
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
