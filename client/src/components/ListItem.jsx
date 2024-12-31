import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className=' bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`} className = ''>
        <img
          src={
            listing.imageUrls[0] ||
            'https://in.images.search.yahoo.com/search/images;_ylt=AwrKHAWNAHNntQIAkbu7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Nj?type=E210IN885G91852&p=home+images+in+hd&fr=mcafee&th=266&tw=474&imgurl=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F3060221.jpg&rurl=https%3A%2F%2Fwallpaperaccess.com%2Fhome-hd&size=359KB&name=Home+HD+Wallpapers+-+Top+Free+Home+HD+Backgrounds+-+WallpaperAccess&oid=1&h=900&w=1600&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.4CMRLfMYrhz87yMpTl8tSQHaEK%26pid%3DApi&tt=Home+HD+Wallpapers+-+Top+Free+Home+HD+Backgrounds+-+WallpaperAccess&sigr=Xy1j2NFmyMlS&sigit=RRcLBAVUHtmC&sigi=BdelqRjJW9Dv&sign=2VG_qsxLAeRh&sigt=2VG_qsxLAeRh'
          }
          alt='listing cover'
          className='h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}