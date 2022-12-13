import Header from "./global-components/Header";
import Item from "./shop-components/Item";
import Item2 from "./shop-components/Item2";
import Result from "./shop-components/Result";
import "../assets/sass/shop/Item.scss";
import { Box } from "@mui/system";
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
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
  SortBy,
  Panel,
  RefinementList,
} from "react-instantsearch-dom";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "vBYIoQz1tMxWFHPSMmmDgIUn0JZJb72X",
    nodes: [
      {
        host: "hmsugekaob2qj8v6p-1.a1.typesense.net",
        port: "443",
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    queryBy: "address,description,name",
    queryByWeights: "4,1,2",
    numTypos: 3,
    typoTokensThreshold: 1,
  },
});

function Shop2() {
  const { i18n, t } = useTranslation(["Shop"]);
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  return (
    <div className="Shop2">
      <Header />
      <SimpleBreadcrumbs title={t("all")} />
      <InstantSearch
        indexName="houses"
        searchClient={typesenseInstantsearchAdapter.searchClient}
      >
        <Configure hitsPerPage={6} />
        <div className="search-container">
          <aside className="results-section"></aside>
          <main>
            <Box
              sx={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 1,
                m: 1,
                marginBlock: 7,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <SearchBox />
                <SortBy
                  defaultRefinement="houses"
                  items={[
                    { value: "houses", label: "Most View" },
                    { value: "houses/sort/price:asc", label: "Price asc." },
                    { value: "houses/sort/price:desc", label: "Price desc." },
                  ]}
                />
              </Box>
              <div className="searchbox-gap"></div>
              <Hits hitComponent={Item2} />
            </Box>
            <Box sx={{ marginBottom: "5vh" }}>
              <Pagination
                showFirst={true}
                showLast={true}
                showPrevious={true}
                showNext={true}
                padding={2}
              />
            </Box>
          </main>
        </div>
      </InstantSearch>

      <Discover />
      <Footer />
    </div>
  );
}
export default Shop2;
