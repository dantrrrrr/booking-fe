import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import './reserve.scss'
import { axiosRequest } from '../../hooks/axios'
import { useNavigate } from 'react-router-dom'

function Reserve({ setOpenModal, hotelId }) {

    const { data } = useFetch(`/hotels/room/${hotelId}`)
    // console.log(data)
    const [selectedRooms, setSelectedRooms] = useState([]);
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        )
    }
    // console.log(selectedRooms)
    const { state } = useContext(SearchContext)
    // console.log(state.dates)
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
            //add all day free to array from a range
        }

        return dates;
    };
    const alldates = getDatesInRange(state.dates[0].startDate, state.dates[0].endDate);
    // console.log(alldates)
    const isAvailable = (roomNumber) => {
        if(roomNumber.unavailableDates.length === 0){
            return false;
        }
        const isFound = roomNumber.unavailableDates.some(date => (
            alldates.includes(new Date(date).getTime())
        ));
        //if found date in array => true : means that room is not available on that day 
        return !isFound;
    }
    const navigate =useNavigate()
    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axiosRequest.put(`/room/availability/${roomId}`,
                    { dates: alldates });
                return res.data;

            }))
            setOpenModal(false)
            setTimeout(()=>{

               alert('Booking already made')
               navigate('/')
            },2000)

        } catch (error) {

        }
    }
    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='rClose ' onClick={() => setOpenModal(false)} />
                <span>Select your room</span>
                {
                    data && data.map(item => (
                        <div className="rItem">
                            <div className="rInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.desc}</div>
                                <div className="rMax">Max people : <b>{item.maxPeople}</b></div>
                                <div className="rPrice">{item.price}</div>
                            </div>
                            <div className="rSelectRooms">
                                {item.roomNumbers.map(rNumber => (

                                    <div className='room' key={rNumber._id}>
                                        <label htmlFor="">{rNumber.number}</label>
                                        <input type="checkbox" disabled={!isAvailable(rNumber)} value={rNumber._id} onChange={handleSelect} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    ))
                }
                <button onClick={handleClick} className="rButton">Reserve now !</button>
            </div>
        </div>
    )
}

export default Reserve