/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
//import * as admin from 'firebase-admin';
// var serviceAccount = require('path/to/serviceAccountKey.json');

// [START functions_helloworld_pubsub]
/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed when
 * the trigger topic receives a message.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
exports.helloPubSub = (event, callback) => {
  const pubsubMessage = event.data;
  const name = pubsubMessage.data
    ? Buffer.from(pubsubMessage.data, 'base64').toString()
    : 'World';

  console.log(`Hello, ${name}!`);

  callback();
};
// [END functions_helloworld_pubsub]

// exports.saveMessageToDb = (event, callback) => {
//   admin.initializeApp({
//     // credential: admin.credential.cert(serviceAccount),
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://<IOT-final>.firebaseio.com'
//   });
//   var db = admin.firestore();

//   const pubsubMessage = event.data;
//   const name = pubsubMessage.data
//     ? Buffer.from(pubsubMessage.data, 'base64').toString()
//     : 'World';
//   // console.log(`Hello, ${name}!`)'
//   db.collection('try').doc('try').set(name);
//   callback();
// };
