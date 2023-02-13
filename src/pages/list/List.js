import React, { memo, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import './list.scss';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import { BookingBtn } from '../../styles/styled'
import { SearchContext } from '../../context/SearchContext';
import Loading from 'react-loading'
function List() {
  console.log('render')

  const { state, dispatch } = useContext(SearchContext);


  const [searchData, setSearchData] = useState({ })
  useEffect(() => {
    setSearchData(prev => ({
      ...prev,
      destination: state.destination,
      dates: state.dates,
      options: state.options
    }))
  }, [])

  console.log("search data :", searchData)

  const [range, setRange] = useState({
    min: 100000,
    max: 100000000
  })

  const [openDate, setOpenDate] = useState(false);
  const { data, loading, reFetch } = useFetch(`/hotels?city=${searchData.destination ===undefined ? state.destination :searchData.destination}&min=${range.min}&max=${range.max}`);
  const handleSearch = () => {
    reFetch();
    dispatch({ type: "NEW_SEARCH", payload: searchData })

  }
  const handleOptions = (e) => {
    setSearchData(prev => ({ ...prev, options: { ...prev.options, [e.target.id]: e.target.value } }))
  }
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={state.destination}
                // onChange={e => dispatch({ type: "NEW_SEARCH", payload: { destination: e.target.value, dates: state.dates, options: state.options } })}
                onChange={e => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check In date</label>
              <span className='lsDate' onClick={() => setOpenDate(!openDate)}>{searchData.dates && ` ${format(searchData.dates[0]?.startDate, 'dd/MM/yyyy')} to ${format(searchData.dates[0]?.endDate, 'dd/MM/yyyy')}`}</span>
              {openDate && <DateRange
                className='date'
                onChange={item => setSearchData(prev => ({ ...prev, dates: [item.selection] }))}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={searchData.dates}
                minDate={new Date()}
                direction="horizontal"
              />}
            </div>
            <div className="lsItem">

              <label htmlFor="">Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min Price <small>per night</small></span>
                  <input type="number" className="lsOptionInput" onChange={e => setRange(prev => ({ ...prev, min: e.target.value }))} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max Price <small>per night</small></span>
                  <input type="number" className="lsOptionInput" onChange={e => setRange(prev => ({ ...prev, max: e.target.value }))} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult  </span>
                  <input type="number" min={1} className="lsOptionInput" onChange={handleOptions} id='adult' placeholder={searchData.options?.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children </span>
                  <input type="number" min={0} className="lsOptionInput" onChange={handleOptions} id='children' placeholder={searchData.options?.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room </span>
                  <input type="number" min={1} className="lsOptionInput" onChange={handleOptions} id='room' placeholder={searchData.options?.room} />
                </div>
              </div>
            </div>
            <BookingBtn onClick={handleSearch}>Search</BookingBtn>
          </div>
          <div className="listResult">
            {
              loading
                ? <Loading className='loading' type='balls' color='lightblue' height={20} width={200} />


                : (
                  data.length !== 0 ?
                    <>
                      {
                        data.map((item, index) => (
                          <SearchItem item={item} key={item._id} />

                        ))

                      }
                    </>

                    : "No hotels found"
                )


            }

          </div>
        </div>
      </div>
    </>
  )
}

export default (List)