/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from "react-query";
import React from "react";
import axios from "axios";
import RenderCollection from "./RenderCollection";
import Loader from "./Loader";

function AllCategories() {
  const collections = useQuery("categoriesAndTutorials", () => {
    return axios.get("/test").then((res) => res.data);
  });

  console.log(collections);

  return collections.isLoading ? (
    <div className="all_categories_page_container">
      <div className="loader-container">
        <Loader />
      </div>
    </div>
  ) : (
    <div className="all_categories_page_container">
      {collections.data?.map((collection) => {
        return <RenderCollection collection={collection} />;
      })}
    </div>
  );
}

export default AllCategories;