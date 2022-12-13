const Typesense = require("typesense");
const functions = require("firebase-functions");
module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: "w93c46re8xuah7qpp-1.a1.typesense.net",
        port: "443",
        protocol: "https"
      },
    ],
    apiKey: "2coQ9hDmVaFs1fnkGf6ZfvdNP0gPEktc",
  };

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "houses",
    fields: [
      { name: "id", type: "string" },
      { name: "address", type: "string" },
      { name: "area", type: "int32", sort: true },
      
      { name: "description", type: "string" },
      { name: "image", type: "string[]" },
      { name: "detailsummary", type: "string" },
      { name: "name", type: "string" },
      { name: "price", type: "int32", sort: true },
      { name: "view", type: "int32", sort: true },
    ],
    default_sorting_field: "view",
  };

  const houses = require("./data/houses.json");

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection...");

  try {
    const returnData = await typesense
      .collections("houses")
      .documents()
      .import(houses);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();
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
    })