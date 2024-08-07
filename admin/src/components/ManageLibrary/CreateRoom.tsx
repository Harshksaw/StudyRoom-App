import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";
import LocationSelector from "./LocationSelector";
import Seats from "../seatinglayout/SeatLayout";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Progress } from "@/components/ui/progress"
import { toast } from "react-toastify";
import { getLibraryDataById } from "@/hooks/libraryData";


const CreateRoom: React.FC = () => {
  const [libraryId, setLibraryId] = React.useState("");
  const [libraryData, setLibraryData] = React.useState<any[]>([]);
  const [seatLayout, setSeatLayout] = React.useState({});

  const [location, setLocation] = React.useState(null);
  const [loading, setLoading] = useState(false); // Step 1: Loading state
  // const [rooms, setRooms] = useState([]);
  const [progress, setProgress] = React.useState(13)
  const [selectedRoom, setSelectedRoom] = useState(0);

  const [selectedLibrary, setSelectedLibrary] = useState<any>(null);
  const [timeSlots, setTimeSlots] = useState<any[]>([
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
  ]);
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await getLibraryDataById();
        console.log(response.data.data);
        setLibraryData(response.data.data);
        setSelectedRoom(response.data.data?.rooms);
      } catch (error) {
        console.error("Error fetching library:", error);
        // Handle error
      }
    };
    fetchLibrary();
  }, []);


  useEffect(() => {
    const libraryObject = libraryData.find(library => library?._id === libraryId);
    setSelectedLibrary(libraryObject);
  
  }, [libraryId]);
  console.log(selectedLibrary);


  const handleLocationSelect = (location: any) => {
    console.log("Selected Location:", location);
    setLocation(location);
  };

  const handleSeatSelect = (seat:any) => {
    console.log(seat)

    setSeatLayout(seat);
    // console.log(seatLayout);
    // setSeatLayout((prev) => [...prev, seat]);
  };
  const handleTimeChange = (index :any, type:any, newValue:any) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][type] = newValue;
    setTimeSlots(updatedTimeSlots);
    // console.log(updatedTimeSlots);
  };

  const handleLibraryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLibraryId(event.target.value);

    // setRooms(libraryData?.rooms)

  };
  function handlePriceChange(index : any, newValue : any) {

    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].price = newValue;
    setTimeSlots(updatedTimeSlots); // Update your state with the new timeSlots array
  }



  const createRoom = async () => {
    console.log("Creating Room", libraryId, seatLayout, selectedRoom, selectedLibrary);
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/api/v1/library/createRoom`,
        {
          libraryId: libraryId,

          seatLayout: seatLayout,
        }
      );
      console.log(response.data, "Room Created");
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };


  const addDetails = async () => {

    const formattedTimeSlots = timeSlots.map((timeSlot) => ({
      ...timeSlot,
      from: timeSlot.from ? dayjs(timeSlot.from).format("hh:mm A") : null,
      to: timeSlot.to ? dayjs(timeSlot.to).format("hh:mm A") : null,
    }));

    console.log(formattedTimeSlots);
    // console.log(seatLayout);

    console.log("Adding Details", libraryId,  location);
    try {
         await axios.post(
        `${BASEURL}/api/v1/library/updateRoom`,
        {
          libraryId: libraryId,

          timeSlot: formattedTimeSlots,
          location: location,
        }
      );
      toast.success("Room Created/updated Successfully")
      setLoading(false);
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };




  const handleSubmit = async () => {
    try {
      if (!libraryId) {
        toast.error("Please relogin, NO library Exists")
      }


      await createRoom();

      await addDetails();
      toast.success("Room Created/updated Successfully")
      // window.location.reload();

    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };
  // console.log(selectedRoom)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Progress value={progress} className="w-[60%]" />
  }

  // console.log("----->", selectedLibrary.rooms, selectedLibrary.rooms.length )
  return (
    <div className="flex flex-col bg-gray-100 items-center  gap-y-25 overflow-y-scroll h-screen mb-20">
      <div className="mt-20 ">
        <select value={libraryId} onChange={handleLibraryChange}>
          <option value="">Select a Library</option>
          {libraryData?.map((library: any) => (
            <option
              key={library._id}
              value={library._id}
              className="bg-gray-500  rounded-lg mt-2 mb-5  p-10"
            >
              {library.name}
            </option>
          ))}
        </select>

      </div>
      <div className="mt-10 flex-col 
      justify-center items-center  gap-y-5
      ">
     <h2 style={{ fontSize: '24px', color: '#333', textAlign: 'center', margin: '20px 10px' }}>
  You are creating Room no 
  <span style={{ background: '#4CAF50', color: '#fff', padding: '5px 15px', borderRadius: '5px' }}>
    {selectedLibrary?.rooms.length + 1}
  </span>
</h2>



      </div>

      <div className="mt-20 mb-32  h-96">

        <Seats onSeatSelect={handleSeatSelect} />




      </div>

      <div className="w-[90%] mx-20 mt-60">
        <h2 className="text-center">Select Time Slots</h2>
        {timeSlots.map((timeRange, index) => (
          <div className="flex-col  justify-center items-center">
            <div
              key={index}
              className="flex justify-evenly items-center bg-gray-200 p-2 mt-2 mb-5 rounded-xl"
            >

              <TimePicker
                label="From"
                value={timeRange.from}
                onChange={(newValue) => handleTimeChange(index, "from", newValue)}
              />
              <TimePicker
                label="To"
                value={timeRange.to}
                onChange={(newValue) => handleTimeChange(index, "to", newValue)}
              />
            </div>
            <div className="max-w-[30%] flex  flex-col  justify-center items-cente">

              <input
                type="number"
                className="form-input rounded-md ml-60"
                value={timeRange.price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
                placeholder="Price"
              />
            </div>
          </div>
        ))}
      </div>

      <div className=" w-full h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>
      <div className="flex-col  h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">


        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}{" "}

          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
