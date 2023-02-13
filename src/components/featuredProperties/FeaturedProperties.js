import useFetch from '../../hooks/useFetch';
import './featuredProperties.scss'
import Loading from 'react-loading'

function FeaturedProperties() {
    const { data, loading } = useFetch('/hotels?featured=true&limit=4');
    // console.log(data)
    return (
        <div className='fp'>

            {loading ? (
                <Loading className='loading' type='balls' color='lightblue' height={20} width={200} />
            )

                : <>
                    {data.map((item) => (

                        <div className="fpItem" key={item._id}>

                            <img src={item.photos[0]} alt="" className="fpImg" />
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Start from {item.cheapestPrice}</span>
                            {item.rating && <div className="fpRating">
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>}

                        </div>
                    ))
                    }
                </>
            }



        </div >
    )
}

export default FeaturedProperties