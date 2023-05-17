---
layout: single
title:  "Jekyll and the Minimal Mistakes Theme"
date:   2023-04-02 22:00:00 -0300
author: Dan Phillips
excerpt: "Some reminders about my Jekyll/Theme setup. Actually, this is just the default stuff -- I've butchered my installation."
toc: true
---

## Installation

- Minimal Mistakes can be installed via RubyGems or GitHub Pages.
- To install via RubyGems, add the following to your site's `Gemfile`:

  ```ruby
  gem "minimal-mistakes-jekyll"
  ```

  Then run `bundle install` to install the theme.

- To install via GitHub Pages, add the following to your site's `_config.yml`:

  ```bash
  remote_theme: mmistakes/minimal-mistakes
  ```

## Configuration

- To configure Minimal Mistakes, modify your site's `_config.yml` file.
- Some of the key configuration options include:

  - `title` - The title of your site.
  - `author` - The author of your site.
  - `avatar` - The path to the author's avatar image.
  - `description` - A description of your site.
  - `url` - The URL of your site.
  - `github_username` - Your GitHub username.
  - `twitter_username` - Your Twitter username.
  - `linkedin_username` - Your LinkedIn username.
  - `instagram_username` - Your Instagram username.
  - `google_analytics` - Your Google Analytics tracking code.
  - `disqus` - Your Disqus shortname.

## Layouts

- Minimal Mistakes includes several layouts for different types of pages.
- Some of the key layouts include:

  - `default` - The default layout for pages.
  - `home` - The layout for your site's home page.
  - `single` - The layout for single blog posts.
  - `archive` - The layout for archive pages.
  - `category` - The layout for category pages.
  - `tag` - The layout for tag pages.
  - `author` - The layout for author pages.

## Includes

- Minimal Mistakes includes several includes for reusable code snippets.
- Some of the key includes include:

  - `google-analytics.html` - The Google Analytics tracking code.
  - `disqus.html` - The Disqus comments code.
  - `social.html` - The social media links.
  - `twitter-card.html` - The Twitter Card meta tags.
  - `facebook-open-graph.html` - The Facebook Open Graph meta tags.

## Features

- Minimal Mistakes includes several features to enhance your site.
- Some of the key features include:

  - Syntax highlighting for code blocks.
  - Responsive design for mobile devices.
  - Customizable navigation menus.
  - Support for multiple authors.
  - Customizable sidebar widgets.
  - Pagination for blog posts and archive pages.
  - Integration with Google Analytics and Disqus.

## Resources

- [Minimal Mistakes Documentation](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
- [Minimal Mistakes GitHub Repository](https://github.com/mmistakes/minimal-mistakes)

