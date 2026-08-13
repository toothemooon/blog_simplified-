const contactEmail = 'abc510433622@gmail.com';

export const echoLegalDocuments = {
  privacy: {
    en: {
      title: 'ECHO Privacy Policy',
      eyebrow: 'ECHO · LEGAL',
      updated: 'Last updated: July 22, 2026',
      summary: 'ECHO is designed as an offline-first quote app. The current version does not require an account and does not contain advertising, analytics, subscriptions, or paid features.',
      sections: [
        {
          title: '1. Information stored on your device',
          paragraphs: [
            'ECHO stores your theme, quote font and size, transition preference, reading preferences, bookmarks, and recent quote state locally on your device. This information is used only to provide the app experience and is not transmitted to the developer.',
            'Share-card images are generated temporarily on your device when you ask to share a quote. You decide whether and where to share them through the operating system share sheet.'
          ]
        },
        {
          title: '2. Information you choose to provide',
          paragraphs: [
            `If you contact the developer at ${contactEmail}, your email address and the contents of your message are processed by your email provider and the developer's email provider so that the developer can reply. Do not include sensitive personal information that is not needed for your request.`
          ]
        },
        {
          title: '3. Information ECHO does not collect',
          bullets: [
            'No account, name, phone number, precise location, contacts, camera, microphone, or photo-library data',
            'No advertising identifier or cross-app tracking',
            'No behavioural analytics or advertising profile',
            'No cookies are used by the native ECHO app',
            'No payment information in the current version'
          ]
        },
        {
          title: '4. Sharing and third-party services',
          paragraphs: [
            'ECHO does not sell, rent, or share personal information with advertisers or data brokers. If you use the system share sheet, email app, App Store, TestFlight, or another third-party service, that service processes information under its own terms and privacy policy.',
            'Apple may process download, TestFlight, diagnostic, or store information independently as the platform provider. ECHO does not receive personal profiles from Apple.'
          ]
        },
        {
          title: '5. Retention and deletion',
          paragraphs: [
            'Local preferences and bookmarks remain on your device until you change them, reset the app, or uninstall ECHO. Because the current version has no account or cloud database, the developer cannot remotely access or delete this local data.',
            'Support emails are kept only as reasonably necessary to respond, maintain support records, resolve disputes, or comply with legal obligations. You may request deletion of a support conversation by email.'
          ]
        },
        {
          title: '6. Children',
          paragraphs: [
            'ECHO is a general-audience reading app and does not knowingly collect personal information from children. If you believe a child has sent personal information by email, please contact the developer so it can be removed.'
          ]
        },
        {
          title: '7. Security and international use',
          paragraphs: [
            'ECHO limits data handling by keeping app preferences on the device. No method of electronic storage or email communication is completely secure, so absolute security cannot be guaranteed. If you contact the developer from another country, your email may be processed where the relevant email providers operate.'
          ]
        },
        {
          title: '8. Changes and contact',
          paragraphs: [
            `This policy may be updated when ECHO's features or data practices change. Material changes will be reflected on this page and, when appropriate, in release notes. Questions or privacy requests may be sent to ${contactEmail}.`
          ]
        }
      ]
    },
    zh: {
      title: 'ECHO 隐私政策',
      eyebrow: 'ECHO · 法律信息',
      updated: '更新日期：2026年7月22日',
      summary: 'ECHO 是一款以离线使用为核心的名言应用。当前版本无需注册账号，不包含广告、行为分析、订阅或付费功能。',
      sections: [
        {
          title: '一、保存在您设备上的信息',
          paragraphs: [
            'ECHO 会在您的设备本地保存主题、名言字体和字号、翻页动画、阅读偏好、收藏及近期名言状态。这些信息仅用于提供应用功能，不会传输给开发者。',
            '当您主动分享名言时，分享卡片会在设备上临时生成。是否分享以及分享到哪里，完全由您通过系统分享面板决定。'
          ]
        },
        {
          title: '二、您主动提供的信息',
          paragraphs: [
            `如果您通过 ${contactEmail} 联系开发者，您的邮箱地址和邮件内容将由您使用的邮件服务商及开发者的邮件服务商处理，以便回复您的问题。请不要发送与请求无关的敏感个人信息。`
          ]
        },
        {
          title: '三、ECHO 当前不会收集的信息',
          bullets: [
            '账号、姓名、电话号码、精确位置、通讯录、相机、麦克风或相册数据',
            '广告标识符或跨应用追踪信息',
            '行为分析数据或广告用户画像',
            'ECHO 原生应用不使用 Cookie',
            '任何付款信息'
          ]
        },
        {
          title: '四、信息共享与第三方服务',
          paragraphs: [
            'ECHO 不会向广告商或数据经纪商出售、出租或共享个人信息。当您使用系统分享面板、邮件应用、App Store、TestFlight 或其他第三方服务时，该服务将按照其自身条款和隐私政策处理信息。',
            '作为平台提供方，Apple 可能独立处理下载、TestFlight、诊断或商店相关信息；ECHO 不会从 Apple 获取用户个人画像。'
          ]
        },
        {
          title: '五、保存与删除',
          paragraphs: [
            '本地偏好和收藏会一直保存在您的设备上，直到您修改、重置应用或卸载 ECHO。当前版本没有账号或云端数据库，因此开发者无法远程访问或删除这些本地数据。',
            '支持邮件仅在回复、保留必要支持记录、处理争议或遵守法律义务所需的合理期限内保存。您可以通过邮件要求删除相关支持对话。'
          ]
        },
        {
          title: '六、未成年人',
          paragraphs: [
            'ECHO 是面向一般用户的阅读应用，不会故意收集未成年人的个人信息。如果您认为未成年人通过邮件发送了个人信息，请联系开发者处理删除。'
          ]
        },
        {
          title: '七、安全与跨境使用',
          paragraphs: [
            'ECHO 通过将应用偏好保存在设备本地来尽量减少数据处理。但任何电子存储或电子邮件通信方式都无法保证绝对安全。如果您从其他国家或地区联系开发者，邮件可能会在相关邮件服务商运营的地区进行处理。'
          ]
        },
        {
          title: '八、政策更新与联系我们',
          paragraphs: [
            `当 ECHO 的功能或数据处理方式发生变化时，本政策可能会更新。重大变更会反映在本页面，并在适当情况下通过版本更新说明告知。隐私问题或相关请求请发送至 ${contactEmail}。`
          ]
        }
      ]
    },
    ja: {
      title: 'ECHO プライバシーポリシー',
      eyebrow: 'ECHO · 法的情報',
      updated: '更新日：2026年7月22日',
      summary: 'ECHOはオフライン中心の名言アプリです。現在のバージョンではアカウント登録は不要で、広告、行動分析、サブスクリプション、有料機能は含まれていません。',
      sections: [
        {
          title: '1. 端末に保存される情報',
          paragraphs: [
            'ECHOはテーマ、名言のフォントとサイズ、切り替え設定、読書設定、ブックマーク、最近表示した名言の状態を端末内に保存します。これらはアプリ体験の提供にのみ使用され、開発者へ送信されません。',
            '名言を共有する操作を行った場合、共有カードは端末上で一時的に生成されます。共有先はOSの共有シートからご自身で選択します。'
          ]
        },
        {
          title: '2. お客様が任意で提供する情報',
          paragraphs: [
            `${contactEmail} へ連絡した場合、返信のためにメールアドレスとメッセージ内容が双方のメールサービスで処理されます。お問い合わせに不要な機微情報は送信しないでください。`
          ]
        },
        {
          title: '3. ECHOが現在収集しない情報',
          bullets: [
            'アカウント、氏名、電話番号、正確な位置情報、連絡先、カメラ、マイク、写真ライブラリのデータ',
            '広告識別子またはアプリ横断トラッキング情報',
            '行動分析データまたは広告プロファイル',
            'ECHOのネイティブアプリはCookieを使用しません',
            '支払情報'
          ]
        },
        {
          title: '4. 共有と第三者サービス',
          paragraphs: [
            'ECHOは個人情報を広告事業者やデータブローカーへ販売、貸与、共有しません。共有シート、メールアプリ、App Store、TestFlightなどを利用する場合、そのサービス独自の規約とプライバシーポリシーが適用されます。',
            'Appleはプラットフォーム提供者として、ダウンロード、TestFlight、診断、ストア関連情報を独立して処理する場合があります。ECHOがAppleから個人プロファイルを受け取ることはありません。'
          ]
        },
        {
          title: '5. 保持と削除',
          paragraphs: [
            '端末内の設定とブックマークは、変更、アプリのリセット、またはアンインストールまで保存されます。現在のバージョンにはアカウントやクラウドデータベースがないため、開発者が遠隔でこれらを閲覧または削除することはできません。',
            'サポートメールは、返信、必要なサポート記録、紛争対応、法的義務のため合理的に必要な期間のみ保持されます。メールで削除を依頼できます。'
          ]
        },
        {
          title: '6. 子どものプライバシー',
          paragraphs: [
            'ECHOは一般利用者向けの読書アプリであり、子どもの個人情報を意図的に収集しません。子どもがメールで個人情報を送信したと思われる場合は、削除のため開発者へご連絡ください。'
          ]
        },
        {
          title: '7. セキュリティと国外からの利用',
          paragraphs: [
            'ECHOは設定を端末内に保存することでデータ処理を最小限にします。ただし、電子保存やメール通信の絶対的な安全性を保証することはできません。国外から連絡する場合、メールは各メール事業者の運営地域で処理される場合があります。'
          ]
        },
        {
          title: '8. 変更と連絡先',
          paragraphs: [
            `ECHOの機能またはデータ取扱いが変更された場合、本ポリシーを更新することがあります。重要な変更は本ページおよび必要に応じてリリースノートでお知らせします。ご質問やプライバシーに関する依頼は ${contactEmail} へお送りください。`
          ]
        }
      ]
    }
  },

  terms: {
    en: {
      title: 'ECHO Terms of Service',
      eyebrow: 'ECHO · LEGAL',
      updated: 'Last updated: July 22, 2026',
      summary: 'These Terms govern use of the current free ECHO test version. By using ECHO, you agree to these Terms. If you do not agree, please stop using the app.',
      sections: [
        {
          title: '1. The service',
          paragraphs: [
            'ECHO provides quotes, bookmarks, preference-based recommendations, visual themes, and sharing tools for general reading, reflection, and entertainment. ECHO is not medical, psychological, legal, financial, or other professional advice and must not be used as a substitute for qualified professional help.'
          ]
        },
        {
          title: '2. Eligibility and accounts',
          paragraphs: [
            'The current version does not require an account. If you are not legally able to agree to these Terms in your location, use ECHO only with permission from a parent or legal guardian.'
          ]
        },
        {
          title: '3. Acceptable use',
          bullets: [
            'Use ECHO only for lawful, personal purposes',
            'Do not interfere with the app, its distribution, security, or operation',
            'Do not use ECHO to infringe intellectual-property, privacy, or other rights',
            'Do not misrepresent ECHO, its developer, or quote attribution data'
          ]
        },
        {
          title: '4. Quotes and attribution',
          paragraphs: [
            'ECHO makes reasonable efforts to present accurate quote text, author names, identities, and work sources. Historical quotations may have variant translations or disputed attribution. If you identify an error, please report it by email.',
            'Quotations and referenced works remain the property of their respective rights holders where applicable. Their inclusion does not imply endorsement by an author, estate, publisher, or rights holder.'
          ]
        },
        {
          title: '5. Local data and availability',
          paragraphs: [
            'Preferences and bookmarks are stored locally. You are responsible for maintaining access to your device. Uninstalling, resetting, replacing, or losing the device may remove local data. The developer does not guarantee cloud backup or recovery.',
            'Features may be corrected, changed, suspended, or discontinued to maintain security, quality, legal compliance, or compatibility.'
          ]
        },
        {
          title: '6. Fees and subscriptions',
          paragraphs: [
            'The current version is a free test version. It contains no purchase button, subscription, paid unlock, price label, or paywall.',
            'The developer reserves the right to offer optional Advanced Features through a one-time purchase in a future version. Any future charge will be disclosed before purchase and announced in the relevant release notes. A future paid option will not remove access to basic features already available to you.'
          ]
        },
        {
          title: '7. Third-party services',
          paragraphs: [
            'ECHO may open system services such as the share sheet, email app, App Store, or TestFlight. Third-party services are governed by their own terms and policies, and the developer is not responsible for their availability or conduct.'
          ]
        },
        {
          title: '8. Intellectual property',
          paragraphs: [
            'The ECHO software source code is licensed under the MIT License. You may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the MIT License terms included in the source code.',
            "Quotation content is sourced from Wikiquote and licensed under CC BY-SA 4.0. ECHO's branding, logos, and trademarks are not covered by the MIT License and remain the property of the developer."
          ]
        },
        {
          title: '9. Disclaimer and limitation of liability',
          paragraphs: [
            'ECHO is provided on an “as is” and “as available” basis to the extent permitted by law. The developer does not guarantee uninterrupted operation, complete accuracy, or suitability for a particular purpose.',
            'To the maximum extent permitted by applicable law, the developer is not liable for indirect, incidental, special, consequential, or punitive loss arising from use of or inability to use ECHO. Nothing in these Terms excludes rights or liability that cannot legally be excluded.'
          ]
        },
        {
          title: '10. Applicable law',
          paragraphs: [
            'These Terms and any dispute relating to ECHO are governed by applicable law. Nothing in these Terms limits mandatory consumer rights that apply where you live. Please contact the developer first so that concerns can be addressed informally where possible.'
          ]
        },
        {
          title: '11. Changes and contact',
          paragraphs: [
            `These Terms may be updated when ECHO changes or when legal requirements change. The updated date will appear above, and material changes may also be described in release notes. Questions may be sent to ${contactEmail}.`
          ]
        }
      ]
    },
    zh: {
      title: 'ECHO 服务条款',
      eyebrow: 'ECHO · 法律信息',
      updated: '更新日期：2026年7月22日',
      summary: '本条款适用于当前 ECHO 免费测试版。使用 ECHO 即表示您同意本条款；如果您不同意，请停止使用本应用。',
      sections: [
        {
          title: '一、服务内容',
          paragraphs: [
            'ECHO 提供名言阅读、收藏、基于偏好的推荐、视觉主题和分享工具，仅用于一般阅读、思考与娱乐。ECHO 不构成医疗、心理、法律、财务或其他专业建议，也不能替代合格专业人士的帮助。'
          ]
        },
        {
          title: '二、使用资格与账号',
          paragraphs: [
            '当前版本无需注册账号。如果您在所在地不具备独立同意本条款的法律能力，请在父母或法定监护人许可下使用 ECHO。'
          ]
        },
        {
          title: '三、合理使用',
          bullets: [
            '仅将 ECHO 用于合法的个人用途',
            '不得干扰应用的分发、安全或正常运行',
            '不得利用 ECHO 侵犯知识产权、隐私或其他合法权利',
            '不得歪曲 ECHO、开发者或名言署名信息'
          ]
        },
        {
          title: '四、名言与署名',
          paragraphs: [
            'ECHO 会合理努力核对名言正文、作者姓名、作者身份和作品来源。历史名言可能存在不同译本或署名争议；如果您发现错误，请通过邮件反馈。',
            '名言及其来源作品在适用情况下仍归相应权利人所有。收录名言不代表相关作者、遗产管理方、出版社或权利人对 ECHO 的认可。'
          ]
        },
        {
          title: '五、本地数据与服务可用性',
          paragraphs: [
            '偏好和收藏保存在本地设备上。卸载或重置应用、更换或遗失设备可能导致本地数据丢失，开发者不保证提供云备份或恢复。',
            '为保障安全、质量、法律合规或系统兼容性，开发者可能修复、调整、暂停或停止部分功能。'
          ]
        },
        {
          title: '六、费用与订阅',
          paragraphs: [
            '当前版本为免费测试版，不包含购买按钮、订阅、付费解锁、价格标签或付费墙。',
            '开发者保留在未来版本中对可选高级功能（Advanced Features）收取一次性购买费用的权利。任何未来收费都会在购买前明确展示，并通过相应版本的更新日志提前告知。未来的付费选项不会取消您已经可以使用的基础功能。'
          ]
        },
        {
          title: '七、第三方服务',
          paragraphs: [
            'ECHO 可能调用系统分享面板、邮件应用、App Store 或 TestFlight 等服务。这些第三方服务受其自身条款与政策约束，开发者不对其可用性或行为负责。'
          ]
        },
        {
          title: '八、知识产权',
          paragraphs: [
            'ECHO 软件源代码采用 MIT 许可证。您可根据源代码中附带的 MIT 许可证条款，自由使用、复制、修改、合并、发布、分发、再许可及/或出售软件副本。',
            '名言内容来源于 Wikiquote，采用 CC BY-SA 4.0 许可证。ECHO 的品牌、标识和商标不在 MIT 许可证范围内，仍归开发者所有。'
          ]
        },
        {
          title: '九、免责声明与责任限制',
          paragraphs: [
            '在法律允许范围内，ECHO 按“现状”和“可用状态”提供。开发者不保证服务始终不中断、所有内容完全准确或适用于特定目的。',
            '在适用法律允许的最大范围内，开发者不对因使用或无法使用 ECHO 而产生的间接、附带、特殊、后果性或惩罚性损失负责。本条款不会排除法律规定不得排除的权利或责任。'
          ]
        },
        {
          title: '十、适用法律',
          paragraphs: [
            '本条款及与 ECHO 有关的争议适用相关法律。本条款不会限制您所在地法律规定的强制性消费者权利。如有争议，请优先联系开发者，以便在可能的情况下通过沟通解决。'
          ]
        },
        {
          title: '十一、条款更新与联系我们',
          paragraphs: [
            `当 ECHO 功能或法律要求发生变化时，本条款可能会更新。更新日期会显示在页面顶部，重大变更也可能通过版本更新说明告知。相关问题请发送至 ${contactEmail}。`
          ]
        }
      ]
    },
    ja: {
      title: 'ECHO 利用規約',
      eyebrow: 'ECHO · 法的情報',
      updated: '更新日：2026年7月22日',
      summary: '本規約は現在の無料テスト版ECHOに適用されます。ECHOを利用することで本規約に同意したものとみなされます。同意しない場合は利用を中止してください。',
      sections: [
        {
          title: '1. サービス内容',
          paragraphs: [
            'ECHOは一般的な読書、内省、娯楽のために、名言、ブックマーク、設定に基づくおすすめ、テーマ、共有ツールを提供します。医療、心理、法律、金融その他の専門的助言ではなく、専門家の支援に代わるものではありません。'
          ]
        },
        {
          title: '2. 利用資格とアカウント',
          paragraphs: [
            '現在のバージョンではアカウントは不要です。居住地の法律上、本規約へ単独で同意できない場合は、保護者または法定代理人の許可を得て利用してください。'
          ]
        },
        {
          title: '3. 適切な利用',
          bullets: [
            '合法的かつ個人的な目的にのみ利用すること',
            '配布、セキュリティ、運営を妨害しないこと',
            '知的財産権、プライバシーその他の権利を侵害しないこと',
            'ECHO、開発者、名言の帰属情報を偽らないこと'
          ]
        },
        {
          title: '4. 名言と出典',
          paragraphs: [
            'ECHOは名言本文、著者名、人物情報、作品出典の正確性について合理的な確認を行います。歴史的な名言には翻訳の違いや帰属の議論がある場合があります。誤りを発見した場合はメールでお知らせください。',
            '名言および参照作品の権利は、該当する各権利者に帰属します。掲載は著者、遺産管理者、出版社、権利者による推奨を意味しません。'
          ]
        },
        {
          title: '5. ローカルデータと提供状況',
          paragraphs: [
            '設定とブックマークは端末内に保存されます。アンインストール、リセット、端末の交換または紛失によりデータが失われる場合があり、開発者はクラウドバックアップや復元を保証しません。',
            '安全性、品質、法令遵守、互換性のため、機能を修正、変更、一時停止または終了する場合があります。'
          ]
        },
        {
          title: '6. 料金とサブスクリプション',
          paragraphs: [
            '現在のバージョンは無料テスト版であり、購入ボタン、サブスクリプション、有料アンロック、価格表示、ペイウォールは含まれていません。',
            '開発者は将来のバージョンで、任意の高度な機能（Advanced Features）を一回限りの購入として提供する権利を留保します。将来の料金は購入前に明示し、該当バージョンのリリースノートでも事前にお知らせします。将来の有料オプションによって、すでに利用可能な基本機能が失われることはありません。'
          ]
        },
        {
          title: '7. 第三者サービス',
          paragraphs: [
            'ECHOは共有シート、メールアプリ、App Store、TestFlightなどのシステムサービスを開く場合があります。これらには各サービス独自の規約とポリシーが適用され、開発者はその提供状況や行為について責任を負いません。'
          ]
        },
        {
          title: '8. 知的財産',
          paragraphs: [
            'ECHOのソフトウェアソースコードはMITライセンスの下で提供されています。ソースコードに添付のMITライセンス条項に従い、ソフトウェアの複製を使用、複製、変更、統合、公開、配布、再ライセンスおよび/または販売することができます。',
            '名言コンテンツはWikiquoteから提供され、CC BY-SA 4.0ライセンスの下で利用可能です。ECHOのブランド、ロゴ、商標はMITライセンスの対象外であり、開発者の所有物です。'
          ]
        },
        {
          title: '9. 免責と責任制限',
          paragraphs: [
            '法令で認められる範囲において、ECHOは「現状有姿」かつ「提供可能な状態」で提供されます。中断のない動作、完全な正確性、特定目的への適合性を保証しません。',
            '適用法で認められる最大限の範囲において、利用または利用不能から生じる間接的、付随的、特別、結果的、懲罰的損害について開発者は責任を負いません。法的に排除できない権利または責任は除外されません。'
          ]
        },
        {
          title: '10. 準拠法',
          paragraphs: [
            '本規約およびECHOに関する紛争には適用法が適用されます。本規約は、お住まいの地域で適用される強行的な消費者の権利を制限するものではありません。可能な場合は話し合いで解決できるよう、まず開発者へご連絡ください。'
          ]
        },
        {
          title: '11. 変更と連絡先',
          paragraphs: [
            `ECHOの変更または法的要件の変更に応じて、本規約を更新する場合があります。更新日はページ上部に表示し、重要な変更はリリースノートでも案内する場合があります。お問い合わせは ${contactEmail} へお送りください。`
          ]
        }
      ]
    }
  }
,
  support: {
    en: {
      title: 'A Letter from the Developer',
      eyebrow: 'ECHO \u00b7 SUPPORT',
      updated: '',
      summary: '',
      sections: []
    },
    zh: {
      title: '\u6765\u81ea\u5f00\u53d1\u8005\u7684\u4e00\u5c01\u4fe1',
      eyebrow: 'ECHO \u00b7 \u652f\u6301',
      updated: '',
      summary: '',
      sections: []
    },
    ja: {
      title: '\u958b\u767a\u8005\u304b\u3089\u306e\u624b\u7d19',
      eyebrow: 'ECHO \u00b7 \u30b5\u30dd\u30fc\u30c8',
      updated: '',
      summary: '',
      sections: []
    }
  }};

export function getEchoLegalDocument(type, language) {
  const document = echoLegalDocuments[type] || echoLegalDocuments.privacy;
  return document[language] || document.en;
}
