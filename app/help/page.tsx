'use client';

// ヘルプ。よくある質問と、問い合わせフォーム。
//
// 送信サーバーが無いので「送信しました」とは出さない。
// 入力内容を持ってメールアプリを開く（これは実際に動く）。

import { useState } from 'react';
import BackButton from '@/components/BackButton';

// ★チームの連絡先に差し替える。空のままだと問い合わせ欄は無効表示になる。
const SUPPORT_EMAIL = '';

const QA: { q: string; a: string }[] = [
  {
    q: '場所はどこに書いてあるの？',
    a: '一覧では場所を伏せています。投稿を開いて1ptを使うと、正確な場所とGoogleマップへのリンクが出ます。写真とタイトルだけで「行きたいか」を決められるようにするためです。',
  },
  {
    q: 'ポイントはどうやって増えるの？',
    a: '最初に10pt持っています。投稿を開くと1pt減り、開いた投稿に「✨新しい」を送ると1pt戻ります。知らない場所を見つけた人が、次も探せるようにするためのしくみです。',
  },
  {
    q: '「✨新しい」は何のボタン？',
    a: '「この場所は知らなかった」という意思表示です。評価の高さではなく、知られていなさを人の目で測るために使います。将来は投稿者にポイントが入ります。',
  },
  {
    q: '条件で探しても思った結果が出ない',
    a: 'キーワードと「気分・趣味」は絞り込みなので、合わないものは出ません。それ以外（誰と・天気・時間帯・空き時間・予算）は並び順にだけ効きます。0件のときはキーワードを短くするか、気分の選択を外してください。',
  },
  {
    q: '写真の場所が自動で入るのはなぜ？',
    a: '写真に位置情報（EXIF）が含まれていれば、そこから場所を割り出しています。SNSやWeb経由の画像は位置情報が削除されているため、その場合は「いまいる場所を使う」か手入力してください。',
  },
  {
    q: '画面はどうやって切り替えるの？',
    a: '下のメニューを押すほか、左右にスワイプしても切り替わります。指の動きに画面が追従します。',
  },
  {
    q: '投稿やポイントは他の端末でも見られる？',
    a: '見られません。ログインなしで使える設計のため、記録はこの端末のブラウザにだけ保存されます。閲覧履歴を消すと一緒に消えます。',
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const canSend = email.trim() !== '' && body.trim() !== '' && SUPPORT_EMAIL !== '';

  const send = () => {
    const subject = encodeURIComponent('アプリへのお問い合わせ');
    const text = encodeURIComponent(
      `${body.trim()}\n\n---\n返信先: ${email.trim()}`
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${text}`;
  };

  return (
    <main>
      <div className="detail-head">
        <BackButton fallback="/me" />
      </div>

      <h1 className="page-title">ヘルプ</h1>
      <p className="page-lead">よくある質問と、お問い合わせ</p>

      <div className="qa">
        {QA.map((item, i) => (
          <div className="qa-item" key={item.q}>
            <button
              className="qa-q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.q}</span>
              <span className="qa-mark">{open === i ? '−' : '＋'}</span>
            </button>
            {open === i && <p className="qa-a">{item.a}</p>}
          </div>
        ))}
      </div>

      <h2 className="page-title" style={{ marginTop: 34 }}>
        お問い合わせ
      </h2>

      {SUPPORT_EMAIL === '' ? (
        <div className="note caution">
          <span className="note-label">準備中</span>
          <p>
            問い合わせ先のメールアドレスが未設定です。
            <br />
            <code>app/help/page.tsx</code> の <code>SUPPORT_EMAIL</code> に
            連絡先を入れると、この欄が使えるようになります。
          </p>
        </div>
      ) : null}

      <div className="field">
        <div className="field-label">メールアドレス</div>
        <input
          className="input"
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="返信を受け取るアドレス"
        />
      </div>

      <div className="field">
        <div className="field-label">お問い合わせ内容</div>
        <textarea
          className="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="困っていること、気づいたことを書いてください"
          style={{ minHeight: 120 }}
        />
      </div>

      <button className="btn" disabled={!canSend} onClick={send}>
        メールアプリで送る
      </button>
      <p className="hint" style={{ textAlign: 'center' }}>
        入力内容を持ってメールアプリが開きます。送信はそちらで行ってください。
      </p>
    </main>
  );
}
