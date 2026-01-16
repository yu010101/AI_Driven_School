import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'AI駆動塾'
  const category = searchParams.get('category') || ''

  const categoryColors: Record<string, string> = {
    'vibe-coding': '#6366F1',
    'build': '#0A0A0A',
    'marketing': '#0A0A0A',
  }

  const categoryNames: Record<string, string> = {
    'vibe-coding': 'バイブコーディング',
    'build': '実装パターン',
    'marketing': '0円マーケティング',
  }

  const accentColor = categoryColors[category] || '#0A0A0A'
  const categoryName = categoryNames[category] || ''

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#FAFAFA',
          padding: '60px',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#0A0A0A',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>AI</span>
          </div>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0A0A0A' }}>駆動塾</span>
          {categoryName && (
            <span
              style={{
                marginLeft: '20px',
                padding: '8px 16px',
                backgroundColor: accentColor,
                color: 'white',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {categoryName}
            </span>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 30 ? '48px' : '56px',
              fontWeight: 'bold',
              color: '#0A0A0A',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#525252',
            fontSize: '20px',
          }}
        >
          <span>ai-driven-school.vercel.app</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
