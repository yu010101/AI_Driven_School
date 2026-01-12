import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/mdx'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  const allArticles = getAllArticles()

  const results = allArticles
    .filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(query)
      const descMatch = article.description.toLowerCase().includes(query)
      const tagMatch = article.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      )
      const contentMatch = article.content.toLowerCase().includes(query)
      return titleMatch || descMatch || tagMatch || contentMatch
    })
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      category: article.category,
      tags: article.tags,
    }))
    .slice(0, 10)

  return NextResponse.json({ results })
}
