import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext';

function Header({ type }) {
    const { dispatch } = useContext(SearchContext);

   
    console.log("Render header")
    const [open, setOpen] = useState({
        date: false,
        options: false
    })

    const [destination, setDestination] = useState("Nha Trang");
    const [dates, setDates] = useState([{
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
        key: 'selection'

    }
    ]);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const navigate = useNavigate();
    const handleOption = (name, type) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: type === 'increase' ? options[name] + 1 : options[name] - 1,
            };
        });
    }
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate('/hotels',
        );
    }
    return (
        <div className="header">
            <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>

                <div className="headerList">
                    <div className="headerListItem active ">
                        <Link to="/hotels" className="link">

                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                        </Link>

                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>

                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car</span>

                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxi</span>

                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>

                    </div>
                </div>
                {type !== 'list' && <>                <h1 className="headerTitle">
                    A Booking web made by ReactJs
                </h1>
                    <p className="headerDesc">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, iste pariatur at ex officia deserunt totam non iusto. Aperiam corporis dolorum repellendus accusantium odit cumque mollitia rerum incidunt inventore? Recusandae!
                    </p>
                    <button className="headerButton">Sign In / Register</button>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon
                                icon={faBed}
                                className="headerIcon"
                            />
                            <input type="text"
                                name=""
                                id=""
                                className='headerSearchInput'
                                placeholder='Where u gonna go ? :))'
                                onChange={e => setDestination(e.target.value)}
                            />

                        </div>
                        <div className="headerSearchItem" >
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                className="headerIcon"
                            />
                            <span className='headerSearchText' onClick={() => setOpen(prev => ({ ...prev, date: !prev.date }))}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                            {open.date && <DateRange
                                className='date'
                                onChange={item => setDates([item.selection])}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={1}
                                ranges={dates}
                                direction="horizontal"
                                minDate={new Date()}
                            />}

                        </div>
                        <div className="headerSearchItem" >
                            <FontAwesomeIcon
                                icon={faPerson}
                                className="headerIcon"
                            />
                            <span onClick={() => setOpen(prev => ({ ...prev, options: !prev.options }))} className='headerSearchText'>{`${options.adult}  adults ${options.children} children ${options.room} room`}</span>
                            {open.options && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button
                                            disabled={options.adult <= 1}

                                            className="optionCounterButton"
                                            onClick={() => handleOption('adult', 'decrease')}
                                        >-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button
                                            className="optionCounterButton" onClick={() => handleOption('adult', 'increase')}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button
                                            className="optionCounterButton"
                                            disabled={options.children <= 0}
                                            onClick={() => handleOption('children', 'decrease')}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button
                                            className="optionCounterButton"
                                            onClick={() => handleOption('children', 'increase')}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button
                                            className="optionCounterButton"
                                            disabled={options.room <= 1}
                                            onClick={() => handleOption('room', 'decrease')}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button
                                            className="optionCounterButton"
                                            onClick={() => handleOption('room', 'increase')}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button className='headerBtn' onClick={handleSearch}>Search</button>

                        </div>

                    </div>
                </>}

            </div>

        </div>
    )
}

export default Header