import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col md:flex-row'>

      {/*search side*/}
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className = 'flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='font-semibold whitespace-nowrap'>Search Term:</label>
            <input type="text"
              id='searchTerm'
              placeholder='search...'
              className='border rounded-lg p-3 w-full'
            />
          </div>

          <div className = 'flex gap-4 flex-wrap items-center'>
            <label className = 'font-semibold'>Type:</label>
            <div className = 'flex gap-2 '>
              <input type="checkbox" id='all' className='w-5' />
              <span>Rent & Sale</span>
            </div>

            <div className = 'flex gap-2 '>
              <input type="checkbox" id='rent' className='w-5' />
              <span>Rent</span>
            </div>

            <div className = 'flex gap-2 '>
              <input type="checkbox" id='sale' className='w-5' />
              <span>Sale</span>
            </div>

            <div className = 'flex gap-2 '>
              <input type="checkbox" id='offer' className='w-5' />
              <span>offer</span>
            </div>
          </div>

          <div className = 'flex gap-4 flex-wrap items-center'>

            <label className = 'font-semibold'>Amenities:</label>
            <div className = 'flex gap-2 '>
              <input type="checkbox" id='parking' className='w-5' />
              <span>Parking</span>
            </div>

            <div className = 'flex gap-2 '>
              <input type="checkbox" id='furnished' className='w-5' />
              <span>Furinshed</span>
            </div>

          </div>

          <div className = 'flex gap-2 items-center'>
            <label className = 'font-semibold'>Sort:</label>
            <select id="sort_order" className = 'rounded-lg p-3 border'>
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>

          <button className = 'bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 text-lg'>
            Search
          </button>
        </form>

      </div>

      {/*listing side*/}
      <div>
        <h1 className = 'text-3xl text-slate-700 border-b p-3 mt-5 '>Listing Results:</h1>
      </div>
    </div>
  )
}

export default Search