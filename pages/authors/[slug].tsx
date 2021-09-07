import { getAuthorList } from "@api"
import { Layout } from "@components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from 'next'

type PathType = {
  params: {
    slug: string
  }
}

type AuthorEntryProps = {
  author: Author
}

export const getStaticPaths: GetStaticProps<PathType> = async () => {
  const authors = await getAuthorList()
  const paths = authors.map(author => ({
    params: {
      slug: author.fullName
    }
  }))
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params?.slug

  console.log(slug)

  if (typeof slug !== 'string') {
    return {
      notFound: true
    };
  }

  try {
    const authors = await getAuthorList();
    const author = authors.find(author => author.fullName === slug);
    return {
      props: {
        author
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

const Author = ({author}: AuthorEntryProps) => {

  return (
    <Layout>
    <div>
      {author.fullName}
      </div>
      </Layout>
  )
}

export default Author
