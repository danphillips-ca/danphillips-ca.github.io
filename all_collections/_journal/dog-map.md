---
layout: posts
title:  "Radial Line of Sight and Dogs"
date:   2023-04-04 00:00:00 -0300
categories: journal
author: Dan Phillips
excerpt: "In Saskatchewan, there's nothing to do but watch your dog run away for three days. Can that be true?"
teaser: /assets/images/poster.jpg
---

<!-- I'm using this as my primary test journal entry -->

This was a fun little poster project to make use of a Radial Line of Sight package in Esri ArcMaps.

## Can Jess see her Dogs?
There is an old joke that says Saskatchewan is so flat, you can watch your dog run away for three days. I have a friend who lives in Saskatchewan and she has two dogs. Admittedly, she doesn’t live in the flattest part of Saskatchewan — but let’s see if the old addage applies anyway!

Jess has two dogs: an Australian Shephard named Ocean, and a Lassie Collie named Tully. To get the best vantage, our starting point is the tallest hill in town. Three days is an awful long time, so let’s cut that down to just one hour.

### How far can these dogs run in an hour?
Even the most determined doggo can’t run at full speed for a full hour, but let’s pretend these pups can run at full speed without needing to pause. (Paws?)

#### **Tully** the Lassie Collie | 43.13 km.
  According to the American Kennel Club, the fastest Collie could run 26.8mph. (That’s 43.13km/h in Canadian units!)

#### **Ocean** the Aussie Shepherd | 48.8 km
  American Kennel Club reports that the fastest Australian Shepherd’s record is even faster at 30.3mph! (Canadianized, that is 48.8km/h.)

<--!["A map of an area in Saskatchewan showing two circles that represent the distance from the center that two respective dog breeds could reach within an hour. The circles are filled with grey and white areas, which the legend describes as "dog seen" (white) and "dog gone" (grey). The area is mostly grey."][DogMap]-->

Thanks to Jess and her family for photos of their beautiful dogs and for inspiring this project.

## Considerations

The Radial Line of Sight (RLOS) package is available through Military Tools for ArcGIS. It generated the visibility layer using an elevation raster layer obtained from a Government of Canada survey (not pictured). Vector files for boundaries and roads were obtained from the StatsCan census to provide context for readers familiar with the area. Distances were determined by guides available from the American Kennel Club.

Using the American Kennel Association’s top speed of dog breeds was a way of determining a distance that was a consistent measure from a consistent source. It is no means representative of what a dog can run – especially for a sustained period. This was a subjective decision among several unsatisfying options.

Obviously, a dog could not run at full speed for a two day marathon – but if they could, these dogs would run between 3100-3600km. Saskatchewan itself is only 630km along the American border. That scale wouldn’t provide an informative map. Through experimentation, even a three hour run would leave very little sightlines from the starting point.

<!--[DogMap]: /assets/images/journalpost/dogmap.png "How far can these dogs run?"-->