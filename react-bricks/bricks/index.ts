import { types } from 'react-bricks/frontend'

import HeroUnit from './custom/MyHeroUnit'
import reactBricksUITheme from './react-bricks-ui'
import TextImage from './custom/TextImage'
import Features from './custom/Features/Features'
import FeatureItem from './custom/Features/FeatureItem'
import Pokemon from './custom/Pokemon'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Custom', // Custom Bricks
    categories: [
      {
        categoryName: 'Hero sections',
        bricks: [HeroUnit],
      },
      {
        categoryName: 'Main content',
        bricks: [TextImage, Features, FeatureItem, Pokemon],
      },
    ],
  },
]

export default bricks
