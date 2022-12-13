const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const Typesense = require("typesense");
admin.initializeApp();
const client = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: "8108",
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  'connectionTimeoutSeconds': 2
});
exports.onHouseCreate = functions.firestore
  .document("/houses/{houseID}")
  .onCreate((snapshot, context) => {
    // Grab the document id as id value.
    id = context.params.houseID;
    const {
      address,
      area,
      createdAt,
      description,
      detailsummary,
      name,
      price,
      view,
    } = snapshot.data();
    document = {
      id,
      address,
      area,
      createdAt,
      description,
      detailsummary,
      name,
      price,
      view,
    };
    // Index the document in houses collection
    return client.collections("houses").documents().create(document);
  });
exports.onHouseUpdate = functions.firestore
  .document("/houses/{houseID}")
  .onUpdate((change, context) => {
    // Grab the document id as id value.
    id = context.params.houseID;
    const {
      id,
      address,
      area,
      createdAt,
      description,
      detailsummary,
      name,
      price,
      view,
    } = change.after.data();
    document = {
      id,
      address,
      area,
      createdAt,
      description,
      detailsummary,
      name,
      price,
      view,
    };
    console.log(document);
    // Index the document in houses collection
    return client.collections("houses").documents().update(document);
  });
exports.onHouseDelete = functions.firestore
  .document("/houses/{houseID}")
  .onDelete((snapshot, context) => {
    // Grab the document id as id value.
    id = context.params.houseID;
    return client.collections("houses").documents(id).delete(document);
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
