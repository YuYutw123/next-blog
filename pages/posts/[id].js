import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import markdownStyles from '../../styles/markdown.module.css';
import admonitionStyles from '../../styles/admonition.module.css';
import remarkDirective from "remark-directive";
import remarkAdmonition from "../../lib/remarkAdmonition";
import CodeBlock from "../../components/codeblock";

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
            <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div className={`${markdownStyles.markdown} ${admonitionStyles.admonitionWrapper}`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonition]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                
                                // inline code 直接返回 <code>，不會產生 div
                                if (inline) {
                                    return (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                                
                                // block code 才使用 CodeBlock 組件
                                return (
                                    <CodeBlock 
                                        language={match ? match[1] : ""} 
                                        isBlock={true}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </CodeBlock>
                                );
                            },
                        }}
                    >
                        {postData.contentMarkdown}
                    </ReactMarkdown>
                </div>
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
        postData,
        },
    };
}