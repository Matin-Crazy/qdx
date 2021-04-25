import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Skeleton from "./skeleton/Skeleton";

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    axios.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, [categories.length]);

  useEffect(() => {
    setFinalList(categories);
    categories.map(async (category) => {
      await axios
        .get(`/categories/${category.name}`)
        .then((res) => {
          const mysub = res.data;
          category.subCategories = mysub;
        })
        .then(() => {
          setFinalList([...categories]);
        });
    });
  }, [categories.length]);

  return (
    <div className="allCategoriesPage-wrapper">
      {finalList.length === 0 && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <div className="allCategoriesPage-container">
        {finalList.length > 0 &&
          finalList.map((category) => {
            return (
              <React.Fragment>
                <div className="single-category-wrapper-main-cat ">
                  {category.name}
                </div>
                {category.subCategories &&
                  category.subCategories.map((subcategory) => {
                    return (
                      <Link to={`/categories/${subcategory.name}`}>
                        <div className="single-category-wrapper">
                          {subcategory.name}
                          <div className="single-category-img-container">
                            <img
                              className="single-category-image"
                              src={`http://localhost:3001/tutorials/${subcategory.name}/avatar`}
                            ></img>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}
