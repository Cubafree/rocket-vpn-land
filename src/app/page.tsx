'use client'

import { useState, useEffect, useId } from 'react'
import { COUNTRIES, FAQ, REVIEWS, PRICE, HEADLINE } from '@/lib/data'

/* ─── Rocket SVG ──────────────────────────────────────────── */
function Rocket({ size = 64, style }: { size?: number; style?: React.CSSProperties }) {
  const uid = useId().replace(/:/g, '')
  const gradId = `flame-${uid}`
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFD43B" />
          <stop offset="100%" stopColor="#FF5A1F" />
        </linearGradient>
      </defs>
      <path d="M26 50 L32 64 L38 50 Z" fill={`url(#${gradId})`} />
      <rect x="24" y="14" width="16" height="36" rx="8" fill="#FFFCF5" stroke="#0E1B2C" strokeWidth="2" />
      <path d="M24 14 Q32 -2 40 14 Z" fill="#FF5A1F" stroke="#0E1B2C" strokeWidth="2" />
      <circle cx="32" cy="26" r="4" fill="#3D7EFF" stroke="#0E1B2C" strokeWidth="2" />
      <path d="M24 38 L16 50 L24 50 Z" fill="#0E1B2C" />
      <path d="M40 38 L48 50 L40 50 Z" fill="#0E1B2C" />
    </svg>
  )
}

/* ─── PillBtn ─────────────────────────────────────────────── */
type BtnKind = 'primary' | 'dark' | 'ghost' | 'soft'

interface PillBtnProps {
  children: React.ReactNode
  kind?: BtnKind
  onClick?: () => void
  big?: boolean
  href?: string
  target?: string
  style?: React.CSSProperties
  type?: 'button' | 'submit'
}

function PillBtn({ children, kind = 'primary', onClick, big, href, target, style, type }: PillBtnProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: big ? '18px 28px' : '12px 20px',
    fontSize: big ? 18 : 15,
    fontWeight: 700,
    borderRadius: 999,
    transition: 'transform .15s ease, box-shadow .15s ease, background .15s',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
    border: 'none',
  }
  const variants: Record<BtnKind, React.CSSProperties> = {
    primary: {
      background: 'var(--accent)',
      color: '#fff',
      boxShadow: '0 6px 0 0 #B23A0E, 0 12px 24px -8px rgba(255,90,31,.5)',
    },
    dark: { background: 'var(--ink)', color: '#fff', boxShadow: '0 4px 0 0 #000' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '2px solid var(--ink)' },
    soft: { background: '#fff', color: 'var(--ink)', border: '1px solid var(--line)' },
  }

  const press = (e: React.MouseEvent<HTMLElement>) => {
    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(2px)'
  }
  const release = (e: React.MouseEvent<HTMLElement>) => {
    ;(e.currentTarget as HTMLElement).style.transform = ''
  }

  const merged = { ...base, ...variants[kind], ...style }

  if (href) {
    return (
      <a href={href} target={target} style={merged} onMouseDown={press} onMouseUp={release} onMouseLeave={release}>
        {children}
      </a>
    )
  }
  return (
    <button type={type || 'button'} onClick={onClick} style={merged} onMouseDown={press} onMouseUp={release} onMouseLeave={release}>
      {children}
    </button>
  )
}

/* ─── Atoms ───────────────────────────────────────────────── */
function Kicker({ children, color = 'var(--accent)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="mono" style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: '.18em', color, fontWeight: 600 }}>
      {children}
    </div>
  )
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'var(--good)',
          color: '#fff',
          display: 'inline-grid',
          placeItems: 'center',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        ✓
      </span>
      {children}
    </span>
  )
}

function TgIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.41-1.13 7.17-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.2-.04-.28-.02-.12.02-2.03 1.29-5.72 3.81-.54.37-1.03.55-1.47.54-.48-.01-1.42-.27-2.12-.5-.86-.28-1.54-.43-1.48-.91.03-.25.38-.51 1.04-.78 4.09-1.78 6.81-2.96 8.18-3.53 3.89-1.62 4.7-1.9 5.23-1.91.12 0 .37.03.53.16.14.11.18.26.2.36-.02.06.01.24 0 .3z" />
    </svg>
  )
}

function Section({
  id,
  children,
  bg,
  style,
}: {
  id?: string
  children: React.ReactNode
  bg?: string
  style?: React.CSSProperties
}) {
  return (
    <section id={id} style={{ padding: '96px 0', background: bg || 'transparent', ...style }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>{children}</div>
    </section>
  )
}

/* ─── Nav ─────────────────────────────────────────────────── */
function Nav({ onTrial }: { onTrial: () => void }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(246,241,231,.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '14px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Rocket size={32} />
          <div className="display" style={{ fontSize: 20, fontWeight: 800 }}>
            rocketjump<span style={{ color: 'var(--accent)' }}>vpn</span>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 28, fontSize: 15, fontWeight: 500 }}>
          <a href="#how">Как работает</a>
          <a href="#price">Тариф</a>
          <a href="#countries">Серверы</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div style={{ display: 'flex', gap: 10 }}>
          <PillBtn kind="soft" href="https://t.me" target="_blank">
            Войти
          </PillBtn>
          <PillBtn kind="primary" onClick={onTrial}>
            Бесплатно 3 дня
          </PillBtn>
        </div>
      </div>
    </header>
  )
}

/* ─── Hero ────────────────────────────────────────────────── */
function HeroVisual() {
  return (
    <div style={{ position: 'relative', height: 480 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 60% 50%, rgba(255,90,31,.2), transparent 60%)',
        }}
      />
      <div style={{ position: 'absolute', top: -20, right: 0, transform: 'rotate(15deg)' }}>
        <Rocket size={140} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 40,
          width: 240,
          height: 380,
          background: 'var(--ink)',
          borderRadius: 36,
          padding: 10,
          boxShadow: '0 30px 60px -20px rgba(14,27,44,.4), 0 8px 0 0 #000',
        }}
      >
        <div
          style={{
            background: 'var(--bg)',
            borderRadius: 28,
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              padding: '18px 16px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span>14:32</span>
            <span>📶 🔋</span>
          </div>
          <div
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: 'inset 0 -8px 0 rgba(0,0,0,.15), 0 0 0 8px rgba(255,90,31,.15)',
                }}
              >
                <div style={{ fontSize: 48 }}>🚀</div>
              </div>
            </div>
            <div className="display" style={{ fontSize: 18, fontWeight: 700, marginTop: 18 }}>
              Подключено
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
              🇳🇱 Амстердам · 38 ms
            </div>
            <div style={{ width: '100%', height: 1, background: 'var(--line)', margin: '14px 0' }} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              <div>
                <div style={{ color: 'var(--muted)' }}>↓ Загрузка</div>
                <div className="mono" style={{ fontWeight: 700, fontSize: 14 }}>
                  87.4 MB/s
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--muted)' }}>↑ Отдача</div>
                <div className="mono" style={{ fontWeight: 700, fontSize: 14 }}>
                  22.1 MB/s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 30,
          bottom: 60,
          background: 'var(--ink)',
          color: '#fff',
          borderRadius: 24,
          padding: '18px 24px',
          transform: 'rotate(-6deg)',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,.3)',
        }}
      >
        <div className="mono" style={{ fontSize: 11, opacity: 0.6, marginBottom: 2 }}>
          ВСЕГО
        </div>
        <div className="display" style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>
          {PRICE} ₽
        </div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>в месяц / 5 устройств</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 280,
          top: 80,
          background: '#fff',
          border: '2px solid var(--ink)',
          padding: '10px 14px',
          borderRadius: '18px 18px 18px 4px',
          fontSize: 13,
          fontWeight: 600,
          boxShadow: '4px 4px 0 0 var(--ink)',
          maxWidth: 160,
        }}
      >
        Открыл инстаграм за 3 секунды 😎
      </div>
    </div>
  )
}

function Hero({ onTrial }: { onTrial: () => void }) {
  return (
    <Section style={{ paddingTop: 64, paddingBottom: 48 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
              border: '1px solid var(--line)',
              padding: '8px 14px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--good)',
                boxShadow: '0 0 0 4px rgba(31,138,91,.2)',
                animation: 'pulse 2s infinite',
                display: 'inline-block',
              }}
            />
            Работает прямо сейчас в России
          </div>
          <h1
            className="display"
            style={{ fontSize: 'clamp(44px, 6vw, 84px)', margin: 0, fontWeight: 700 }}
          >
            {HEADLINE.split(' ').map((w, i) =>
              w === '100' ? (
                <span key={i} style={{ color: 'var(--accent)' }}>
                  100{' '}
                </span>
              ) : (
                w + ' '
              )
            )}
          </h1>
          <p style={{ fontSize: 20, color: 'var(--ink-2)', maxWidth: 520, marginTop: 20, lineHeight: 1.5 }}>
            Простой VPN с обходом блокировок. Заходите в любимые соцсети, смотрите видео, играете — как до 2022.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <PillBtn kind="primary" big onClick={onTrial}>
              <span>🚀</span> Попробовать 3 дня бесплатно
            </PillBtn>
            <PillBtn kind="ghost" big href="https://t.me" target="_blank">
              <TgIcon /> Подключить в Telegram
            </PillBtn>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 24,
              marginTop: 28,
              flexWrap: 'wrap',
              fontSize: 14,
              color: 'var(--ink-2)',
            }}
          >
            <Check>Без карты на триал</Check>
            <Check>Отмена в один клик</Check>
            <Check>Поддержка 24/7</Check>
          </div>
        </div>
        <HeroVisual />
      </div>
    </Section>
  )
}

/* ─── Trust Marquee ───────────────────────────────────────── */
function TrustMarquee() {
  const apps = ['Instagram', 'YouTube', 'TikTok', 'Discord', 'Netflix', 'Twitch', 'X', 'Spotify', 'ChatGPT', 'LinkedIn']
  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg-2)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '18px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 48,
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite',
        }}
      >
        {[...apps, ...apps].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 600, color: 'var(--ink-2)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--good)', display: 'inline-block' }} />
            {a} работает
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Features ────────────────────────────────────────────── */
function Features() {
  const feats = [
    { icon: '⚡', t: 'Низкий пинг', d: 'Серверы рядом с Россией. В играх — как дома.' },
    { icon: '∞', t: 'Безлимит', d: 'Качайте, стримьте, играйте — без ограничений по трафику.' },
    { icon: '🛡️', t: 'Без логов', d: 'Мы не храним вашу историю. Никто не узнает что вы смотрите.' },
    { icon: '🔓', t: 'Обход блокировок', d: 'Технология VLESS+Reality. Невидимый трафик.' },
    { icon: '📱', t: '5 устройств', d: 'Один аккаунт на всю семью: телефон, ПК, ТВ.' },
    { icon: '🎁', t: 'Рефералка', d: 'Приведи друга — оба получите месяц бесплатно.' },
  ]
  return (
    <Section id="features">
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          marginBottom: 48,
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div>
          <Kicker>Что внутри</Kicker>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: '8px 0 0', maxWidth: 600, fontWeight: 700 }}>
            Всё что нужно. Ничего лишнего.
          </h2>
        </div>
        <p style={{ maxWidth: 380, color: 'var(--ink-2)', fontSize: 17 }}>
          Мы не делаем тысячу функций. Делаем одну хорошо — быстрый и стабильный VPN.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {feats.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </Section>
  )
}

function FeatureCard({ icon, t, d }: { icon: string; t: string; d: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--line)',
        borderRadius: 24,
        padding: 28,
        transition: 'transform .2s, box-shadow .2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 30px -12px rgba(0,0,0,.15)' : 'none',
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <div className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
        {t}
      </div>
      <div style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.5 }}>{d}</div>
    </div>
  )
}

/* ─── How It Works ────────────────────────────────────────── */
function HowItWorks({ onTrial }: { onTrial: () => void }) {
  const steps = [
    { n: '01', t: 'Заходите в Telegram-бот или на сайт', d: 'Никаких регистраций, паролей и СМС. Просто откройте.' },
    { n: '02', t: 'Получаете бесплатный 3-дневный триал', d: 'Карта не нужна. Жмёте кнопку — VPN уже работает.' },
    { n: '03', t: 'Устанавливаете на 5 устройств', d: 'Телефон, ноутбук, телевизор — на всю семью. Один QR-код.' },
  ]
  return (
    <Section id="how" bg="var(--ink)" style={{ color: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <Kicker color="var(--accent-2)">Как подключиться</Kicker>
        <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: '12px 0 12px', fontWeight: 700 }}>
          Запустить за 60 секунд
        </h2>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 18, maxWidth: 560, margin: '0 auto' }}>
          Если мама не разберётся за минуту — деньги вернём. (Спойлер: разбирается всегда.)
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {steps.map((s) => (
          <div
            key={s.n}
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 24,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="display"
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: 'var(--accent)',
                opacity: 0.25,
                position: 'absolute',
                top: 8,
                right: 16,
              }}
            >
              {s.n}
            </div>
            <div style={{ position: 'relative' }}>
              <div className="mono" style={{ fontSize: 12, color: 'var(--accent-2)', marginBottom: 14 }}>
                ШАГ {s.n}
              </div>
              <div className="display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, lineHeight: 1.2 }}>
                {s.t}
              </div>
              <div style={{ color: 'rgba(255,255,255,.65)', fontSize: 15, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <PillBtn kind="primary" big onClick={onTrial}>
          🚀 Начать прямо сейчас
        </PillBtn>
      </div>
    </Section>
  )
}

/* ─── Devices ─────────────────────────────────────────────── */
function DeviceMock({ kind }: { kind: 'phone' | 'pc' | 'tv' }) {
  if (kind === 'phone') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 200, height: 340, background: 'var(--ink)', borderRadius: 28, padding: 8 }}>
          <div style={{ background: '#fff', borderRadius: 22, height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ fontSize: 80 }}>🚀</div>
          </div>
        </div>
      </div>
    )
  }
  if (kind === 'pc') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <div>
          <div style={{ width: 340, height: 220, background: 'var(--ink)', borderRadius: 14, padding: 10, marginBottom: 6 }}>
            <div style={{ background: '#fff', borderRadius: 6, height: '100%', display: 'grid', placeItems: 'center' }}>
              <div style={{ fontSize: 64 }}>🚀</div>
            </div>
          </div>
          <div style={{ width: 120, height: 14, background: 'var(--ink)', borderRadius: '0 0 12px 12px', margin: '0 auto' }} />
        </div>
      </div>
    )
  }
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
      <div>
        <div style={{ width: 380, height: 230, background: 'var(--ink)', borderRadius: 8, padding: 8, marginBottom: 6 }}>
          <div style={{ background: '#fff', borderRadius: 4, height: '100%', display: 'grid', placeItems: 'center' }}>
            <div style={{ fontSize: 80 }}>🚀</div>
          </div>
        </div>
        <div style={{ width: 80, height: 30, background: 'var(--ink)', borderRadius: 4, margin: '0 auto' }} />
        <div style={{ width: 160, height: 6, background: 'var(--ink)', borderRadius: 4, margin: '4px auto 0' }} />
      </div>
    </div>
  )
}

function Devices() {
  const [active, setActive] = useState<'phone' | 'pc' | 'tv'>('phone')
  const tabs: { id: 'phone' | 'pc' | 'tv'; label: string; icon: string }[] = [
    { id: 'phone', label: 'Телефон', icon: '📱' },
    { id: 'pc', label: 'Компьютер', icon: '💻' },
    { id: 'tv', label: 'Телевизор', icon: '📺' },
  ]
  const content = {
    phone: {
      t: 'iPhone и Android',
      os: ['iOS 14+', 'Android 9+'],
      how: 'Откройте бота → получите ссылку → один тап и VPN активирован.',
    },
    pc: {
      t: 'Windows, macOS, Linux',
      os: ['Windows 10+', 'macOS 11+', 'Ubuntu, Mint'],
      how: 'Скачайте приложение или используйте в браузере. Установка в один клик.',
    },
    tv: {
      t: 'Smart TV и приставки',
      os: ['Android TV', 'Apple TV', 'Smart TV'],
      how: 'Поставьте приложение из стора или настройте на роутере — VPN на всех ТВ сразу.',
    },
  }
  const c = content[active]
  return (
    <Section id="devices">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <Kicker>Один аккаунт — пять устройств</Kicker>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', margin: '8px 0 24px', fontWeight: 700 }}>
            Работает там, где работаете вы
          </h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 600,
                  background: active === tab.id ? 'var(--ink)' : '#fff',
                  color: active === tab.id ? '#fff' : 'var(--ink)',
                  border: '1px solid var(--ink)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transition: 'background .15s, color .15s',
                  fontFamily: 'inherit',
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
            {c.t}
          </div>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 18 }}>{c.how}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {c.os.map((o) => (
              <span
                key={o}
                className="mono"
                style={{
                  padding: '6px 12px',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                {o}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            height: 420,
            background: 'var(--bg-2)',
            borderRadius: 32,
            padding: 32,
            border: '1px solid var(--line)',
          }}
        >
          <DeviceMock kind={active} />
        </div>
      </div>
    </Section>
  )
}

/* ─── Countries ───────────────────────────────────────────── */
function Countries() {
  const [filter, setFilter] = useState('')
  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.city.toLowerCase().includes(filter.toLowerCase())
  )
  const best = [...COUNTRIES].sort((a, b) => a.ping - b.ping)[0]
  return (
    <Section id="countries" bg="var(--bg-2)">
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          marginBottom: 40,
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div>
          <Kicker>10 стран · 40+ серверов</Kicker>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', margin: '8px 0 0', fontWeight: 700, maxWidth: 600 }}>
            Выбирайте откуда смотреть мир
          </h2>
        </div>
        <div style={{ background: 'var(--ink)', color: '#fff', padding: '14px 20px', borderRadius: 16 }}>
          <div className="mono" style={{ fontSize: 12, opacity: 0.6, marginBottom: 2 }}>
            САМЫЙ БЫСТРЫЙ СЕЙЧАС
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>{best.flag}</span>
            <div>
              <div style={{ fontWeight: 700 }}>
                {best.city}, {best.name}
              </div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--accent-2)' }}>
                {best.ping} ms
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Поиск: например, «Германия» или «Токио»"
        style={{
          width: '100%',
          padding: '18px 22px',
          borderRadius: 14,
          border: '1px solid var(--line)',
          background: '#fff',
          fontSize: 16,
          fontFamily: 'inherit',
          marginBottom: 20,
          outline: 'none',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {filtered.map((c) => (
          <CountryCard key={c.code} {...c} />
        ))}
      </div>
    </Section>
  )
}

function CountryCard({
  flag,
  name,
  city,
  ping,
}: {
  flag: string
  name: string
  city: string
  ping: number
  code: string
}) {
  const [hovered, setHovered] = useState(false)
  const dotColor = ping < 60 ? 'var(--good)' : ping < 120 ? 'var(--accent-2)' : 'var(--accent)'
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: 16,
        padding: 18,
        transition: 'transform .15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 8 }}>{flag}</div>
      <div style={{ fontWeight: 700, fontSize: 15 }}>{name}</div>
      <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>{city}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, display: 'inline-block' }} />
        <span className="mono" style={{ fontSize: 12 }}>
          {ping} ms
        </span>
      </div>
    </div>
  )
}

/* ─── Pricing ─────────────────────────────────────────────── */
function Pricing({ onTrial }: { onTrial: () => void }) {
  const features = [
    '5 устройств одновременно',
    'Безлимитный трафик',
    '10 стран на выбор',
    'Низкий пинг для игр',
    'Поддержка 24/7 в Telegram',
    'Без логов и истории',
  ]
  const periods = [
    { m: 1, p: PRICE, s: 0 },
    { m: 6, p: Math.round(PRICE * 6 * 0.85), s: 15 },
    { m: 12, p: Math.round(PRICE * 12 * 0.7), s: 30 },
  ]
  return (
    <Section id="price">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <Kicker>Тариф</Kicker>
        <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: '12px 0 0', fontWeight: 700 }}>
          Один тариф. Без подвоха.
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'stretch' }}>
        {/* Main card */}
        <div
          style={{
            background: 'var(--accent)',
            borderRadius: 32,
            padding: 48,
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.1)',
            }}
          />
          <div style={{ position: 'absolute', top: 60, right: 40, transform: 'rotate(20deg)' }}>
            <Rocket size={100} />
          </div>
          <div style={{ position: 'relative' }}>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '.18em', opacity: 0.8, fontWeight: 600 }}>
              ROCKETJUMP
            </div>
            <div className="display" style={{ fontSize: 'clamp(80px, 10vw, 140px)', fontWeight: 800, lineHeight: 1, margin: '12px 0 0' }}>
              {PRICE}
              <span style={{ fontSize: '.4em', fontWeight: 600 }}> ₽</span>
            </div>
            <div style={{ fontSize: 18, opacity: 0.9, marginBottom: 32 }}>в месяц</div>
            <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
              {features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 500 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#fff',
                      color: 'var(--accent)',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    ✓
                  </span>
                  {f}
                </div>
              ))}
            </div>
            <PillBtn kind="dark" big onClick={onTrial}>
              Попробовать 3 дня бесплатно
            </PillBtn>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 14 }}>
              Без привязки карты. Передумаете — просто не продлевайте.
            </div>
          </div>
        </div>

        {/* Side cards */}
        <div style={{ display: 'grid', gap: 16 }}>
          <div
            style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 24, padding: 28 }}
          >
            <div className="display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              💸 Скидки за длительность
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
              {periods.map((o) => (
                <div
                  key={o.m}
                  style={{
                    background: 'var(--bg)',
                    borderRadius: 14,
                    padding: 14,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {o.s > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        background: 'var(--accent)',
                        color: '#fff',
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 8,
                        fontWeight: 700,
                      }}
                    >
                      -{o.s}%
                    </div>
                  )}
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {o.m} мес
                  </div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
                    {o.p} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 24, padding: 28 }}>
            <div className="display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              🎁 Приведи друга
            </div>
            <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, lineHeight: 1.5, margin: '8px 0 18px' }}>
              За каждого друга —{' '}
              <b style={{ color: 'var(--accent-2)' }}>+30 дней</b> подписки бесплатно. Другу — тоже.
            </p>
            <PillBtn kind="primary">Получить ссылку</PillBtn>
          </div>

          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 24,
              padding: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div style={{ fontSize: 36 }}>💳</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Любые способы оплаты</div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>Карты РФ, СБП, ЮMoney, СберPay, крипта</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ─── Reviews ─────────────────────────────────────────────── */
function Reviews() {
  return (
    <Section>
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          marginBottom: 40,
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div>
          <Kicker>Что говорят</Kicker>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: '8px 0 0', fontWeight: 700, maxWidth: 600 }}>
            40 000+ счастливых пользователей
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="display" style={{ fontSize: 42, fontWeight: 800 }}>
            4.9
          </div>
          <div>
            <div style={{ color: 'var(--accent-2)', fontSize: 18 }}>★★★★★</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>2 384 отзыва</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {REVIEWS.map((r, i) => (
          <ReviewCard key={i} {...r} />
        ))}
      </div>
    </Section>
  )
}

function ReviewCard({ name, city, text, rating }: { name: string; city: string; text: string; rating: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--line)',
        borderRadius: 20,
        padding: 22,
        transition: 'transform .2s, box-shadow .2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 30px -12px rgba(0,0,0,.15)' : 'none',
      }}
    >
      <div style={{ color: 'var(--accent-2)', fontSize: 16, marginBottom: 10 }}>{'★'.repeat(rating)}</div>
      <p style={{ fontSize: 15, lineHeight: 1.5, margin: '0 0 16px' }}>«{text}»</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingTop: 14,
          borderTop: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--accent)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
          }}
        >
          {name[0]}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>{city}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── FAQ ─────────────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" bg="var(--bg-2)">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'start' }}>
        <div>
          <Kicker>Вопросы</Kicker>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', margin: '8px 0 24px', fontWeight: 700 }}>
            Спрашивают часто
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.6 }}>
            Не нашли ответа? Напишите в{' '}
            <a href="https://t.me" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Telegram-поддержку
            </a>{' '}
            — отвечаем за 5 минут в любое время.
          </p>
        </div>
        <div>
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    padding: '22px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                  }}
                >
                  <span className="display" style={{ fontSize: 20, fontWeight: 600 }}>
                    {item.q}
                  </span>
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: isOpen ? 'var(--accent)' : 'var(--ink)',
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 18,
                      fontWeight: 600,
                      flexShrink: 0,
                      transition: 'all .2s',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: 'hidden',
                    transition: 'max-height .3s ease',
                  }}
                >
                  <p style={{ padding: '0 0 22px', margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 600 }}>
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

/* ─── Final CTA ───────────────────────────────────────────── */
function FinalCTA({ onTrial }: { onTrial: () => void }) {
  return (
    <Section bg="var(--ink)" style={{ color: '#fff', padding: '120px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <h2 className="display" style={{ fontSize: 'clamp(44px, 5vw, 72px)', margin: 0, fontWeight: 700, lineHeight: 1 }}>
            Готовы
            <br />
            <span style={{ color: 'var(--accent)' }}>взлететь?</span>
          </h2>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,.7)', marginTop: 20, maxWidth: 480 }}>
            3 дня бесплатно. Без карты. Подключение в Telegram за минуту.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <PillBtn kind="primary" big onClick={onTrial}>
              🚀 Начать триал
            </PillBtn>
            <PillBtn kind="ghost" big href="https://t.me" target="_blank" style={{ borderColor: '#fff', color: '#fff' }}>
              <TgIcon /> Telegram-бот
            </PillBtn>
          </div>
        </div>
        <div style={{ position: 'relative', height: 300 }}>
          <div style={{ position: 'absolute', right: 0, top: 0, transform: 'rotate(25deg)' }}>
            <Rocket size={260} />
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ─── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'rgba(255,255,255,.6)',
        padding: '48px 0',
        borderTop: '1px solid rgba(255,255,255,.1)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Rocket size={28} />
          <span className="display" style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
            rocketjumpvpn
          </span>
        </div>
        <div style={{ fontSize: 14 }}>
          © 2026 RocketJump · Поддержка:{' '}
          <a href="https://t.me" style={{ color: 'var(--accent-2)' }}>
            @rocketjump_help
          </a>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 14 }}>
          <a href="#">Оферта</a>
          <a href="#">Конфиденциальность</a>
          <a href="#">Контакты</a>
        </div>
      </div>
    </footer>
  )
}

/* ─── Trial Modal ─────────────────────────────────────────── */
function TrialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!open) {
      setStep(0)
      setEmail('')
    }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(14,27,44,.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'grid',
        placeItems: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg)',
          borderRadius: 28,
          padding: 40,
          maxWidth: 480,
          width: '100%',
          position: 'relative',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,.4)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--bg-2)',
            fontSize: 20,
            cursor: 'pointer',
            border: 'none',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          ×
        </button>

        {step === 0 && (
          <div>
            <div style={{ textAlign: 'center' }}>
              <Rocket size={80} style={{ margin: '0 auto', display: 'block' }} />
              <h3 className="display" style={{ fontSize: 28, fontWeight: 700, margin: '16px 0 8px' }}>
                3 дня. Бесплатно. Без карты.
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 15, marginBottom: 24 }}>
                Куда прислать ссылку для подключения?
              </p>
            </div>
            <PillBtn kind="primary" big style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStep(1)}>
              <TgIcon /> Получить в Telegram
            </PillBtn>
            <PillBtn kind="soft" big style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={() => setStep(2)}>
              📧 Прислать на e-mail
            </PillBtn>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="display" style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>
              Откройте бота в Telegram
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 15, marginBottom: 20 }}>
              Жмёте «Старт» — VPN активирован.
            </p>
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: 16,
                padding: 24,
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 180,
                  height: 180,
                  margin: '0 auto',
                  background: `repeating-conic-gradient(var(--ink) 0% 25%, #fff 25% 50%) 50% / 14px 14px`,
                  borderRadius: 8,
                  border: '8px solid #fff',
                  outline: '1px solid var(--line)',
                }}
              />
              <div className="mono" style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)' }}>
                отсканируйте QR-код
              </div>
            </div>
            <PillBtn kind="dark" big style={{ width: '100%', justifyContent: 'center' }} href="https://t.me" target="_blank">
              <TgIcon /> Открыть @rocketjumpvpn_bot
            </PillBtn>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="display" style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>
              Ваш e-mail
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 15, marginBottom: 20 }}>
              Через минуту получите ссылку с подробной инструкцией.
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="ivan@mail.ru"
              style={{
                width: '100%',
                padding: '16px 18px',
                borderRadius: 12,
                border: '1px solid var(--line)',
                fontSize: 16,
                fontFamily: 'inherit',
                marginBottom: 14,
                outline: 'none',
                background: '#fff',
              }}
            />
            <PillBtn kind="primary" big style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStep(3)}>
              Отправить
            </PillBtn>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 80 }}>✉️</div>
            <h3 className="display" style={{ fontSize: 24, fontWeight: 700, margin: '12px 0 8px' }}>
              Отправили!
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 15, marginBottom: 24 }}>
              Проверьте почту {email || 'ivan@mail.ru'}. Если письма нет — загляните в спам.
            </p>
            <PillBtn kind="soft" big style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
              Готово
            </PillBtn>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Sticky CTA ──────────────────────────────────────────── */
function StickyCTA({ onTrial }: { onTrial: () => void }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: `translateX(-50%) translateY(${show ? 0 : 120}px)`,
        transition: 'transform .3s',
        zIndex: 40,
        background: 'var(--ink)',
        color: '#fff',
        borderRadius: 999,
        padding: '10px 12px 10px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: '0 20px 50px -10px rgba(0,0,0,.4)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>VPN от {PRICE} ₽</div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>3 дня бесплатно</div>
      </div>
      <PillBtn kind="primary" onClick={onTrial}>
        🚀 Начать
      </PillBtn>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default function Page() {
  const [trialOpen, setTrialOpen] = useState(false)
  const openTrial = () => setTrialOpen(true)

  return (
    <>
      <Nav onTrial={openTrial} />
      <main>
        <Hero onTrial={openTrial} />
        <TrustMarquee />
        <Features />
        <HowItWorks onTrial={openTrial} />
        <Devices />
        <Countries />
        <Pricing onTrial={openTrial} />
        <Reviews />
        <FAQSection />
        <FinalCTA onTrial={openTrial} />
      </main>
      <Footer />
      <TrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />
      <StickyCTA onTrial={openTrial} />
    </>
  )
}
