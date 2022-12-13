const Typesense = require("typesense");
module.exports = (async () => {
    const TYPESENSE_CONFIG = {
      nodes: [
        {
          host: "172.21.112.1",
          port: "8108",
          protocol: "http"
        },
      ],
      apiKey: "xyz",
    };
  
    const typesense = new Typesense.Client(TYPESENSE_CONFIG);
    
    typesense.collections('houses').retrieve().then(result => console.log(result))
  })();
  