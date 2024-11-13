import { gsap } from 'gsap'
import { useEffect } from 'react'

const TransitionWrapper = ({
	children,
	backgroundColor,
}: {
	children: React.ReactNode
	backgroundColor: string
}) => {
	useEffect(() => {
		const tl = gsap.timeline({ defaults: { duration: 0.5 } })

		tl.fromTo(
			'.logo-card',
			{ scale: 0.1, opacity: 0 },
			{ scale: 1, opacity: 1, stagger: 0 }
		)
		tl.fromTo(
			'body',
			{ backgroundColor: 'initial' },
			{ backgroundColor: backgroundColor },
			'<'
		)

		return () => {
			const tlExit = gsap.timeline({ defaults: { duration: 0.3 } })
			tlExit.to('.logo-card', { scale: 0.1, opacity: 0, stagger: 0 })
			tlExit.to('body', { backgroundColor: 'initial' }, '<')
		}
	}, [backgroundColor])

	return <div>{children}</div>
}

export default TransitionWrapper
