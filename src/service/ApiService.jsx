import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

const ApiService = {
    /** AUTH */
    registerUser: async (registration) => (await axios.post(`${BASE_URL}/auth/register`, registration)).data,
    loginUser: async (loginDetails) => (await axios.post(`${BASE_URL}/auth/login`, loginDetails)).data,
    
    /** USERS */
    getAllUsers: async () => (await axios.get(`${BASE_URL}/users/all`, { headers: getHeader() })).data,
    getUserProfile: async () => (await axios.get(`${BASE_URL}/users/get-logged-in-profile-info`, { headers: getHeader() })).data,
    getUser: async (userId) => (await axios.get(`${BASE_URL}/users/get-by-id/${userId}`, { headers: getHeader() })).data,
    editProfile:async (userId,user)=>(await axios.put(`${BASE_URL}/users/edit-profile/${userId}`,user,{headers:getHeader()})).data,
    getUserBookings: async (userId) => (await axios.get(`${BASE_URL}/users/get-user-bookings/${userId}`, { headers: getHeader() })).data,
    deleteUser: async (userId) => (await axios.delete(`${BASE_URL}/users/delete/${userId}`, { headers: getHeader() })).data,
    
    /** ROOMS */
    addRoom: async (formData) => (await axios.post(`${BASE_URL}/rooms/add`, formData, { headers: { ...getHeader(), 'Content-Type': 'multipart/form-data' } })).data,
    getAllAvailableRooms: async () => (await axios.get(`${BASE_URL}/rooms/all-available-rooms`)).data,
    getAvailableRoomsByDateAndType: async (checkInDate, checkOutDate, roomType) => (await axios.get(`${BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)).data,
    getRoomTypes: async () => (await axios.get(`${BASE_URL}/rooms/types`)).data,
    getAllRooms: async () => (await axios.get(`${BASE_URL}/rooms/all`)).data,
    getRoomById: async (roomId) => (await axios.get(`${BASE_URL}/rooms/room-by-id/${roomId}`)).data,
    deleteRoom: async (roomId) => (await axios.delete(`${BASE_URL}/rooms/delete/${roomId}`, { headers: getHeader() })).data,
    updateRoom: async (roomId, formData) => (await axios.put(`${BASE_URL}/rooms/update/${roomId}`, formData, { headers: { ...getHeader(), 'Content-Type': 'multipart/form-data' } })).data,
    
    /** BOOKINGS */
    bookRoom: async (roomId, userId, booking) => (await axios.post(`${BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, { headers: getHeader() })).data,
    getAllBookings: async () => (await axios.get(`${BASE_URL}/bookings/all`, { headers: getHeader() })).data,
    getBookingByConfirmationCode: async (bookingCode) => (await axios.get(`${BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`)).data,
    cancelBooking: async (bookingId) => (await axios.delete(`${BASE_URL}/bookings/cancel/${bookingId}`, { headers: getHeader() })).data,
    
    /** AUTHENTICATION CHECKER */
    logout: () => { localStorage.removeItem('token'); localStorage.removeItem('role'); },
    isAuthenticated: () => !!localStorage.getItem('token'),
    isAdmin: () => localStorage.getItem('role') === 'ADMIN',
    isUser: () => localStorage.getItem('role') === 'USER',
};

export default ApiService;
