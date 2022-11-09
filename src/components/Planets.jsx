import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanetsData = async () => {
  const res = await fetch("http://swapi.dev/api/planets");
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery("planetsData", fetchPlanetsData);
  console.log(data, "data");
  return (
    <>
      <div>Planets</div>
      {/* <p>{status}</p>{" "} */}
      {status === "loading" && <div className="">Loading data...</div>}
      {status === "success" && (
        <div className="">
          {data.results.map((item) => (
            <Planet key={item.name} planet={item} />
          ))}
        </div>
      )}
      {status === "error" && <div className="">Error fetching data</div>}
    </>
  );
};

export default Planets;
