import {
  Image,
  RichText,
  Text,
  types,
  usePageValues,
} from 'react-bricks/frontend'

//=============================
// Local Types
//=============================
type Padding = 'big' | 'small'

interface HeroUnitProps {
  padding: Padding
  title: string
  text: string
}

//=============================
// Component to be rendered
//=============================
const MyHeroUnit: types.Brick<HeroUnitProps> = ({ padding }) => {
  const [page, setPage] = usePageValues()

  const { customValues } = page

  return (
    <div
      className={`max-w-xl mx-auto px-6 ${
        padding === 'big' ? 'py-20' : 'py-12'
      }`}
    >
      <div>
        <Image
          propName="icon"
          alt="Icon"
          maxWidth={200}
          aspectRatio={1}
          imageClassName="w-20 mb-5 mx-auto rounded-full"
        />
        <Text
          renderBlock={(props) => (
            <h1 className="text-3xl sm:text-4xl text-center font-black text-gray-900 dark:text-white leading-tight mb-3">
              {props.children}
            </h1>
          )}
          placeholder="Type a title..."
          metaFieldName="title"
        />
        <RichText
          renderBlock={(props) => (
            <p className="text-xl text-center leading-relaxed text-gray-700 dark:text-gray-100">
              {props.children}
            </p>
          )}
          placeholder="Type a text..."
          propName="text"
          allowedFeatures={[
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
            types.RichTextFeatures.Highlight,
            types.RichTextFeatures.Code,
            types.RichTextFeatures.Link,
          ]}
          renderCode={(props) => (
            <code className="text-sm py-1 px-2 bg-sky-200 dark:bg-sky-800 rounded">
              {props.children}
            </code>
          )}
        />
      </div>
    </div>
  )
}

//=============================
// Brick Schema
//=============================
MyHeroUnit.schema = {
  name: 'my-hero-unit',
  label: 'Custom Hero Unit',
  previewImageUrl: `/bricks-preview-images/custom-hero-unit.png`,
  getDefaultProps: () => ({
    padding: 'big',
    title: 'This is a custom Hero Unit',
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
  }),
  sideEditProps: [
    {
      name: 'padding',
      label: 'Padding',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'big', label: 'Big Padding' },
          { value: 'small', label: 'Small Padding' },
        ],
      },
    },
    {
      name: 'test',
      label: 'Test',
      type: types.SideEditPropType.Custom,
      validate: (value) => (value && value.startsWith('a')) || 'Error',
      component: ({ value, onChange, isValid }) => (
        <input
          style={{ backgroundColor: isValid ? 'lightgreen' : 'pink' }}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ),
    },
  ],
}

export default MyHeroUnit
