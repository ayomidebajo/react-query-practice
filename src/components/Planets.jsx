import React from "react";
import { useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanetsData = async (key) => {
  //   console.log(key, "great");
  const res = await fetch(
    `http://swapi.dev/api/planets/?page=${key.queryKey[2]}`
  );
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const fetchPlanetsDataInifinity = async (page) => {
    //   console.log(pageParam, "hh");
    const res = await fetch(
      `http://swapi.dev/api/planets/?page=${page.queryKey[1]}`
    );
    return res.json();
  };
  //   useInfiniteQuery
  const { data, status, isPreviousData } = useInfiniteQuery(
    ["planetsData", page],
    fetchPlanetsDataInifinity,
    {
      getNextPageParam: (lastPage, pages) => {
        // if (lastPage.next) {
        //   return page;
        // }
        return page;
      },
    }
  );

  // useQuery
  //   console.log(data, "data");
  return (
    <>
      <div>Planets - Page {page}</div>
      <button
        disabled={page === 1}
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
      >
        Previous Page
      </button>
      <button
        disabled={page * 10 === data?.pages[0].count}
        onClick={() => setPage((old) => Math.max(old + 1, 1))}
      >
        Next Page
      </button>
      {status === "loading" && <div className="">Loading data...</div>}
      {status === "success" && (
        <div className="">
          {data?.pages[0]?.results?.map((item) => (
            <Planet key={item.name} planet={item} />
          ))}
        </div>
      )}
      {status === "error" && <div className="">Error fetching data</div>}
    </>
  );
};

export default Planets;
