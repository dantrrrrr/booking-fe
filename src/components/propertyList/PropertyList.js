import useFetch from '../../hooks/useFetch';
import './propertyList.scss'
import Loading from 'react-loading'
import { memo } from 'react';

function PropertyList() {
  const { data, loading, error } = useFetch('/hotels/type');
  const images = [
    "https://bafybeibydzu4wwc7zmxktnjhos56v4x6p7dzvrpkkjda6gqxviarr7gs4y.ipfs.w3s.link/villa.jpeg",
    "https://bafybeifc6oggajqyctuflcuittmuktgpa3q6zo5y7ulwtxzljxzcxokiy4.ipfs.w3s.link/hotel1.jpeg",
    "https://bafybeiblcudcq2wqynbltlveflk7zqesfy365jhozmscp4tahsg4ljrzue.ipfs.w3s.link/hotel3.jpeg",
    "https://bafybeifsclyjntdflkv6ql6sa6r2loqu5j4wijarwct7pgir4i2gupldzu.ipfs.w3s.link/rsnew.jpeg",
   
  ]
  return (
    <div className='pList'>
      {
        loading
          ?
          (
            <Loading className='loading' type='balls' color='lightblue' height={20} width={200} />
          )
          :
          <>
            {
              data.length !== 0 && images.map((img, index) => (
                <div className='pListItem' key={index}>
                  <img
                    src={img}
                    className='pListImg'
                    alt="" />
                  <div className="pListTitles">
                    <h1>{data[index]?.type}</h1>
                    <h2>{data[index]?.count} {data[index]?.type}</h2>
                  </div>
                </div>
              ))}

          </>
      }

    </div>
  )
}

export default memo(PropertyList)