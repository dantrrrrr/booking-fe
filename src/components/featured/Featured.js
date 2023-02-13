import useFetch from '../../hooks/useFetch'
import './featured.scss'
import Loading from 'react-loading'

function Featured() {
    const { data, loading, error } = useFetch('/hotels/city?cities=Quy Nhon,Da Lat,da nang,Nha Trang');

    // console.log(data, loading, error);   
    return (
        <div className='featured'>
            {   loading ?(
                <Loading className='loading' type='balls' color='lightblue' height={20} width={200} />
            ):
                <>
                    <div className="featuredItem">
                        <img className='featuredImg' src="https://bafybeigrr6ljji7vgxdgz7ub6qirjfsa2kni4x35ndsj5qlovhskkjhtmq.ipfs.w3s.link/quynhonpullman.jpeg" alt="" />
                        <div className="featuredTitles">
                            <h1>Quy Nhơn</h1>
                            <h2>{data[0]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img className='featuredImg' src="https://bafybeihfbc3lj4quu5345u7hjquarkuvlihu4gd5h74poblvkbtht2muny.ipfs.w3s.link/dalat.jpeg" alt="" />
                        <div className="featuredTitles">
                            <h1>Đà Lạt</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img className='featuredImg' src="https://bafybeidkywarscra6w7hmpyob5tposkzibs5mc6m2hk7afpjg3mzl6kewa.ipfs.w3s.link/danang.jpeg" alt="" />
                        <div className="featuredTitles">
                            <h1>Đà Nẵng</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img className='featuredImg' src="https://bafybeig45oznscaflzigipya7xqauoyu55uem5r5ypvxk4oagyu76su22u.ipfs.w3s.link/nhatrang.jpeg" alt="" />
                        <div className="featuredTitles">
                            <h1>Nha Trang</h1>
                            <h2>{data[3]} properties</h2>
                        </div>
                    </div>
                </>
            }


        </div >
    )
}

export default Featured