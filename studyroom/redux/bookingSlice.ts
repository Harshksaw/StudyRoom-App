import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface BookingDetails {
//   selectedSeat: string | null;
//   selectedDate: string | null;
//   selectedNumber: number | null;
//   selectedTimeSlot: string | null;
// }

// interface BookingState {
//   details: BookingDetails;
// }

const initialState: any = {
  details: {
    amenities: [],
    images: [],
    location: "",
    name: '',
    price: 0,
    id: '',
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDetails(state, action: PayloadAction<any>) {
      state.details = action.payload;
    },
    resetBookingState(state) {
      state.details = initialState.details;
    }
    // Optionally, add more reducers here for individual updates if needed
  },
});

export const { setBookingDetails, resetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;