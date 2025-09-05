import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // 拿取 /posts 資料夾中的所有檔案名稱
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // 移除名稱中的 ".md"，並將它當作 id
        const id = fileName.replace(/\.md$/, '');

        // 將 markdown 內容轉換為字串
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // 使用 gray-matter 解析 metadata 區塊
        const matterResult = matter(fileContents);

        // 將資料與 id 結合
        return {
        id,
        ...matterResult.data,
        };
    });
    // 依照日期排序
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
        return 1;
        } else {
        return -1;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
        params: {
            id: fileName.replace(/\.md$/, ''),
        },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    // 不再轉成 HTML，直接回傳 markdown 原始內容
    return {
        id,
        contentMarkdown: matterResult.content,
        ...matterResult.data,
    };
}