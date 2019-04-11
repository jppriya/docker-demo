// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  region: 'us-east-1',

  identityPoolId: 'us-east-1:fbe0340f-9ffc-4449-a935-bb6a6661fd53',
  userPoolId: 'us-east-1_iXFGnaig8',
  clientId: '57u19vbrmhfp7l15g07v9djmcs',

  // rekognitionBucket: 'rekognition-pics',
  // albumName: "usercontent",
  bucketRegion: 'us-east-1',
  baseUrl: 'http://product-service:8080/services'
  // baseUrl: 'http://localhost:8080/services'
  // baseUrl: 'https://2998acftz9.execute-api.us-east-1.amazonaws.com/Dev'

  // ddbTableName: 'LoginTrail',

  // cognito_idp_endpoint: '',
  // cognito_identity_endpoint: '',
  // sts_endpoint: '',
  // dynamodb_endpoint: '',
  // s3_endpoint: ''
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
