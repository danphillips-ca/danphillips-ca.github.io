---
layout: posts
title:  "Hello World"
date:   2023-03-31 15:00:00 -0300
categories: Site Migration
author: Dan Phillips
---
This is my first post to use as a template for migrating my blog from [WordPress][WordPress-link] on Bluehost to [Jekyll][Jekyll-link] on GitHub Pages. The links in this paragraph largely exist to remind myself how to make them in this markdarkdown iteration.

At present, the theme is "minimal-mistakes-jekyll" which I was only able to get working with GitHubs Pages by using a remote theme addon. The direct theme works well locally -- so if I ever need to migrate and build elsewhere, it should be easy enough.

Here's some of the guidance in the default blog post that I might find handy later:

Jekyll requires blog post files to be named according to the following format:

`YEAR-MONTH-DAY-title.MARKUP`

Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit numbers, and `MARKUP` is the file extension representing the format used in the file. After that, include the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/

[WordPress-link]: https://www.wordpress.org
[Jekyll-link]: https://www.jekyllrb.com