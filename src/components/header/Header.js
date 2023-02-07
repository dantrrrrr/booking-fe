import './header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"


function Header() {
    return (
        <div className="header">
            <div className="headerContainer">

                <div className="headerList">
                    <div className="headerListItem active ">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>

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
                <h1 className="headerTitle">
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
                        />

                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="headerIcon"
                        />
                       <span>date to date</span>

                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon
                            icon={faPerson}
                            className="headerIcon"
                        />
                       <span className='headerSearchText'> 2 adults 2 children 1 room</span>

                    </div>
                    <div className="headerSearchItem">
                       <button className='headerBtn'>Search</button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Header