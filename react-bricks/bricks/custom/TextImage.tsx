import { Image, RichText, Text, types } from 'react-bricks/frontend'
import Section from '../react-bricks-ui/shared/components/Section'
import Container from '../react-bricks-ui/shared/components/Container'

interface TextImageProps {
  bgColor: types.IColor & { className: string }
  imageSide: 'left' | 'right'
  title: string
  description: string
  image: types.IImageSource
}

const TextImage: types.Brick<TextImageProps> = ({ bgColor, imageSide }) => (
  <Section backgroundColor={bgColor}>
    <Container>
      <div
        className={`flex flex-col sm:justify-between ${
          imageSide === 'right' ? 'sm:flex-row' : 'sm:flex-row-reverse'
        }`}
      >
        <div className="mb-6 sm:mb-0 sm:w-2/5">
          <Text
            propName="title"
            placeholder="Type a title..."
            renderBlock={({ children }) => (
              <h1 className="text-2xl font-bold dark:text-white mb-6">
                {children}
              </h1>
            )}
          />
          <RichText
            propName="description"
            placeholder="Type a description..."
            renderBlock={({ children }) => (
              <p className="text-lg mb-3 dark:text-white">{children}</p>
            )}
            allowedFeatures={[
              types.RichTextFeatures.Bold,
              types.RichTextFeatures.Italic,
            ]}
            renderItalic={({ children }) => (
              <i className="text-sky-500">{children}</i>
            )}
          />
        </div>
        <div className="sm:w-2/5">
          <Image
            propName="image"
            alt="This is an image"
            maxWidth={600}
            aspectRatio={1.5}
          />
        </div>
      </div>
    </Container>
  </Section>
)

TextImage.schema = {
  name: 'ws-text-image',
  label: 'Text Image',
  previewImageUrl:
    'https://images.reactbricks.com/original/b033d356-2189-4cbf-8407-0938a74af8c2.png',
  getDefaultProps: () => ({
    title: 'Another brick in the wall',
    description: 'Thick as a brick and lorem ipsum dolor sit amet.',
    bgColor: { color: '#fff', className: 'bg-white' },
    imageSide: 'right',
  }),
  sideEditProps: [
    {
      name: 'bgColor',
      label: 'Background color',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Color,
        options: [
          { label: 'White', value: { color: '#fff', className: 'bg-white' } },
          {
            label: 'Sky',
            value: { color: '#e0f2fe', className: 'bg-sky-100' },
          },
          {
            label: 'Dark',
            value: { color: '#082f49', className: 'dark bg-sky-900' },
          },
        ],
      },
    },
    {
      name: 'imageSide',
      label: 'Image side',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Radio,
        options: [
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' },
        ],
      },
    },
  ],
  stories: [
    {
      id: 'dark',
      name: 'Dark',
      showAsBrick: true,
      previewImageUrl:
        'https://images.reactbricks.com/original/4cfc186e-424b-42d9-bb2b-7eb6300881b3.png',
      props: {
        title: 'A dark brick in the wall',
        description:
          'Thick as a brick and lorem ipsum dolor sit amet. Thick as a brick and lorem ipsum dolor sit amet. Thick as a brick and lorem ipsum dolor sit amet.',
        bgColor: {
          color: '#082f49',
          className: 'dark bg-sky-900',
        },
        imageSide: 'right',
        image: {
          fallbackSrc:
            'https://images.reactbricks.com/original/f0ff9376-f79a-4013-b23a-f9cd167d118c.jpg',
          fallbackSrcSet:
            'https://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-1080.jpg 1080w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-900.jpg 900w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-600.jpg 600w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-300.jpg 300w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-150.jpg 150w',
          fallbackType: 'image/jpeg',
          src: 'https://images.reactbricks.com/original/f0ff9376-f79a-4013-b23a-f9cd167d118c.webp',
          placeholderSrc:
            'https://images.reactbricks.com/placeholder/f0ff9376-f79a-4013-b23a-f9cd167d118c.jpg',
          srcSet:
            'https://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-1080.webp 1080w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-900.webp 900w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-600.webp 600w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-300.webp 300w,\nhttps://images.reactbricks.com/src_set/f0ff9376-f79a-4013-b23a-f9cd167d118c-150.webp 150w',
          width: 1080,
          height: 720,
          alt: 'blue moon',
          seoName: 'dark',
        },
      },
    },
  ],
}

export default TextImage
