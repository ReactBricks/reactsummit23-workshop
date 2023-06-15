import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import {
  PageViewer,
  cleanPage,
  fetchPage,
  types,
  useReactBricksContext,
} from 'react-bricks/frontend'

import ErrorNoFooter from '../../components/errorNoFooter'
import ErrorNoHeader from '../../components/errorNoHeader'
import ErrorNoKeys from '../../components/errorNoKeys'
import Layout from '../../components/layout'
import config from '../../react-bricks/config'

interface PageProps {
  pagesByTag: types.Page[]
  popularPosts: types.Page[]
  errorNoKeys: string
  errorHeader: string
  errorFooter: string
  filterTag: string
  allTags: string[]
  header: types.Page
  footer: types.Page
  page: types.Page
}

const Page: React.FC<PageProps> = ({
  filterTag,
  errorNoKeys,
  errorHeader,
  errorFooter,
  header,
  footer,
  page,
}) => {
  const { pageTypes, bricks } = useReactBricksContext()
  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = footer ? cleanPage(footer, pageTypes, bricks) : null
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null
  return (
    <Layout>
      {!errorNoKeys && (
        <>
          <Head>
            <title>{filterTag}</title>
            <meta name="description" content={filterTag} />
          </Head>
          {headerOk && !errorHeader ? (
            <PageViewer page={headerOk} showClickToEdit={false} />
          ) : (
            <ErrorNoHeader />
          )}
          <PageViewer page={pageOk} />
          {footerOk && !errorFooter ? (
            <PageViewer page={footerOk} showClickToEdit={false} />
          ) : (
            <ErrorNoFooter />
          )}
        </>
      )}
      {errorNoKeys && <ErrorNoKeys />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false
  let errorHeader: boolean = false
  let errorFooter: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true
    return { props: { error: 'NOKEYS' } }
  }

  try {
    const [page, header, footer] = await Promise.all([
      fetchPage(
        'posts-list',
        config.apiKey,
        context.locale,
        config.pageTypes
      ).catch(() => {
        errorPage = true
        return {}
      }),
      fetchPage('header', config.apiKey, context.locale).catch(() => {
        errorHeader = true
        return {}
      }),
      fetchPage('footer', config.apiKey, context.locale).catch(() => {
        errorFooter = true
        return {}
      }),
    ])

    return {
      props: {
        page: {
          ...page,
          customValues: {
            ...(page as types.Page).customValues,
          },
        },
        header,
        footer,
        errorNoKeys,
        errorPage,
        errorHeader,
        errorFooter,
      },
    }
  } catch {
    return { props: {} }
  }
}

export default Page
