const path = require(`path`)

const createExamplePages = async ({ examples, gatsbyUtilities }) =>
  Promise.all(
    examples.map(({ previous, example, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: example.uri,

        // use the blog post template as the page component
        // component: path.resolve(`./src/templates/${post.nodeType}.js`),
        component: path.resolve(`./src/templates/Example.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: example.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

const createCategoryPages = async ({ categories, gatsbyUtilities }) =>
  Promise.all(
    categories.map(category => {
      if (!category) return
      // const template = category.slug.replace(/-./g, x => x[1].toUpperCase()[1]).replace(/^\w/, s => s.toUpperCase())
      // const cleanPath = category.uri.replace('/category/', '/')
      const cleanPath = category.uri

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      return gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: cleanPath,

        // use the page template as the page component
        component: path.resolve(`./src/templates/Category.js`),
        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: category.id,

        },
      })


    })
  )

async function getExamples({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPatterns {
      allWpDarkPattern(sort: { fields: [date], order: DESC }) {
        edges {
          example: node {
            id
            uri
          }
          next {
            id
          }
          previous {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  const examples = graphqlResult.data.allWpDarkPattern.edges

  return examples
}

async function getCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCategories {
      # Query all WordPress blog posts sorted by date
      allWpCategory {
        nodes {
          id
          uri
          slug
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }
  const categories = graphqlResult.data.allWpCategory.nodes

  return categories
}


exports.createPages = async gatsbyUtilities => {
  // Query the GraphQL server
  const examples = await getExamples(gatsbyUtilities)
  const categories = await getCategories(gatsbyUtilities)

  await createExamplePages({ examples, gatsbyUtilities })
  await createCategoryPages({ categories, gatsbyUtilities })

}

