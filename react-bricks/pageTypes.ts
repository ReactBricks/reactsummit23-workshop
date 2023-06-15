import { fetchPages, fetchTags, types } from 'react-bricks/frontend'
import config from './config'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    customFields: [
      {
        name: 'test',
        label: 'Test Field',
        type: types.SideEditPropType.Text,
      },
    ],
  },
  {
    name: 'pokemon',
    pluralName: 'pokemon',
    getExternalData: (page) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${page.slug}`)
        .then((response) => response.json())
        .then((data) => ({
          ...data,
          imageUrl: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
        })),
  },
  {
    name: 'blog',
    pluralName: 'Blog',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: [
      'title',
      'paragraph',
      'big-image',
      'video',
      'code',
      'tweet',
      'tweet-light',
      'blog-title',
      'newsletter-subscribe',
      'external-data-example',
    ],
    getExternalData: () =>
      fetch('https://catfact.ninja/fact')
        .then((response) => response.json())
        .then((data) => ({
          catFact: data.fact,
        })),
  },
  {
    name: 'layout',
    pluralName: 'layout',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
  },
  {
    name: 'post-list',
    pluralName: 'Postlists',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: ['title', 'post-list'],
    getExternalData: async (page, args) => {
      const tagArgs = args?.tag ? { tag: args.tag } : {}
      const pages = await fetchPages(config.apiKey, {
        ...tagArgs,
        type: 'blog',
        pageSize: 100,
        sort: '-publishedAt',
      })
      const tags = await fetchTags(process.env.API_KEY)

      return {
        pagesByTag: pages,
        allTags: tags?.items || [],
      }
    },
  },
]

export default pageTypes
