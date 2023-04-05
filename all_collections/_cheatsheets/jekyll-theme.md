---
layout: posts
title:  "Ruby, Jekyll, and Theme"
date:   2023-04-02 22:00:00 -0300
categories: cheatsheets
author: Dan Phillips
toc: true
---

## Ruby

There's a lot about Ruby and Jekyll I don't understand.

For example, on one occasion I decided to delete a site and start over. Git showed no changes between a previous build and a new build except for the content files and a few theme configurations. All gems were the same. With no structural changes to the site detected, I expected it to build on Github just as well as it did before. Instead, it hit an error. It only went through after I ran bundler on my PC.

I still don't understand this, but now I reinstall jekyll and run bundler on ever new PC I'm working from.

---

# Jekyll Commands

```shell
bundle exec jekyll serve
```

Build site and run on localhost.

## Theme

