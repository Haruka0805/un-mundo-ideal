/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CONTENT = {
  ja: {
    name: "青木遥",
    role: "専修大学国際コミュニケーション異文化コミュニケーション学科4年生",
    bio: "こんにちは！私は青木遥です。こんにちは、私の名前は青木遥です。第二言語はスペイン語を選択していました。 留学はカナダのバンクーバーにあるサイモンフレーザー大学に行きました。 これまでのゼミの活動では、映画「アラジン」の「ホール・ニュー・ワールド」を題材にして、 英語を楽しく学べるアプリを作成しました。よろしくお願いします。",
    skills: ["HTML,CSS JavaScript"],
    location: "神奈川",
    email: "gc231116@senshu-u.jp",
    playVoice: "声を聴く",
    changeLang: "English",
    title: "自己紹介",
    listening: "再生中...",
  },
  en: {
    name: "Haruka Aoki",
    role: "Senehu University",
    bio: " Hello, my name is Haruka Aoki. I chose Spanish as my second language. I studied abroad at Simon Fraser University in Vancouver, Canada. In my seminar activities so far, I created an app that makes learning English fun, based on the song "A Whole New World" from the movie "Aladdin." Thank you very much..",
    skills: ["HTML,CSS JavaScript"],
    location: "Kanagawa, Japan",
    email: "gc231116@senshu-u.jp",
    playVoice: "Listen to Voice",
    changeLang: "日本語",
    title: "About Me",
    listening: "Playing...",
  },
};

export type Language = keyof typeof CONTENT;
