'use client';

// アカウント設定。認証が無いので、保存先はこの端末のブラウザ。
// 「サーバーに保存されている」ように見せない。

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DEFAULT_SETTINGS, Settings, getSettings, saveSettings } from '@/lib/settings';
import { INITIAL_POINTS, resetAll } from '@/lib/points';

export default function SettingsPage() {
  const router = useRouter();
  const [s, setS] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => setS(getSettings()), []);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const next = { ...s, [key]: value };
    setS(next);
    saveSettings(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  return (
    <main>
      <div className="detail-head">
        <button className="back" onClick={() => router.back()}>
          ← 戻る
        </button>
        {saved && <span className="saved-flag">保存しました</span>}
      </div>

      <h1 className="page-title">アカウント設定</h1>
      <p className="page-lead">この端末に保存されます</p>

      <h2 className="settings-head">プロフィール</h2>

      <div className="field">
        <div className="field-label">表示名</div>
        <input
          className="input"
          value={s.displayName}
          onChange={(e) => update('displayName', e.target.value)}
          placeholder="ゲスト"
        />
      </div>

      <div className="field">
        <div className="field-label">メールアドレス</div>
        <input
          className="input"
          type="email"
          inputMode="email"
          value={s.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="未設定"
        />
        <p className="hint">
          いまは端末内に保存されるだけです。アカウント連携を入れると、
          このアドレスで他の端末からも同じ記録を使えるようになります。
        </p>
      </div>

      <h2 className="settings-head">通知</h2>

      <label className="toggle-row">
        <span>
          <span className="toggle-title">自分の投稿への反応</span>
          <span className="toggle-note">「役に立った」を受け取ったとき</span>
        </span>
        <input
          type="checkbox"
          checked={s.notifyReaction}
          onChange={(e) => update('notifyReaction', e.target.checked)}
        />
      </label>

      <label className="toggle-row">
        <span>
          <span className="toggle-title">新着のおすすめ</span>
          <span className="toggle-note">まだ配信していません</span>
        </span>
        <input
          type="checkbox"
          checked={s.notifyDigest}
          onChange={(e) => update('notifyDigest', e.target.checked)}
        />
      </label>

      <h2 className="settings-head">プライバシー</h2>

      <label className="toggle-row">
        <span>
          <span className="toggle-title">投稿に位置情報を含める</span>
          <span className="toggle-note">写真から取得した場所を投稿に載せる</span>
        </span>
        <input
          type="checkbox"
          checked={s.sharePlace}
          onChange={(e) => update('sharePlace', e.target.checked)}
        />
      </label>

      <h2 className="settings-head">データ</h2>

      <button
        className="btn btn-ghost danger"
        onClick={() => {
          if (!window.confirm('ポイント・閲覧履歴・通知を消します。よろしいですか？')) return;
          resetAll();
          router.push('/home');
        }}
      >
        この端末の記録を消す（初期{INITIAL_POINTS}ptに戻る）
      </button>

      <div className="note" style={{ marginTop: 18 }}>
        <span className="note-label">ログインについて</span>
        <p>
          このアプリはログインなしで使えます。そのぶん、投稿・ポイント・通知は
          この端末のブラウザにだけ保存され、機種を変えると引き継げません。
        </p>
      </div>
    </main>
  );
}
