'use client'
import TransitionWrapper from '@/components/TransitionWrapper'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const PageA = () => {
	const container = useRef(null)

	useGSAP(
		() => {
			gsap.to('.box', { rotation: 180 })
		},
		{ scope: container }
	)

	return (
		<>
			<TransitionWrapper backgroundColor='#ff7eb3'>
				<div ref={container} className='flex'>
					<div className='box text-black text-3xl text-center block w-full'>
						Hello
					</div>
				</div>
			</TransitionWrapper>
		</>
	)
}

export default PageA
