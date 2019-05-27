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
    const firestore = new Firestore({
      projectId: 'iot-final-8b2e0',
    });

    const admin = require('firebase-admin');
    const functions = require('firebase-functions');

    try {
      admin.initializeApp(functions.config().firebase);

    } catch (error) {
      console.error('Firebase initialization error', error.stack)
    }



    var messageObj = JSON.parse(message);


    var systemName = messageObj.system;
    var dataArray = messageObj.data;

    // var systemName = dot.pick('system', message);
    // var dataArray = dot.pick('data', message);
    console.log(message);
    console.log(messageObj);
    console.log(systemName);
    console.log(dataArray);



    // create a unique id for this data entry
    //const systemDocument = firestore.collection('systems').doc(systemName);

    var systemRef = admin.firestore().collection('systems').doc(systemName);

    // check if the system collection exists - if not create it 
    systemRef.get().then(
      doc => {
        if (!doc.exists) {
          systemRef.set({
            name: systemName, devices: [], device_types: [], field_names: [],
          });
        }

        const dataDocument = systemRef.collection('data').doc();

        //var systemRef = admin.firestore().collection('systems').doc(systemName);

        systemRef.update({
          devices: admin.firestore.FieldValue.arrayUnion(messageObj.device_id)
        });

        systemRef.update({
          device_types: admin.firestore.FieldValue.arrayUnion(messageObj.device_type)
        });

        // foreach data entry create a new document
        dataArray.forEach(function (data) {

          systemRef.update({
            field_names: admin.firestore.FieldValue.arrayUnion(data.fieldName)
          });

          // Enter new data into the document.
          dataDocument.set({
            device_id: messageObj.device_id,
            device_type: messageObj.device_type,
            system_name: systemName,
            time: new Date(data.time),
            type: data.type,
            field_name: data.fieldName,
            data: (data.type == "number" ? parseFloat(data.data) : data.data),
          });
        });
      }
    );


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

