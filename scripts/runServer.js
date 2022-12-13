const functions = require("firebase-functions");

const Typesense = require("typesense");
const { exec } = require("child_process");
const command = `docker run -d -p 8108:8108 -v/tmp/typesense-data:/data typesense/typesense:0.23.1 \
--data-dir /data --api-key=xyz --enable-cors`;
let typesense = new Typesense.Client({
  nodes: [
    {
      host: "localhost", // where xxx is the ClusterID of your Typesense Cloud cluster
      port: "8108",
      protocol: "http"
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 2,
});

exec(command, (err) => {
  if (!err) {
    console.log("Typesense Server is up and running...✰✨")  
  }
  if (err) {
    console.log("Error running server: ", err);
  }
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
      console.log(document);
      // Index the document in books collection
      return typesense.collections("houses").documents().create(document);
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
      // Index the document in books collection
      return typesense.collections("houses").documents().update(document);
    });
  exports.onHouseDelete = functions.firestore
    .document("/houses/{houseID}")
    .onDelete((snapshot, context) => {
      // Grab the document id as id value.
      id = context.params.houseID;
      return typesense.collections("houses").documents(id).delete(document);
    });
});
