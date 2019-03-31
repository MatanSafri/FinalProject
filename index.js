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
    //TODO: Parse the message and determine where to save it : fireStore or storage
  }

  function saveToFireStore(message) {
    const Firestore = require('@google-cloud/firestore');

    // json dot annotation
    //var dot = require('dot-object');

    // unique id generator
    const crypto = require("crypto");
    const id = crypto.randomBytes(16).toString("hex");

    const firestore = new Firestore({
      projectId: 'iot-final-8b2e0',
    });

    var messageObj = JSON.parse(message);


    var systemName = messageObj.system;
    var dataArray = messageObj.data;

    // var systemName = dot.pick('system', message);
    // var dataArray = dot.pick('data', message);
    console.log(message);
    console.log(messageObj);
    console.log(systemName);
    console.log(dataArray);

    // foreach data entry create a new document
    dataArray.forEach(function (data) {

      // create a unique id for this data entry
      const document = firestore.collection('systems').doc(systemName).collection('data').doc(id);

      // Enter new data into the document.
      document.set({
        device_id: messageObj.device_id,
        device_type: messageObj.device_type,
        time: data.time,
        type: data.type,
        fieldName: data.fieldName,
        data: data.data,
      });
      // document.set({
      //   device_id: dot.pick('device_id', message),
      //   device_type: dot.pick('device_type', message),
      //   time: dot.pick('time', data),
      //   type: dot.pick('type', data),
      //   fieldName: dot.pick('fieldName', data),
      //   data: dot.pick('data', data),
      // });
    });
  }

  function saveToStorage(message) {
    // TODO
  }

  const pubsubMessage = event.data;
  //save(Buffer.from(pubsubMessage.data, 'base64').toString());
  const message = pubsubMessage.data
    ? Buffer.from(pubsubMessage.data, 'base64').toString()
    : '';

  if (message != '')
    save(message);

  callback();
}

