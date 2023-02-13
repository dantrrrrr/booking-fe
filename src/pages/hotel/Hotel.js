import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './hotel.scss'
import { BookingBtn } from '../../styles/styled'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'


function Hotel() {
  const { state } = useContext(SearchContext);

  const { hotelId } = useParams();

  const [slide, setSlide] = useState({
    number: 0,
    isOpen: false
  })
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = (i) => {

    setSlide(prev => ({
      ...prev,
      number: i,
      isOpen: true
    }))
  }
  const handleSlide = (direction) => {
    let newSlideNumber;
    if (direction === "L") {
      newSlideNumber = slide.number === 0 ? data.photos.length - 1 : slide.number - 1;
    } else {
      newSlideNumber = slide.number === data.photos.length - 1 ? 0 : slide.number + 1;

    }
    setSlide(prev => ({ ...prev, number: newSlideNumber }));
  }
  const { data, loading } = useFetch(`/hotels/find/${hotelId}`)
  console.log(data)
  const dayRange = (d1, d2) => {
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff;

  }
  const days = (dayRange(state.dates[0]?.startDate, state.dates[0]?.endDate))
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
    console.log('open reserver')
  }
  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className="hotelContainer">
        {loading ? 'loading' : <>
          {slide.isOpen &&
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setSlide(prev => ({ ...prev, isOpen: false }))} />

              <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleSlide("L")} />
              <div className="sliderWrapper">
                <img src={data.photos[slide.number]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleSlide("R")} />
            </div>
          }
          <div className="hotelWrapper">
            <BookingBtn className='bookNow'>Reserve or Book now !</BookingBtn>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>

            <span className="hotelDistance">Excellent location - {data.distance} from center </span>
            <span className="hotelPriceHightLight">
              Book a stay over  ${data.cheapestPrice} at our hotel
            </span>

            <div className="hotelImages">
              {data.photos &&
                data.photos.map((photo, index) => (
                  <div className="hotelImgWrapper" key={index}>
                    <img onClick={() => handleOpen(index)} src={photo} alt="" className="hotelImg" />
                  </div>
                ))
              }
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay inside hotel for safe</h1>
                <p className="hotelDesc">
                 {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect decision for a {days}-night stay</h1>
                <span>Locate in Lorem ipsum dolor sit amet consectetur adipisicius dolorem voluptates eos quidem debitis tenetur accusantium, harum omnis aliquam perferendis explicabo quia optio autem? Debitis, provident pariatur! Cum?</span>
                <h2><b>VND {days * data.cheapestPrice * state.options.room}</b> ({days} nights / {state.options.room}-room </h2>
                <BookingBtn onClick={handleClick}>Reserve or Book Now! </BookingBtn>

              </div>

            </div>
          </div>
          <MailList />
          <Footer />
        </>}
      </div>
      {openModal && <Reserve setOpenModal={setOpenModal} hotelId={hotelId} />}
    </>
  )
}

export default Hotel

