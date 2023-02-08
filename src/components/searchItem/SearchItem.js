import './searchItem.scss'

function SearchItem() {
    return (
        <div className='searchItem'>
            <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/383234261.webp?k=aee7f35d56f26843488301dadca764759764cb2882008734c5dfaaeaad1841aa&o=&s=1"
                alt="search Item Img"
                className="siImg"
            />
            <div className="siDesc">
                <h1 className="siTitle">Tower jidwdw</h1>
                <span className="siDistance">500m from center</span>
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
                <div className="siRating">
                    <span>Bad</span>
                    <button>9.8</button>

                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">$123</span>
                    <span className="siTaxOp">Include taxes and fees</span>
                    <button className='siCheckButton'>See Availabitity</button>
                </div>
            </div>

        </div>
    )
}

export default SearchItem