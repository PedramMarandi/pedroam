import Helmet from 'react-helmet';
import React from 'react';
import userConfig from '../../config';
import Layout from './layout';
import Card from '../components/Card';
import Container from '../components/Container';
import Pagination from '../components/Pagination';
import Summary from '../components/Summary';
import CoverImage from './../cover.png'

const IndexPage = ({ pageContext }) => {
  const { group, index, pageCount } = pageContext;
  const previousUrl = index - 1 === 1 ? '' : (index - 1).toString();
  const nextUrl = (index + 1).toString();
  return (
    <Layout>
      <Container>
        <Helmet
          title={`${userConfig.title} | ${userConfig.author}`}
          htmlAttributes={{ lang: 'en' }}
        >
          <meta
            name="description"
            content={`${userConfig.title} | ${userConfig.description}`}
          />

<meta property="og:type" content="website"/>
<meta property="og:url" content="https://pedroam.dev"/>
<meta property="og:title" content={`${userConfig.title} | ${userConfig.author}`}/>
<meta property="og:description" content={`${userConfig.title} | ${userConfig.description}`}/>
<meta property="og:image" content={`${userConfig.siteUrl}/${CoverImage}`}/>

<meta property="twitter:card" content="summary_large_image"/>
<meta property="twitter:url" content="https://pedroam.dev/"/>
<meta property="twitter:title" content={`${userConfig.title} | ${userConfig.author}`}/>
<meta property="twitter:description" content={`${userConfig.title} | ${userConfig.description}`}/>
<meta property="twitter:image" content={`${userConfig.siteUrl}/${CoverImage}`}/>
        </Helmet>
        {group.map(({ node }) => (
          <Card key={node.fields.slug}>
            <Summary
              date={node.frontmatter.date}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              image={node.frontmatter.featuredImage}
              slug={node.fields.slug}
            />
          </Card>
        ))}
        <Pagination
          isFirst={index === 1}
          isLast={index === pageCount}
          nextUrl={nextUrl}
          previousUrl={previousUrl}
        />
      </Container>
    </Layout>
  );
};
export default IndexPage;
