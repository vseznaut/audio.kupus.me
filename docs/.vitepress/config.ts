import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Kupus.me',
  description: 'База аудиокниг и обзоров',
  lang: 'ru-RU',

  themeConfig: {
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Аудиокниги', link: '/audiobooks/' },
      { text: 'Обзоры', link: '/reviews/' }
    ],

    sidebar: {
      '/audiobooks/': [
        {
          text: 'Навигация',
          items: [
            { text: 'Все аудиокниги', link: '/audiobooks/' },
            { text: 'Добавить новую', link: '/audiobooks/add' }
          ]
        },
        {
          text: 'Бизнес и управление',
          collapsed: false,
          items: [
            { text: 'Deadline', link: '/audiobooks/deadline/' },
            { text: 'Мифический человеко-месяц', link: '/audiobooks/mificheskiy-cheloveko-mesyats/' },
            { text: 'Предпринимательский миф', link: '/audiobooks/predprinimatelskiy-mif/' },
            { text: 'О чём молчит Биг Мак', link: '/audiobooks/o-chyom-molchit-big-mak/' }
          ]
        },
        {
          text: 'Маркетинг и карьера',
          collapsed: false,
          items: [
            { text: 'Позиционирование', link: '/audiobooks/pozitsionirovanie/' },
            { text: 'Как быть крысой', link: '/audiobooks/kak-byt-krysoy/' }
          ]
        },
        {
          text: 'Саморазвитие',
          collapsed: false,
          items: [
            { text: 'Атомные привычки', link: '/audiobooks/atomnye-privychki/' },
            { text: 'Как научиться учиться', link: '/audiobooks/kak-nauchitsya-uchitsya/' },
            { text: 'Ешь. Двигайся. Спи', link: '/audiobooks/esh-dvigaysya-spi/' }
          ]
        },
        {
          text: 'Художественная литература',
          collapsed: false,
          items: [
            { text: 'Атлант расправил плечи', link: '/audiobooks/atlant-raspravil-plechi/' },
            { text: 'Стив Джобс', link: '/audiobooks/steve-jobs/' }
          ]
        }
      ],
      '/reviews/': [
        {
          text: 'Обзоры',
          items: [
            { text: 'Все обзоры', link: '/reviews/' },
            { text: 'Написать обзор', link: '/reviews/add' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vseznaut/kupus.me' }
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                noResultsText: 'Нет результатов для',
                resetButtonTitle: 'Сбросить поиск',
                footer: {
                  selectText: 'выбрать',
                  navigateText: 'перейти',
                  closeText: 'закрыть'
                }
              }
            }
          }
        }
      }
    },

    footer: {
      message: 'База аудиокниг и обзоров',
      copyright: 'Copyright © 2025 Kupus.me'
    }
  }
})
