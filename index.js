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

exports.saveMessage = (event, callback) => {

  function save(message) {
    saveToFireStore(message);
    //TODO: Parse the message and determine where to save it : fireStore 
  }

  function saveToFireStore(message) {
    const Firestore = require('@google-cloud/firestore');

    const firestore = new Firestore({
      projectId: 'iot-final-8b2e0',
    });

    const document = firestore.doc('messages/Mymessages');

    // Enter new data into the document.
    document.set({
      title: 'Welcome to Firestore',
      body: message
    });

    // TODO :create the document tree according to message
  }

  function saveToStorage(message) {
    // TODO
  }

  const pubsubMessage = event.data;
  //save(Buffer.from(pubsubMessage.data, 'base64').toString());
  const message = pubsubMessage.data
    ? Buffer.from(pubsubMessage.data, 'base64').toString()
    : 'World';

  save(message);

  callback();
}

