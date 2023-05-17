---
layout: single
title:  "Bookmarklets"
date:   2020-06-15 00:00:00 -0300
author: Dan Phillips
excerpt: "This is a list of bookmarklets that I've used over the years."
toc: true
---

Bookmarklets are short strings of JavaScript to store in your browser as a bookmark. They can format webpages for ease of use, perform specialized search functions, or redirect you to a third-party platform with content from the page.

---

**Caution!**

**While useful, Bookmarklets are snippets of JavaScript and can be malicious or unstable. If you use bookmarklets, ensure they came from a reputable source and (if you are able) interpret the code yourself to minimize risk.**

---

## Bookmarklets vs. Browser Extensions

Most functions of a bookmarklet are common enough that developers have made browser extensions to do the same things. There are advantages and disadvantages of each bookmarklets and browser extensions, including:

Browser extensions are more likely to slow down your browser, whereas bookmarklets are only activated when clicked.

Bookmarklets tend to work across browsers.

Browser extensions are more likely to be obtained through an online store (e.g., The Chrome Web Store or Mozilla's directory of Add-ons for Firefox). Arguably, this is much safer for people who are uncomfortable interpreting code.
Examples: stores may may have quality control mechanisms, people using stores may rate the extension and/or provide scrutiny of code (if its open source), there is usually a way for developers to provide updates, and stores may have a means of informing users when problems are discovered.

## Installing Bookmarklets

If you'd like to copy any of my bookmarklets, drag it into your bookmarks bar.

## Bookmarklets I've Used

### Formatting

>[Bullets to Numbers]
>
>This bookmarklet finds unordered lists (bullets) and turns them into ordered lists (numbers).

>**Edit Everything** [^1]
>
>This bookmarklet makes all text editable. (Just on your browser - you're not actually changing the site.)

[^1]: Whoops. This one isn't working properly anymore.

>[Sort Tables]
>
>Adds a link above each column of a table that allows sorting.

>**View Passwords** [^2]
>
>Returns a prompt that shows whatever text is entered into an obscured password field.

[^2]: Link removed. The real lesson with this one is to know that a bit of javascript can have this functionality.

### Save and Subscribe

>[Add to RefWorks]
>
>Adds a resource to RefWorks. (Requires an account.)

>**Youtube Download** [^3]
>
>Uses a third party service to download a copy of YouTube videos for offline playback. This service is not affiliated with YouTube.

[^3]: Link removed. This probably violates some terms of service or something.

### Search

>[View Cache]
>
>Returns the Google Cache version of a webpage.

>[Find Similar Pages]
>
>Searches Google for similar pages.

>[Show Linking Pages]
>
>Searches Google for pages that link to the current page.

>[Search Current Domain]
>
>Searches the current domain on Google for keywords provided by the user. 

### Translate

>**Translate**[^4]
>
>Entered the current URL into Google Translate, which automatically detects the source language and translates the entire page to English.

[^4]: Link removed. It stopped working - I'm passively looking for an alternative.

## Disclaimer

I am not the developer of these bookmarklets. Licenses are unknown and most were likely published with the expectation that these will be shared freely. I would love to cite my sources, but I have been using most of these bookmarklets for longer than I can remember.


[Bullets to Numbers]: javascript:uls=document.getElementsByTagName("ul"); for (i=uls.length-1; i>=0; --i) { oldul = uls[i]; newol = document.createElement("ol"); for(j=0;j<oldul.childNodes.length;++j) newol.appendChild(oldul.childNodes[j].cloneNode(true)); oldul.parentNode.replaceChild(newol, oldul); } void 0

[Sort Tables]: javascript:function toArray (c){var a, k;a=new Array;for (k=0; k<c.length; ++k)a[k]=c[k];return a;}function insAtTop(par,child){if(par.childNodes.length) par.insertBefore(child, par.childNodes[0]);else par.appendChild(child);}function countCols(tab){var nCols, i;nCols=0;for(i=0;i<tab.rows.length;++i)if(tab.rows[i].cells.length>nCols)nCols=tab.rows[i].cells.length;return nCols;}function makeHeaderLink(tableNo, colNo, ord){var link;link=document.createElement('a');link.href='javascript:sortTable('+tableNo+','+colNo+','+ord+');';link.appendChild(document.createTextNode((ord>0)?%27a%27:%27d%27));return link;}function makeHeader(tableNo,nCols){var header, headerCell, i;header=document.createElement(%27tr%27);for(i=0;i<nCols;++i){headerCell=document.createElement(%27td%27);headerCell.appendChild(makeHeaderLink(tableNo,i,1));headerCell.appendChild(document.createTextNode(%27/%27));headerCell.appendChild(makeHeaderLink(tableNo,i,-1));header.appendChild(headerCell);}return header;}g_tables=toArray(document.getElementsByTagName(%27table%27));if(!g_tables.length) alert("This page doesn%27t contain any tables.");(function(){var j, thead;for(j=0;j<g_tables.length;++j){thead=g_tables[j].createTHead();insAtTop(thead, makeHeader(j,countCols(g_tables[j])))}}) ();function compareRows(a,b){if(a.sortKey==b.sortKey)return 0;return (a.sortKey < b.sortKey) ? g_order : -g_order;}function sortTable(tableNo, colNo, ord){var table, rows, nR, bs, i, j, temp;g_order=ord;g_colNo=colNo;table=g_tables[tableNo];rows=new Array();nR=0;bs=table.tBodies;for(i=0; i<bs.length; ++i)for(j=0; j<bs[i].rows.length; ++j){rows[nR]=bs[i].rows[j];temp=rows[nR].cells[g_colNo];if(temp) rows[nR].sortKey=temp.innerHTML;else rows[nR].sortKey="";++nR;}rows.sort(compareRows);for (i=0; i < rows.length; ++i)insAtTop(table.tBodies[0], rows[i]);}

[Add to Refworks]: javascript:var d=document,s=d.createElement('script'),EXT_SERVICE_PROVIDER='https://refworks.proquest.com',PME_SERVICE_PROVIDER='https://pme.proquest.com';s.src=PME_SERVICE_PROVIDER+'/PME.js';(d.body?d.body:d.documentElement).appendChild(s);void(0);

[View Cache]: javascript:location.href='http://webcache.googleusercontent.com/search?q=cache:%27+window.location.href

[Find Similar Pages]: javascript:(function(){ document.location.href='http://www.google.com/search?q=related:%27+escape(document.location.href) })();

[Show Linking Pages]: javascript:(function(){ document.location.href='http://www.google.com/search?q=link:%27+escape(document.location.href) })();

[Search Current Domain]: javascript:(function(){ p=prompt('Search term:',''); if(p){ document.location.href='http://www.google.com/search?q=site:%27+document.location.href.split(%27/%27)[2]+%27 %27+escape(p)} })();
