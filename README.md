# vue-google-sheets-signin

> A simple [Vue](https://vuejs.org) directive to include  [Google Sign-In Button](https://developers.google.com/identity/sign-in/web/sign-in) behavior in any component.

## Install

``` bash
$ npm install --save vue-google-sheets-signin

$ yarn add vue-google-sheets-signin
```
## Usage

Import the directive and attach it to any component.

#### Example:

> Important: `OnGoogleSheetsAuthSuccess` and `OnGoogleSheetsAuthFail` are mandatory methods you have to declare in your component where you are using the directive.


``` html
<template>
  <button v-google-sheets-signin-button="clientId" class="google-signin-button">Continue with Google</button>
</template>

<script>
import GoogleSheetsSignInButton from 'vue-google-sheets-signin'
export default {
  directives: {
    GoogleSheetsSignInButton
  },
  data: () => ({
    clientId: 'Your_Google_Client_ID'
  }),
  methods: {
    OnGoogleSheetsAuthSuccess (authData) {
      // Receive the authenticated data (access_token, refresh_token, id_token ...) and make your magic with the backend
    },
    OnGoogleSheetsAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
```

Happy coding.
