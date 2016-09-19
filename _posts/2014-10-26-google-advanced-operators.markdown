---
layout: post
category: "web"
title: "google advanced operators"
tags: ["google search", "advanced operator"]
---
####allinanchor:
If you start your query with allinanchor:, Google restricts results to pages containing all query terms you specify in the anchor text on links to the page. For example, [ allinanchor: best museums sydney ] will return only pages in which the anchor text on links to the pages contain the words “best,” “museums,” and “sydney.”

Anchor text is the text on a page that is linked to another web page or a different place on the current page. When you click on anchor text, you will be taken to the page or place on the page to which it is linked. When using allinanchor: in your query, do not include any other search operators. The functionality of allinanchor: is also available through the Advanced Web Search page, under Occurrences.

####allintext:
If you start your query with allintext:, Google restricts results to those containing all the query terms you specify in the text of the page. For example, [ allintext: travel packing list ] will return only pages in which the words “travel,” “packing,” and “list” appear in the text of the page. This functionality can also be obtained through the Advanced Web Search page, under Occurrences.

####allintitle:
If you start your query with allintitle:, Google restricts results to those containing all the query terms you specify in the title. For example, [ allintitle: detect plagiarism ] will return only documents that contain the words “detect” and “plagiarism” in the title. This functionality can also be obtained through the Advanced Web Search page, under Occurrences.

The title of a webpage is usually displayed at the top of the browser window and in the first line of Google’s search results for a page. The author of a website specifies the title of a page with the HTML TITLE element. There’s only one title in a webpage. When using allintitle: in your query, do not include any other search operators. The functionality of allintitle: is also available through the Advanced Web Search page, under Occurrences.

In Image Search, the operator allintitle: will return images in files whose names contain the terms that you specify.

In Google News, the operator allintitle: will return articles whose titles include the terms you specify.

####allinurl:
If you start your query with allinurl:, Google restricts results to those containing all the query terms you specify in the URL. For example, [ allinurl: google faq ] will return only documents that contain the words “google” and “faq” in the URL, such as “www.google.com/help/faq.html”. This functionality can also be obtained through the Advanced Web Search page, under Occurrences.

In URLs, words are often run together. They need not be run together when you’re using allinurl:.

In Google News, the operator allinurl: will return articles whose titles include the terms you specify.

The Uniform Resource Locator, more commonly known as URL, is the address that specifies the location of a file on the Internet. When using allinurl: in your query, do not include any other search operators. The functionality of allinurl: is also available through the Advanced Web Search page, under Occurrences.

####author:
If you include author: in your query, Google will restrict your Google Groups results to include newsgroup articles by the author you specify. The author can be a full or partial name or email address. For example, [ children author:john author:doe ] or [ children author:doe@someaddress.com ] return articles that contain the word “children” written by John Doe or doe@someaddress.com.

Google will search for exactly what you specify. If your query contains [ author:”John Doe” ] (with quotes), Google won’t find articles where the author is specified as “Doe, John.”

####cache:
The query cache:url will display Google’s cached version of a web page, instead of the current version of the page. For example, [ cache:www.eff.org ] will show Google’s cached version of the Electronic Frontier Foundation home page.

Note: Do not put a space between cache: and the URL (web address).

On the cached version of a page, Google will highlight terms in your query that appear after the cache: search operator. For example, [ cache:www.pandemonia.com/flying/ fly diary ] will show Google’s cached version of Flight Diary in which Hamish Reid’s documents what’s involved in learning how to fly with the terms “fly” and “diary” highlighted.

####define:
If you start your query with define:, Google shows definitions from pages on the web for the term that follows. This advanced search operator is useful for finding definitions of words, phrases, and acronyms. For example, [ define: blog ] will show definitions for “Blog” (weB LOG).

####ext:
This is an undocumented alias for filetype:.

####filetype:
If you include filetype:suffix in your query, Google will restrict the results to pages whose names end in suffix. For example, [ web page evaluation checklist filetype:pdf ] will return Adobe Acrobat pdf files that match the terms “web,” “page,” “evaluation,” and “checklist.” You can restrict the results to pages whose names end with pdf and doc by using the OR operator, e.g. [  email security filetype:pdf OR filetype:doc ].

When you don’t specify a File Format in the Advanced Search Form or the filetype: operator, Google searches a variety of file formats; see the table in File Type Conversion.

####group:
If you include group: in your query, Google will restrict your Google Groups results to newsgroup articles from certain groups or subareas. For example, [ sleep group:misc.kids.moderated ] will return articles in the group misc.kids.moderated that contain the word “sleep” and [ sleep group:misc.kids ] will return articles in the subarea misc.kids that contain the word “sleep.”

####id:
This is an undocumented alias for info:.

####inanchor:
If you include inanchor: in your query, Google will restrict the results to pages containing the query terms you specify in the anchor text or links to the page. For example, [ restaurants inanchor:gourmet ] will return pages in which the anchor text on links to the pages contain the word “gourmet” and the page contains the word “restaurants.”

####info:
The query info:URL will present some information about the corresponding web page. For instance, [ info:gothotel.com ] will show information about the national hotel directory GotHotel.com home page.

Note: There must be no space between the info: and the web page URL.

This functionality can also be obtained by typing the web page URL directly into a Google search box.

####insubject:
If you include insubject: in your query, Google will restrict articles in Google Groups to those that contain the terms you specify in the subject. For example, [ insubject:”falling asleep” ] will return Google Group articles that contain the phrase “falling asleep” in the subject.

Equivalent to intitle:.

####intext:
The query intext:term restricts results to documents containing term in the text. For instance, [ Hamish Reid intext:pandemonia ] will return documents that mention the word “pandemonia” in the text, and mention the names “Hamish” and “Reid” anywhere in the document (text or not).

Note: There must be no space between the intext: and the following word.

Putting intext: in front of every word in your query is equivalent to putting allintext: at the front of your query, e.g., [ intext:handsome intext:poets ] is the same as [ allintext: handsome poets ].

####intitle:
The query intitle:term restricts results to documents containing term in the title. For instance, [ flu shot intitle:help ] will return documents that mention the word “help” in their titles, and mention the words “flu” and “shot” anywhere in the document (title or not).

Note: There must be no space between the intitle: and the following word.

Putting intitle: in front of every word in your query is equivalent to putting allintitle: at the front of your query, e.g., [ intitle:google intitle:search ] is the same as [ allintitle: google search ].

####inurl:
If you include inurl: in your query, Google will restrict the results to documents containing that word in the URL. For instance, [ inurl:print site:www.googleguide.com ] searches for pages on Google Guide in which the URL contains the word “print.” It finds pdf files that are in the directory or folder named “print” on the Google Guide website. The query [ inurl:healthy eating ] will return documents that mention the words “healthy” in their URL, and mention the word “eating” anywhere in the document.

Note: There must be no space between the inurl: and the following word.

Putting inurl: in front of every word in your query is equivalent to putting allinurl: at the front of your query, e.g., [ inurl:healthy inurl:eating ] is the same as [ allinurl: healthy eating ].

In URLs, words are often run together. They need not be run together when you’re using inurl:.

####link:
The query link:URL shows pages that point to that URL. For example, to find pages that point to Google Guide’s home page, enter:

[ link:www.googleguide.com ]

Note: According to Google’s documentation, “you cannot combine a link: search with a regular keyword search.”

Also note that when you combine link: with another advanced operator, Google may not return all the pages that match. The following queries should return lots of results, as you can see if you remove the -site: term in each of these queries.

Find links to the Google home page not on Google’s own site.

[ link:www.google.com -site:google.com ]

Find links to the UK Owners Direct home page not on its own site.

[ link:www.www.ownersdirect.co.uk -site:ownersdirect.co.uk ]

####location:
If you include location: in your query on Google News, only articles from the location you specify will be returned. For example, [ queen location:canada ] will show articles that match the term “queen” from sites in Canada. Many other country names work; try them and see.

Two-letter US state abbreviations match individual US states, and two-letter Canadian province abbreviations (like NS for Nova Scotia) also work — although some provinces don’t have many newspapers online, so you may not get many results. Some other two-letter abbreviations — such as UK for the United Kingdom — are also available.

####movie:
If you include movie: in your query, Google will find movie-related information. For examples, see Google’s Blog.

####related:
The query related:URL will list web pages that are similar to the web page you specify. For instance, [ related:www.consumerreports.org ] will list web pages that are similar to the Consumer Reports home page.

Note: Don’t include a space between the related: and the web page url.

You can also find similar pages from the “Similar pages” link on Google’s main results page, and from the similar selector in the Page-Specific Search area of the Advanced Search page. If you expect to search frequently for similar pages, consider installing a GoogleScout browser button, which scouts for similar pages.

####site:
If you include site: in your query, Google will restrict your search results to the site or domain you specify. For example, [ admissions site:www.lse.ac.uk ] will show admissions information from London School of Economics’ site and [ peace site:gov ] will find pages about peace within the .gov domain. You can specify a domain with or without a period, e.g., either as .gov or gov.

Note: Do not include a space between the “site:” and the domain.

You can use many of the search operators in conjunction with the basic search operators +, –, OR, and " ". For example, to find information on Windows security from all sites except microsoft.com, enter:

[  windows security –site:microsoft.com  ]

You can also restrict your results to a site or domain through the domains selector on the Advanced Search page.

####source:
If you include source: in your query, Google News will restrict your search to articles from the news source with the ID you specify. For example, [ election source:new_york_times ] will return articles with the word “election” that appear in the New York Times.

To find a news source ID, enter a query that includes a term and the name of the publication you’re seeking. You can also specify the publication name in the “news source” field in the Advanced News Search form. You’ll find the news source ID in the query box, following the source: search operator. For example, let’s say you enter the publication name Ha’aretz in the News Source box, then you click the Google Search button. The results page appears, and its search box contains [ peace source:ha_aretz__subscription_ ]. This means that the news source ID is ha_aretz__subscription_. This query will only return articles that include the word “peace” from the Israeli newspaper Ha’aretz.

