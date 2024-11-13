'use client'
import { TNavigationItem } from './types'

const menuLinks: TNavigationItem[] = [
	{ path: '/page-a', name: 'Page A' },
	{ path: '/page-b', name: 'Page B' },
]

const Navigation = () => {
	return (
		<>
			<div className='flex align-center justify-center'>
				<p>Menu</p>
			</div>
		</>
	)
}

export default Navigation
