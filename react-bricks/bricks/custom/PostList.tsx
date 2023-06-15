import React from 'react'
import { types, usePageValues } from 'react-bricks/frontend'
import TagListItem from '../../../components/TagListItem'
import PostListItem from '../../../components/PostListItem'
import Section from '../react-bricks-ui/shared/components/Section'
import Container from '../react-bricks-ui/shared/components/Container'

interface ExternalData {
  allTags: string[]
  pagesByTag: types.PageFromList[]
}

const PostList: types.Brick = () => {
  const [pageValues] = usePageValues()

  const { customValues, externalData } = pageValues
  const { allTags, pagesByTag } = externalData as ExternalData

  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-center">
          {allTags?.map((tag) => (
            <TagListItem key={tag} tag={tag} currentTag={customValues.tag} />
          ))}
        </div>

        <hr className="mt-6 mb-10 dark:border-gray-600" />

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-12">
          {pagesByTag?.map((post) => (
            <PostListItem
              key={post.id}
              title={post.meta.title}
              href={post.slug}
              content={post.meta.description}
              author={post.author}
              date={post.publishedAt}
              featuredImg={post.meta.featuredImage || ''}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

PostList.schema = {
  name: 'post-list',
  label: 'Post List',

  // Sidebar Edit controls for props
  sideEditProps: [],
}

export default PostList
