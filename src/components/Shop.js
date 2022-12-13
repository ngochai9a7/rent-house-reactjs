import Header from "./global-components/Header";
import Item from "./shop-components/Item";
import Result from "./shop-components/Result";
import { Box } from "@mui/system";
import { Pagination } from "@mui/material";
import usePagination from "./shop-components/Pagination";
import { Container } from "react-bootstrap";
import Discover from "./global-components/Discover";
import Footer from "./global-components/Footer";
import SimpleBreadcrumbs from "./global-components/SimpleBreadcrumbs";
import SearchBar from "material-ui-search-bar";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useFirebase } from "../firebase";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination2,
  SortBy,
  Panel,
  RefinementList, } 
from "react-instantsearch-dom";
import "instantsearch.css/themes/satellite.css";
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xyz",
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
  },
  additionalSearchParameters: {
    queryBy: "address,description,name",
    queryByWeights: "4,2,1",
    numTypos: 3,
    typoTokensThreshold: 1,
  },
});

function Shop() {
  const firebase = useFirebase();
  //
  
  //
  const [searched, setSearched] = useState();
  const [searchedItem, setSearchedItem] = useState([]);
  const [housesDb, setHouses] = useState([]);
  useEffect(() => {
    firebase.getAllHouses().then((houses) => {
      setHouses(houses.docs);
      setSearchedItem(houses.docs)
    });
  }, []);
  
  // Search
  const requestSearch = (value) => {};
  const cancelSearch = () => {
    setSearched("");
  };
  //
  //data.sort((a, b) => a.id - b.id); // sort data by id
  // tinh so page
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(housesDb.length / PER_PAGE);
  const _DATA = usePagination(housesDb, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const { i18n, t } = useTranslation(["Shop"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);
  console.log(searchedItem)
  return (
    <div className="Shop">
      <Header />
      <SimpleBreadcrumbs title={t("all")} />
      <InstantSearch indexName="houses" searchClient={typesenseInstantsearchAdapter.searchClient}>
        <Configure hitsPerPage={6} />
        <div className="search-container">
          <aside className="results-section"></aside>
          <main>
            <SearchBox />
            <div className="searchbox-gap"></div>
            <Hits hitComponent={Result} />
          </main>
        </div>
      </InstantSearch>

      <Box>  
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 3,
          m: 1,
          marginBlock: 7,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {_DATA.currentData().map((house) => {
          return (
            <Link to={`/detail/${house.id}`} key={house.id}>
              <Item
                name={house.data().name}
                image={house.data().image[0]}
                price={house.data().price}
              ></Item>
            </Link>
          );
        })}
      </Box>
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 8,
        }}
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        color="primary"
      />
      <Discover />
      <Footer />
    </div>
  );
}
export default Shop;
