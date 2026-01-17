import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Category = 'vibe-coding' | 'build' | 'marketing' | 'sales'

export interface Article {
  slug: string
  title: string
  description: string
  category: Category
  tags: string[]
  content: string
  excerpt?: string
  relatedArticles?: Array<{
    slug: string
    anchor: string
  }>
  createdAt?: string
  updatedAt?: string
}

const contentDirectory = path.join(process.cwd(), 'content')

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = []
  if (!fs.existsSync(dir)) return files

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath))
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

export function getAllArticles(category?: Category): Article[] {
  const categories = category ? [category] : ['vibe-coding', 'build', 'marketing', 'sales']
  const articles: Article[] = []

  for (const cat of categories) {
    const categoryPath = path.join(contentDirectory, cat)
    const files = getAllMdxFiles(categoryPath)

    for (const filePath of files) {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      const slug = path.basename(filePath).replace(/\.(mdx|md)$/, '')

      articles.push({
        slug,
        title: data.title || '',
        description: data.description || '',
        category: cat as Category,
        tags: data.tags || [],
        content,
        excerpt: data.excerpt,
        relatedArticles: data.relatedArticles,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      })
    }
  }

  return articles.sort((a, b) => {
    const dateA = a.updatedAt || a.createdAt || ''
    const dateB = b.updatedAt || b.createdAt || ''
    return dateB.localeCompare(dateA)
  })
}

export function getArticle(category: Category, slug: string): Article | null {
  const categoryPath = path.join(contentDirectory, category)
  const files = getAllMdxFiles(categoryPath)

  for (const filePath of files) {
    const fileName = path.basename(filePath).replace(/\.(mdx|md)$/, '')
    if (fileName === slug) {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        category,
        tags: data.tags || [],
        content,
        excerpt: data.excerpt,
        relatedArticles: data.relatedArticles,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    }
  }

  return null
}

export function getArticleSlugs(category: Category): string[] {
  const categoryPath = path.join(contentDirectory, category)
  const files = getAllMdxFiles(categoryPath)

  return files.map(file => path.basename(file).replace(/\.(mdx|md)$/, ''))
}
