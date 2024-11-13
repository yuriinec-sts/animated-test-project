import { redirect } from 'next/navigation'

export default function Home() {
	redirect('/page-a')
	return <div></div>
}
