import { Link } from 'react-router-dom'
import { BookingBtn } from '../../styles/styled'
import './searchItem.scss'

function SearchItem({ item }) {
    return (
        <div className='searchItem'>
            <img
                src={item.photos[0]}
                alt="search Item Img"
                className="siImg"
            />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance} from center</span>
                <span className='siTaxiOp'>Free taxi </span>
                <span className="siSubtitle">
                    with air condition and hot chick
                </span>
                <span className="siFeatures">
                    Entire
                </span>
                <span className="siCancelOp">Free cancel </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later .
                </span>

            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Bad</span>
                    <button className='siRatingNumber'>{item.rating}  </button>

                </div>}
                <div className="siDetailTexts">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTaxOp">Include taxes and fees</span>
                    <Link  className="link" to={`/hotels/${item._id} `}>
                        <BookingBtn className='siCheckButton'>See Availabitity</BookingBtn>

                    </Link>
                </div>
            </div>

        </div>
    )
}

export default SearchItem