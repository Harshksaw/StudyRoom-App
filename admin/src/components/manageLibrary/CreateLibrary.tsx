import React from "react";
// import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "./Perks.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
// import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import LocationSelector from "./LocationSelector.tsx";
// type Props = {};

const CreateLibrary = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);


  const [location ,setLocation] = useState(null);
  // useEffect(() => {
  //   if (!id) {
  //     return;
  // //   }
  //   axios.get("/places/" + id).then((response) => {
  //     const { data } = response;
  //     setTitle(data.title);
  //     setAddress(data.address);
  //     setAddedPhotos(data.photos);
  //     setDescription(data.description);
  //     setPerks(data.perks);
  //     setExtraInfo(data.extraInfo);
  //     setCheckIn(data.checkIn);
  //     setCheckOut(data.checkOut);
  //     setMaxGuests(data.maxGuests);
  //     setPrice(data.price);
  //   });
  // }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preentDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    // return <Navigate to={"/account/places"} />;
  }
  const handleLocationSelect = (location) => {
    console.log("Selected Location:", location);
    setLocation(location);
    // Further processing or state updates with the selected location
  };

  return (
    <div className="m-2 ">
      {/* <AccountNav /> */}
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />
        {preInput("Photos", "more = better")}
        {/* <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
        {preInput("Description", "description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", "select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "time slots",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1"> from</h3>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">to</h3>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
       
      </form>
      <LocationSelector onLocationSelect={handleLocationSelect} />


      {title && address && description && perks.length > 0 && extraInfo && from && to && maxGuests && price ? (

        <div className="flex justify-center">
        <button className="bg-blue-300 w-20 h-5  rounded-md m-10 " onClick={savePlace}>
          Save
        </button>
      </div>
      ) : (
        <div className="m-10 p-5 ">
          <p className="text-red-500 align-center">Please fill all the fields</p>
        </div>
      )}
    </div>
  );
};

export default CreateLibrary;
