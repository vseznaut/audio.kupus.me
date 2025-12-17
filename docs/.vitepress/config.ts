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
          text: 'Аудиокниги',
          items: [
            { text: 'Все аудиокниги', link: '/audiobooks/' },
            { text: 'Добавить новую', link: '/audiobooks/add' }
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
