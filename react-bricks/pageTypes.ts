import { types } from 'react-bricks/frontend'

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
]

export default pageTypes
