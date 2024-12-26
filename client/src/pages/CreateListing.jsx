import React from 'react'

const CreateListing = () => {
      return (
            <main className='p-3 max-w-4xl mx-auto'>
                  <h1 className='text-3xl text-center p-5 font-semibold'>Create a Listing</h1>
                  <form className='flex flex-col sm:flex-row gap-4'>

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

                              <div>

                              </div>

                              <div>

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
                                    />
                              </div>
                        <button className='uppercase border border-green-700 text-green-700 hover:opacity-95 disabled:opacity-80 p-3'>
                              Upload
                        </button>
                        <button className = 'bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                        </div>

                  </form>
            </main>
      )
}

export default CreateListing