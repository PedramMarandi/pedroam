import { graphql } from "gatsby";
import Helmet from "react-helmet";
import get from "lodash/get";
import React from "react";

import userConfig from "../../config";

import Layout from "./layout";

import Article from "../components/Article";
import ArticleHeader from "../components/ArticleHeader";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import FeaturedImage from "../components/FeaturedImage";
import PageNav from "../components/PageNav";
import Share from "../components/Share";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const author = get(this.props, "data.site.siteMetadata.author");
    const { previous, next } = this.props.pageContext;

    let url = "";
    if (typeof window !== `undefined`) {
      url = window.location.href;
    }

    return (
      <Layout>
        <Container>
          <Helmet
            title={`${post.frontmatter.title} | ${author}`}
            htmlAttributes={{ lang: "en" }}
          >

<meta property="og:type" content="website"/>
<meta property="og:url" content={`https://pedroam.dev/${post.fields.slug}`}/>
<meta property="og:title" content={`${post.frontmatter.title} | ${userConfig.title}`}/>
<meta property="og:description" content={post.excerpt}/>
<meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"/>

<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:url" content={`https://pedroam.dev/${post.fields.slug}`}/>
<meta property="twitter:title"  content={`${post.frontmatter.title} | ${userConfig.title}`}/>
<meta property="twitter:description"  content={post.excerpt}/>
<meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"/>
          </Helmet>
          <Card>
            <ArticleHeader>
              {post.frontmatter.featuredImage && (
                <FeaturedImage
                  sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
                />
              )}
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.date}</p>
              <span />
            </ArticleHeader>
            <Article>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </Article>
            {userConfig.showShareButtons && (
              <Share url={url} title={post.frontmatter.title} />
            )}
          </Card>

          <PageNav>
            {previous && (
              <Button to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Button>
            )}

            {next && (
              <Button to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Button>
            )}
          </PageNav>
        </Container>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 850, maxHeight: 250) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
