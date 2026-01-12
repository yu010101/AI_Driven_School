'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
      <p className="text-xl text-gray-600 mb-8">
        {error.message || '予期しないエラーが発生しました'}
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        再試行
      </button>
    </div>
  )
}
