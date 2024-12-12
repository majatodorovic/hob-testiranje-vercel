import Link from 'next/link'
import React from 'react'
import SliderHeader from './SliderHeader'

function HeaderTop() {
	return (
		<div className='bg-topHeader h-8 w-full flex items-center justify-between px-[3rem]'>
			<div>

				<span className='mx-2'>-</span>
				<Link href='https://www.instagram.com/hobbrandgroup/' className='text-sm font-normal text-black' target='_blank'>Instagram</Link>
				<span className='mx-2'>-</span>
				<Link href='https://www.youtube.com/channel/UCTCxl3sqxPqafMhOsKVVEMQ/videos?view_as=subscriber' className='text-sm font-normal text-black' target='_blank'>Youtube</Link>
			</div>
			<SliderHeader />
			<div>
				<span className='text-sm font-normal text-black' >Call Centar: </span>
				<Link href={`tel:${process.env.TELEPHONE}`} className='text-sm font-normal text-black'>
					{process.env.TELEPHONE}
				</Link>
			</div>
		</div>
	)
}

export default HeaderTop