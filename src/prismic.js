// Prismic configuration for Alelken Website
import * as prismic from '@prismicio/client';

export const repositoryName = 'your-repo-name'; // TODO: Replace with your Prismic repo name

export const client = prismic.createClient(repositoryName, {
  // If you have an access token, add it here
  // accessToken: '',
});
