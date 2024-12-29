import { uploadBytesResumable } from 'firebase/storage'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UpdateExistingListing = () => {
      const navigate = useNavigate()
      const params = useParams()
      const [files, setFiles] = useState([])
      const [loadingImage, setLoadingImage] = useState(false)
      const [loadingSubmit, setLoadingSubmit] = useState(false)
      const [error, setError] = useState(null)
      const { currentUser } = useSelector(state => state.user)
      const [formData, setFormData] = useState({
            imageUrls: [],
            name: '',
            description: '',
            address: '',
            type: 'rent',
            bedrooms: 1,
            bathrooms: 1,
            regularPrice: 50,
            discountPrice: 0,
            offer: false,
            furnished: false,
            parking: false,
            userRef: currentUser._id
      })

      const cloud = import.meta.env.CLOUD_NAME

      useEffect(() => {
            const fetchListing = async () => {
                  const listingId = params.listingId
                  const res = await fetch(`/api/listing/getListing/${listingId}`)
                  const data = await res.json()
                  setFormData(data)
            }
            fetchListing()
      } , [])

      function handleFileChange(e) {
            const selectedFiles = e.target.files;
            const imageFiles = Array.from(selectedFiles).filter(file => file.type.startsWith("image/"));

            if (imageFiles.length !== selectedFiles.length) {
                  toast.warn('Only image files are allowed!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                  });
                  return; // Stop the file selection if there are non-image files
            }

            if (imageFiles.length > 6) {
                  toast.warn('You can upload a maximum of 6 images', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                  });
                  return; // Stop the file selection if more than 6 files are chosen
            }

            setFiles(imageFiles); // Otherwise, update the files state with only valid image files
      }



      async function handleImageUpload(e) {
            e.preventDefault()
            try {
                  setLoadingImage(true)
                  if (files.length > 0 && files.length <= 6) {
                        const updatedImageUrls = []
                        for (var i = 0; i < files.length; i++) {
                              const data = new FormData()
                              data.append("file", files[i])
                              data.append('upload_preset', "Real_Estate")
                              data.append("cloud_name", 'dgmuyffse')

                              const res = await fetch(`https://api.cloudinary.com/v1_1/dgmuyffse/image/upload`, {
                                    method: 'POST',
                                    body: data,
                              })

                              const result = await res.json()
                              updatedImageUrls.push(result.url)
                        }
                        setFormData((prev) => ({
                              ...prev,
                              imageUrls: updatedImageUrls
                        }))
                        setLoadingImage(false)
                  }
                  else {
                        if (files.length === 0) {
                              toast.warn('No images chosen', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                              });
                              setLoadingImage(false)
                              return
                        }
                        else if (files.length >= 7) {
                              toast.warn('Max 6 images allowed', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                              });
                              setLoadingImage(false)
                              return
                        }
                  }

            }
            catch (err) {
                  toast.error(err.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                  });
            }





      }

      async function handleSubmit(e) {
            e.preventDefault();
            try {
                  if (formData.imageUrls.length < 1) {
                        setError('You must choose atleast one image!!')
                        toast.warn(error, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        return
                  }
                  if (+formData.regularPrice < +formData.discountPrice) {
                        setError('Discounted Price should be less than Regular Price!!')
                        toast.warn(error, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        return 
                  }
                  setError(null)
                  setLoadingSubmit(true)
                  const res = await fetch(`/api/listing/update/${params.listingId}`, {
                        method: 'POST',
                        headers: {
                              'Content-type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                  })
                  const data = await res.json()
                  if (data.success === false) {
                        setError(data.message)
                        setLoadingSubmit(false)
                        toast.error(data.message, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        return
                  }
                  setLoadingSubmit(false)
                  navigate(`/listing/${data._id}`)
            }
            catch (err) {
                  setLoadingSubmit(false)
                  setError(err.message)
                  toast.error(err.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                  });
            }

      }

      function handleImageDelete(e, index) {
            e.preventDefault()
            const deletedImages = formData.imageUrls.filter((_, idx) => idx !== index)
            setFormData((prev) => ({
                  ...prev,
                  imageUrls: deletedImages,
            }))
      }

      const handleInputChange = (e) => {
            if (e.target.id === 'sale' || e.target.id === 'rent') {
                  setFormData({
                        ...formData,
                        type: e.target.id
                  })
            }
            if (
                  e.target.id === 'parking' ||
                  e.target.id === 'furnished' ||
                  e.target.id === 'offer'
            ) {
                  setFormData({
                        ...formData,
                        [e.target.id]: e.target.checked,
                  });
            }

            if (
                  e.target.type === 'number' ||
                  e.target.type === 'text' ||
                  e.target.type === 'textarea'
            ) {
                  setFormData({
                        ...formData,
                        [e.target.id]: e.target.value,
                  });
            }
      }




      return (
            <main className='p-3 max-w-4xl mx-auto'>
                  <h1 className='text-3xl text-center p-5 font-semibold'>Update Listing</h1>
                  <form onSubmit={(e) => { handleSubmit(e) }} className='flex flex-col sm:flex-row gap-4'>

                        <div className='flex flex-col gap-4 flex-1'>

                              <input id='name' type="text" placeholder='Name' required maxLength='64'
                                    minLength='10'
                                    className='focus:outline-none border p-3 rounded-lg'
                                    onChange={(e) => { handleInputChange(e) }}
                                    value={formData.name}
                              />

                              <textarea id='description' type="text" placeholder='Description' required
                                    className='focus:outline-none border p-3 rounded-lg'
                                    onChange={(e) => { handleInputChange(e) }}
                                    value={formData.description}

                              />

                              <input id='address' type="text" placeholder='Address' required
                                    className='focus:outline-none border p-3 rounded-lg'
                                    onChange={(e) => { handleInputChange(e) }}
                                    value={formData.address}
                              />



                              <div className='mt-3 flex gap-4 flex-wrap'>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='sale' className='w-5'
                                                onChange={(e) => { handleInputChange(e) }}
                                                checked={formData.type == 'sale'}
                                          />
                                          <span>Sell</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='rent' className='w-5'
                                                onChange={(e) => { handleInputChange(e) }}
                                                checked={formData.type == 'rent'}
                                          />
                                          <span>Rent</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='parking' className='w-5'
                                                onChange={(e) => { handleInputChange(e) }}
                                                checked={formData.parking} />
                                          <span>Parking Spot</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='furnished' className='w-5'
                                                onChange={(e) => { handleInputChange(e) }}
                                                checked={formData.furnished}
                                          />
                                          <span>Furnished</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='offer' className='w-5'
                                                onChange={(e) => { handleInputChange(e) }}
                                                checked={formData.offer}
                                          />
                                          <span>Offer</span>
                                    </div>
                              </div>

                              <div className='mt-3 flex flex-wrap gap-6'>
                                    <div className='flex items-center gap-2'>
                                          <input
                                                type='number'
                                                id='bedrooms'
                                                min='1'
                                                max='10'
                                                required
                                                className='p-3 border border-gray-300 rounded-lg'
                                                onChange={handleInputChange}
                                                value={formData.bedrooms}
                                          />
                                          <span>Beds</span>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                          <input
                                                type='number'
                                                id='bathrooms'
                                                min='1'
                                                max='10'
                                                required
                                                className='p-3 border border-gray-300 rounded-lg'
                                                onChange={handleInputChange}
                                                value={formData.bathrooms}
                                          />
                                          <span>Bath</span>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                          <div className='flex items-center gap-2'>
                                                <input type="number"
                                                      id='regularPrice'
                                                      required
                                                      min='50'
                                                      max='100000'
                                                      className='border border-gray-400 rounded-lg p-3'
                                                      onChange={(e) => { handleInputChange(e) }}
                                                      value={formData.regularPrice}
                                                />
                                                <div className='flex flex-col'>
                                                      <span>Regular Price</span>
                                                      <span className={`text-xs ${formData.type === 'rent' ? '' : 'hidden'}`}>(₹ / month)</span>
                                                </div>
                                          </div>

                                          <div className={`flex items-center gap-2 ${formData.offer ? '' : 'hidden'}`}>
                                                <input type="number"
                                                      id='discountPrice'
                                                      required
                                                      min='0'
                                                      max='100000'
                                                      className='border border-gray-400 rounded-lg p-3'
                                                      onChange={(e) => { handleInputChange(e) }}
                                                      value={formData.discountPrice}
                                                />
                                                <div className={`flex flex-col `}>
                                                      <span>Discount Price</span>
                                                      <span className='text-xs'>(₹ / month)</span>
                                                </div>
                                          </div>

                                    </div>

                              </div>

                        </div>

                        <div className='flex flex-col flex-1 gap-2'>
                              <p className='font-semibold'>
                                    Images:
                                    <span className='font-normal text-gray-600 ml-3'>The first image will be cover(max 6)</span>
                              </p>
                              <div className='flex items-center gap-2'>
                                    <input type="file"
                                          id='images'
                                          accept='images/*'
                                          multiple
                                          className='border border-gray-300 w-full rounded p-3 focus:outline-none'
                                          onChange={(e) => { handleFileChange(e) }}
                                    />
                              </div>
                              <button disabled={loadingImage} onClick={(e) => { handleImageUpload(e) }} type='button' className='uppercase border border-green-700 text-green-700 hover:opacity-95 disabled:opacity-80 p-3'>
                                    {loadingImage ? 'Loading...' : 'Upload'}
                              </button>
                              <button disabled={loadingSubmit || loadingImage} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                                    {loadingSubmit ? 'Updating...' : 'Update Listing'}
                              </button>
                              {error &&
                                    <p className = 'text-red-600 '>{error}</p>
                              }

                              {formData.imageUrls.length > 0 &&
                                    <div>
                                          {formData.imageUrls.map((url, index) => {
                                                return (
                                                      <div key={index} className='flex justify-between p-3 items-center'>
                                                            <img
                                                                  key={index}
                                                                  src={url}
                                                                  alt="image"
                                                                  className='w-24 h-24 object-contain rounded-xl'
                                                            />
                                                            <button
                                                                  type='button'
                                                                  onClick={(e) => { handleImageDelete(e, index) }}
                                                                  className='text-red-700 uppercase p-3 hover:opacity-75'>
                                                                  Delete
                                                            </button>
                                                      </div>
                                                )
                                          })}
                                    </div>
                              }

                        </div>

                  </form>
            </main>
      )
}

export default UpdateExistingListing