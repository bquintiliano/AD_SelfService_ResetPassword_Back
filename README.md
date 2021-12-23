# Backend for Self Service Reset Password - AD

This API can connect to your Active Directory and change password

Made with NODEJS

## Prerequisites
Your AD need to 'ldaps' working to receive the connection from this API.

You can use this tutorial to enable ldaps: [Tutorial here](https://techexpert.tips/windows/enabling-the-active-directory-ldap-over-ssl-feature/)

## Installation
```
git clone "url"
yarn

```

## Configuration

You need to update the file "/src/config/ad.json" use your data to make a connection to your AD

## Usage
To run this API use this command from root folder: 
```
node src/server.js

```
This API run on port "3333" but you can change on file "src/server.js" in line "13
" change the app.listen for a port do you want.

## Usage Routes
```
/login
Route to authenticate user AD

This route expected a "POST" with JSON like that:
{
  "user" : " userFromAD" 
  "passwordUser": "passwordFromADToLogin"
}

return 401 if the user or password its incorrect
return 200 if authenticated ok
This route give a "response" with a token, you need storage this token where you from consume this api to be able to use a /reset route

```
```
/reset
Route to reset password user from AD
This route need to be authenticate by route /login

This route expected a JSON like that:
{
  "user" : " userFromAD" 
  "passwordUser": "newPassword"
}

return 401 if you pass a invalid token or don't pass a token.
return 200 when reset password ok

```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

This API need a good revision from security, i glad if you can help with that.

## License
[MIT](https://choosealicense.com/licenses/mit/)