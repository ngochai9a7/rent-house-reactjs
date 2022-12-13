const Typesense = require("typesense");
module.exports = (async () => {
    const TYPESENSE_CONFIG = {
      nodes: [
        {
          host: "localhost",
          port: "8108",
          protocol: "http",
        },
      ],
      apiKey: "xyz",
    };
  
    console.log("Config: ", TYPESENSE_CONFIG);
  
    const typesense = new Typesense.Client(TYPESENSE_CONFIG);
    typesense.collections('houses').documents().delete({'filter_by': "name:='TMA Innovation Park, Quy Nhơn, Bình Định'"})
    console.log("Da xoa TMA")   

  })();
  