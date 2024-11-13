'use client'
import React from 'react'

const Card = ({ title, description, imageSrc, onImageClick }) => {
	return (
		<div className='max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transform transition-all duration-300 ease-in-out'>
			<div
				className='cursor-pointer'
				onClick={onImageClick} // Обработчик клика по изображению
			>
				<img className='w-full h-48 object-cover' src={imageSrc} alt={title} />
			</div>
			<div className='p-5'>
				<h3 className='text-lg font-semibold text-gray-800'>
					Logo information
				</h3>
				<p className='text-gray-600 mt-2'>{description}</p>
			</div>
		</div>
	)
}

export default Card
