import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {
  SwiperCore.use([Navigation])
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const params = useParams()
  useEffect(() => {
    try {
      setLoading(true)
      const fetchListing = async () => {
        const listing = await fetch(`/api/listing/getListing/${params.listingId}`)
        const data = await listing.json()
        if (data.success === false) {
          console.log(data.message)
          setError(true)
          setLoading(false)
          return
        }
        setListing(data)
        setLoading(false)
        console.log(data)
      }
      fetchListing()

    }
    catch (err) {
      console.log(err.message)
      setError(true)
      setLoading(false)

    }

  }, [params.listingId])
  return (
    <main>
      {loading &&
        <p className='text-2xl text-center mt-24'>Loading...</p>
      }
      {error &&

        <Link to={'/'} >
          <p className='text-center text-2xl mt-24'>something went wrong!</p>
        </Link>
      }

      {listing && !error && !loading &&
        <div>
           <Swiper navigation>
            {listing && listing.imageUrls.map(url => (
              <SwiperSlide key = {url}>
                <div className='h-[550px]' style = {{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize:  `cover`

                }}></div>
              </SwiperSlide>
            ))}
           </Swiper>
        </div>
      }
    </main>
  )
}

export default Listing