import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md">
        <div className="text-7xl font-bold text-primary mb-8">404</div>
        <div className="card p-8 mb-10">
          <p className="text-foreground/80 mb-3 text-lg font-medium">ページが見つかりません</p>
          <p className="text-foreground/50">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary">
            ホームへ
          </Link>
          <Link href="/knowledge" className="btn-secondary">
            記事一覧
          </Link>
        </div>
      </div>
    </div>
  )
}
