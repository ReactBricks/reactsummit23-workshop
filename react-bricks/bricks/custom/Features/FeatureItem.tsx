import React from 'react'
import { Text, Image, types, Link } from 'react-bricks/frontend'

interface FeatureItemProps {
  withLink: boolean
  linkPath: string
  fluo: boolean
  index: number
}

const FeatureItem: types.Brick<FeatureItemProps> = ({
  withLink,
  linkPath,
  fluo,
  index,
}) => {
  return (
    <div
      className={`sm:flex-[0_1_30%] mb-12 sm:mb-16 ${
        fluo && index % 2 === 1 && 'bg-lime-400'
      } ${fluo && index % 2 === 0 && 'bg-fuchsia-400'}`}
    >
      <Image
        propName="image"
        alt="feature"
        maxWidth={300}
        aspectRatio={1}
        imageClassName="block w-12 h-12 sm:w-32 sm:h-32 object-contain mx-auto"
        renderWrapper={({ children }) => (
          <div className="float-left mr-5 mt-1 sm:float-none sm:mr-0 sm:mt-0 sm:mb-5">
            {children}
          </div>
        )}
      />
      <div className="overflow-hidden sm:text-center">
        <Text
          propName="title"
          placeholder="Type a title..."
          renderBlock={({ children }) => (
            <h1 className="sm:text-xl font-bold mb-1 text-gray-900 dark:text-white">
              {children}
            </h1>
          )}
        />
        <Text
          propName="description"
          placeholder="Type a description..."
          renderBlock={({ children }) => (
            <div className="text-gray-600 dark:text-gray-200">{children}</div>
          )}
        />
        {withLink && (
          <div className="mt-2">
            <Link
              href={linkPath}
              className="text-sky-500 hover:text-sky-600 transition-colors"
            >
              <Text
                propName="linkText"
                placeholder="Type a text..."
                renderBlock={({ children }) => <span>{children}</span>}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

FeatureItem.schema = {
  name: 'ws-feature-item',
  label: 'Feature Item',
  hideFromAddMenu: true,
  // category: '',
  // tags: [],

  // Defaults when a new brick is added
  getDefaultProps: () => ({
    title: 'Thick as a brick',
    description: 'This is the description',
    withLink: false,
    linkPath: '',
  }),

  // Sidebar Edit controls for props
  sideEditProps: [
    {
      name: 'withLink',
      label: 'With Link',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'linkPath',
      label: 'Link Path',
      type: types.SideEditPropType.Text,
      validate: (url) =>
        !url || url.startsWith('https://') || 'Insert a valid URL',
      show: (props) => !!props.withLink,
    },
  ],
}

export default FeatureItem
