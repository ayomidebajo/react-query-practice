import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeopleData = async () => {
  const res = await fetch("http://swapi.dev/api/people");
  return res.json();
};

const People = () => {
  const { data, status } = useQuery("peopleData", fetchPeopleData);
  console.log(data, "data");
  return (
    <>
      <div>People</div>
      {/* <p>{status}</p>{" "} */}
      {status === "loading" && <div className="">Loading data...</div>}
      {status === "success" && (
        <div className="">
          {data.results.map((item) => (
            <Person key={item.name} person={item} />
          ))}
        </div>
      )}
      {status === "error" && <div className="">Error fetching data</div>}
    </>
  );
};

export default People;
