// app/logo-slider/page.tsx

'use client'
import TransitionWrapper from '@/components/TransitionWrapper'

import Slider from '@/components/Slider'
import React from 'react'
import { TSliderItem } from '@/components/Slider/types'

const logos: TSliderItem[] = [
	{ src: '/logo1.png', alt: 'Company 1', description: 'Description 1' },
	{ src: '/logo2.png', alt: 'Company 2', description: 'Description 2' },
	{ src: '/logo3.png', alt: 'Company 3', description: 'Description 3' },
	{ src: '/logo4.png', alt: 'Company 4', description: 'Description 4' },
	{ src: '/logo5.png', alt: 'Company 5', description: 'Description 5' },
	{ src: '/logo5.png', alt: 'Company 5', description: 'Description 5' },
	{ src: '/logo5.png', alt: 'Company 5', description: 'Description 5' },
	{ src: '/logo5.png', alt: 'Company 5', description: 'Description 5' },
	{ src: '/logo5.png', alt: 'Company 5', description: 'Description 5' },
	{ src: '/logo5.png', alt: 'Company 5', description: 'Description 5' },
]

const LogoSliders: React.FC = () => {
	return (
		<TransitionWrapper backgroundColor='#dfd98f'>
			<div className='pt-40 flex flex-col gap-4'>
				<Slider slides={logos} directionAnim={1} />
				<Slider slides={logos} directionAnim={-1} />
			</div>
		</TransitionWrapper>
	)
}

export default LogoSliders
