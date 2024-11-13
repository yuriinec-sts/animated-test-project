import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

const HorizontalScroll = ({ directionAnim = -1, slides }) => {
	// По умолчанию ставим -1 для анимации влево
	const [isPause, setIsPause] = useState(false)
	const loop = useRef(null) // Храним ссылку на анимацию
	const directionRef = useRef(directionAnim) // Сохраняем направление анимации

	useEffect(() => {
		const wrapper = document.querySelector('.wrapper')
		const boxes = gsap.utils.toArray('.box')
		const colors = ['#f38630', '#6fb936', '#ccc', '#6fb936']

		// Устанавливаем начальные цвета фонов для боксов
		gsap.set(boxes, {
			backgroundColor: gsap.utils.wrap(colors),
		})

		// Создаем анимацию для горизонтального скроллинга
		const animation = horizontalLoop(boxes, {
			paused: isPause, // Начинаем с текущего состояния
			repeat: -1,
			direction: directionRef.current, // Направление анимации из рефа
		})

		// Сохраняем ссылку на анимацию
		loop.current = animation

		// Запускаем анимацию
		animation.play()

		// Настройка ScrollTrigger для отслеживания направления скролла
		ScrollTrigger.create({
			start: 0,
			end: 'max',
			onUpdate: self => {
				directionRef.current = self.direction
				console.log(directionRef.current) // Обновляем направление скролла
				animation.timeScale(self.direction === -1 ? -1 : 1) // Меняем направление анимации
			},
		})

		return () => {}
	}, []) // Эффект выполняется только при монтировании компонента

	// Обновляем состояние паузы
	useEffect(() => {
		if (loop.current) {
			isPause ? loop.current.pause() : loop.current.play() // Пауза или запуск анимации
		}
	}, [isPause]) // Следим за изменением состояния паузы

	return (
		<div className='overflow-x-hidden'>
			<div
				className='wrapper h-[200px] w-[120%] bg-gray-700 gap-4 relative flex items-center overflow-hidden'
				onMouseEnter={() => {
					setIsPause(!isPause)
				}}
				onMouseLeave={() => {
					setIsPause(!isPause)
				}}>
				{slides.map((el, index) => (
					<div
						key={index}
						className='box flex items-center justify-center bg-green-500 h-[200px] w-1/5 min-w-[250px] m-0 p-0 relative flex-shrink-0 text-black text-lg cursor-pointer last:mr-4'>
						1
					</div>
				))}
			</div>
		</div>
	)
}

// Helper function for horizontal looping
function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items)
	config = config || {}
	const direction = config.direction || 1 // Направление анимации (1 - вправо, -1 - влево)

	let tl = gsap.timeline({
		repeat: config.repeat,
		paused: config.paused,
		defaults: { ease: 'none' },
		onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
	})

	let length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 200,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1)

	gsap.set(items, {
		xPercent: (i, el) => {
			let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')))
			xPercents[i] = snap(
				(parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
					gsap.getProperty(el, 'xPercent')
			)
			return xPercents[i]
		},
	})

	gsap.set(items, { x: 0 })

	let totalWidth =
		items[length - 1].offsetLeft +
		(xPercents[length - 1] / 100) * widths[length - 1] -
		startX +
		items[length - 1].offsetWidth *
			gsap.getProperty(items[length - 1], 'scaleX') +
		parseFloat(config.paddingRight || 0)

	for (let i = 0; i < length; i++) {
		let item = items[i]
		let curX = (xPercents[i] / 100) * widths[i]
		let distanceToStart = item.offsetLeft + curX - startX
		let distanceToLoop =
			distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX')
		tl.to(
			item,
			{
				xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
				duration: distanceToLoop / pixelsPerSecond,
			},
			0
		)
			.fromTo(
				item,
				{
					xPercent: snap(
						((curX - distanceToLoop + totalWidth) / widths[i]) * 100
					),
				},
				{
					xPercent: xPercents[i],
					duration:
						(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
					immediateRender: false,
				},
				distanceToLoop / pixelsPerSecond
			)
			.add('label' + i, distanceToStart / pixelsPerSecond)
		times[i] = distanceToStart / pixelsPerSecond
	}

	function toIndex(index, vars) {
		vars = vars || {}
		if (Math.abs(index - curIndex) > length / 2)
			index += index > curIndex ? -length : length
		let newIndex = gsap.utils.wrap(0, length, index)
		let time = times[newIndex]
		if (time > tl.time() !== index > curIndex) {
			vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
			time += tl.duration() * (index > curIndex ? 1 : -1)
		}
		curIndex = newIndex
		vars.overwrite = true
		return tl.tweenTo(time, vars)
	}

	tl.next = vars => toIndex(curIndex + 1, vars)
	tl.previous = vars => toIndex(curIndex - 1, vars)
	tl.current = () => curIndex
	tl.toIndex = (index, vars) => toIndex(index, vars)
	tl.times = times

	tl.progress(1, true).progress(0, true) // pre-render for performance

	// Если направление -1, инвертируем анимацию
	if (direction === -1) {
		tl.vars.onReverseComplete()
		tl.reverse()
	}

	return tl
}

export default HorizontalScroll
