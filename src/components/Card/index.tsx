'use client'
import { gsap } from 'gsap'
import { useState } from 'react'

export const LogoCard: React.FC<{
	logo: string
}> = ({ logo }) => {
	const [isModalOpen, setModalOpen] = useState(false)

	const openModal = () => setModalOpen(true)
	const closeModal = () => setModalOpen(false)

	return (
		<>
			<div
				className='w-[20vw] min-w-[250px] bg-gray-200 p-4 transition-transform hover:scale-105'
				onClick={openModal}>
				<img src={logo.src} alt={logo.alt} className='mx-auto' />
			</div>

			{isModalOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'
					onClick={closeModal}>
					<div className='relative w-[40vw] bg-white p-8 rounded-lg shadow-lg text-center transform transition-all scale-150'>
						<h2 className='text-xl font-semibold mb-2'>{logo.alt}</h2>
						<p className='text-sm'>Описание компании</p>
					</div>
				</div>
			)}
		</>
	)
}
