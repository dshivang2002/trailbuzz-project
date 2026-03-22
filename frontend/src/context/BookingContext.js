import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    package_id: '',
    package_name: '',
    travel_start_date: '',
    num_adults: 1,
    num_children: 0,
    trip_type: 'round_trip',
    pickup_location: '',
    drop_location: '',
    traveler: {
      full_name: '',
      email: '',
      mobile: '',
      address: '',
      id_proof_type: 'aadhaar',
      id_proof_number: '',
      emergency_contact_name: '',
      emergency_contact_number: ''
    },
    vehicle_id: '',
    vehicle_name: '',
    base_price: 0,
    vehicle_charges: 0,
    tax_amount: 0,
    total_amount: 0,
    advance_paid: 0,
    special_requirements: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateBookingData = (data) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBookingData({
      package_id: '',
      package_name: '',
      travel_start_date: '',
      num_adults: 1,
      num_children: 0,
      trip_type: 'round_trip',
      pickup_location: '',
      drop_location: '',
      traveler: {
        full_name: '',
        email: '',
        mobile: '',
        address: '',
        id_proof_type: 'aadhaar',
        id_proof_number: '',
        emergency_contact_name: '',
        emergency_contact_number: ''
      },
      vehicle_id: '',
      vehicle_name: '',
      base_price: 0,
      vehicle_charges: 0,
      tax_amount: 0,
      total_amount: 0,
      advance_paid: 0,
      special_requirements: ''
    });
    setCurrentStep(1);
  };

  return (
    <BookingContext.Provider value={{
      bookingData,
      updateBookingData,
      currentStep,
      setCurrentStep,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};
