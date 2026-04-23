import {HomePage} from '@/components/HomePage'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'

export default async function IndexRoute() {
  // Мы запрашиваем данные, но теперь не блокируем страницу, если их нет
  const {data} = await sanityFetch({query: homePageQuery})

  // Просто возвращаем наш дизайн. Он сам покажет демо-данные, если Sanity пуст.
  return <HomePage data={data} />
}
