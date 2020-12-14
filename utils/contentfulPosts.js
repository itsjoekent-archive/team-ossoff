const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
  space,
  accessToken,
  host: process.env.NEXT_PUBLIC_DRAFT_MODE
    ? 'preview.contentful.com'
    : 'cdn.contentful.com',
});

export async function fetchToolkits() {
  const entries = await client.getEntries({
    content_type: 'toolkit',
  });

  return entries.items;
}

export async function fetchToolkitWithSlug(slug) {
  const entries = await client.getEntries({
    content_type: 'toolkit',
    'fields.slug': slug,
  });

  return entries.items[0];
}
