import type { Metadata } from 'next'
import { Unbounded, Onest, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({
  subsets: ['cyrillic', 'latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RocketJumpVPN — Интернет без границ за 100 ₽ в месяц',
  description:
    'Простой VPN с обходом блокировок. Заходите в любимые соцсети, смотрите видео, играете — как до 2022. 3 дня бесплатно, без карты.',
  openGraph: {
    title: 'RocketJumpVPN — Интернет без границ за 100 ₽ в месяц',
    description: 'VPN с обходом блокировок. Бесплатный триал 3 дня, без карты.',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${unbounded.variable} ${onest.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
