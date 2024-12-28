import { uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const CreateListing = () => {
      const [files, setFiles] = useState([])
      const [imageUrls, setImageUrls] = useState([]);
      console.log(imageUrls)

      const cloud = import.meta.env.CLOUD_NAME

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
                        setImageUrls(updatedImageUrls)
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

      }

      function handleImageDelete(e , index){
            e.preventDefault()
            const deletedImages = imageUrls.filter((url , idx) => idx !== index)
            setImageUrls(deletedImages)
      }



      return (
            <main className='p-3 max-w-4xl mx-auto'>
                  <h1 className='text-3xl text-center p-5 font-semibold'>Create a Listing</h1>
                  <form onSubmit={(e) => { handleSubmit(e) }} className='flex flex-col sm:flex-row gap-4'>

                        <div className='flex flex-col gap-4 flex-1'>

                              <input id='name' type="text" placeholder='Name' required maxLength='64'
                                    minLength='10'
                                    className='focus:outline-none border p-3 rounded-lg' />

                              <textarea id='description' type="text" placeholder='Description' required
                                    className='focus:outline-none border p-3 rounded-lg' />

                              <input id='address' type="text" placeholder='Address' required
                                    className='focus:outline-none border p-3 rounded-lg' />


                              <div className='mt-3 flex gap-4 flex-wrap'>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='sell' className='w-5' />
                                          <span>Sell</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='rent' className='w-5' />
                                          <span>Rent</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='sell' className='w-5' />
                                          <span>Sell</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='parking' className='w-5' />
                                          <span>Parking Spot</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='furnished' className='w-5' />
                                          <span>Furnished</span>
                                    </div>
                                    <div className='flex gap-2'>
                                          <input type="checkbox" id='offer' className='w-5' />
                                          <span>Offer</span>
                                    </div>
                              </div>

                              <div className='mt-3 flex flex-wrap gap-6'>
                                    <div className='flex items-center gap-2'>
                                          <input type="number"
                                                id='bedroom'
                                                required
                                                max={1}
                                                min={10}
                                                className='border border-gray-400 rounded-lg p-3' />
                                          <span>Beds</span>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                          <input type="number"
                                                id='bathroom'
                                                required
                                                max={1}
                                                min={10}
                                                className='border border-gray-400 rounded-lg p-3' />
                                          <span>Bath</span>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                          <div className='flex items-center gap-2'>
                                                <input type="number"
                                                      id='regularPrice'
                                                      required
                                                      max={1}
                                                      min={10}
                                                      className='border border-gray-400 rounded-lg p-3' />
                                                <div className='flex flex-col'>
                                                      <span>Regular Price</span>
                                                      <span>(₹ / month)</span>
                                                </div>
                                          </div>

                                          <div className='flex items-center gap-2'>
                                                <input type="number"
                                                      id='discountPrice'
                                                      required
                                                      max={1}
                                                      min={10}
                                                      className='border border-gray-400 rounded-lg p-3' />
                                                <div className='flex flex-col'>
                                                      <span>Discount Price</span>
                                                      <span>(₹ / month)</span>
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
                              <button onClick={(e) => { handleImageUpload(e) }} type='button' className='uppercase border border-green-700 text-green-700 hover:opacity-95 disabled:opacity-80 p-3'>
                                    Upload
                              </button>
                              <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>

                              {imageUrls.length > 0 &&
                                    <div>
                                          {imageUrls.map((url, index) => {
                                                return (
                                                      <div key = {index} className = 'flex justify-between p-3 items-center'>
                                                            <img
                                                                  key={index}
                                                                  src={url}
                                                                  alt="image"
                                                                  className='w-24 h-24 object-contain rounded-xl'
                                                            />
                                                            <button
                                                            type = 'button'
                                                            onClick = {(e ) => {handleImageDelete(e , index)}} 
                                                            className = 'text-red-700 uppercase p-3 hover:opacity-75'>
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

export default CreateListing