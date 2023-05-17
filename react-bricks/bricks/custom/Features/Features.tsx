import React from 'react'
import { Text, Repeater, types } from 'react-bricks/frontend'
import Section from '../../react-bricks-ui/shared/components/Section'
import Container from '../../react-bricks-ui/shared/components/Container'

interface FeaturesProps {
  fluo: boolean
}

const Features: types.Brick<FeaturesProps> = ({ fluo }) => {
  return (
    <Section>
      <Container>
        <Text
          propName="title"
          placeholder="Title..."
          renderBlock={({ children }) => (
            <h1 className="text-3xl text-center font-extrabold mb-12 dark:text-white">
              {children}
            </h1>
          )}
        />
        <div className="flex flex-wrap justify-center">
          <Repeater propName="features" itemProps={{ fluo }} />
        </div>
      </Container>
    </Section>
  )
}

Features.schema = {
  name: 'ws-features',
  label: 'Features',

  // Defaults when a new brick is added
  getDefaultProps: () => ({
    title: 'Our features',
    fluo: false,
  }),

  repeaterItems: [
    {
      name: 'features',
      itemType: 'ws-feature-item',
      max: 6,
    },
  ],

  // Sidebar Edit controls for props
  sideEditProps: [
    {
      name: 'fluo',
      label: 'Fluo',
      type: types.SideEditPropType.Boolean,
    },
  ],
}

export default Features
