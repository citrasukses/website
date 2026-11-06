# TOHNICHI seminar and field photos

The homepage combines field activities and the “Torque tools that are made to
last” story in one compact, two-column section directly after the authorized
distributor logos, before the product finder. The light column cycles between
Toyota/IMG_8852 and IMG_8848. The activities column cycles through all six
approved field photos. Both columns use soft, light backgrounds and omit the
small “CSE di lapangan” and “TOHNICHI · Alat di lapangan” labels. The columns
stack on mobile. Both carousels have independent previous,
next, and direct photo controls, keyboard arrow navigation, swipe support, and
localized live captions. Each advances automatically every five seconds, with
independent pause/resume controls. Rotation pauses during hover or keyboard
focus and is disabled for reduced-motion preferences. Manual navigation starts
a fresh five-second interval once interaction ends. Captions are announced only
while rotation is paused; transitions respect reduced-motion preferences.

The TOHNICHI brand page retains its six-photo gallery after technical selection
support. The homepage links to this fuller gallery, preserving both the
`#field-support` and `#tohnichi-durability` anchors.

## Originals and public images

Full-resolution originals, including unselected photos and videos, are kept at
`source-images/seminars/tohnichi/`, outside the web root and ignored by Git.
They were moved intact from `public/assets/company/seminars/tohnichi/` so photos
with faces cannot be exposed by a static export or a direct asset URL.

Six gallery photos and two homepage story photos with **no visible faces in the published
frame** are selected. The GS Battery measurement photo has a person at the
edge of its original frame, so its fixed crop excludes that area. The explicit source list is in
`scripts/prepare-seminar-images.mjs`; captions and alt text are in
`data/tohnichi-field-photos.ts`. Do not replace these with an automatic scan of
the originals. Do not publish a frame containing visible faces.

Regenerate optimized assets locally with:

```sh
node scripts/prepare-seminar-images.mjs
```

The script preserves the full frame except for the documented GS Battery crop
and writes 640px and 1440px WebP versions
without EXIF/GPS metadata. The layout uses responsive sources, lazy loading,
fixed aspect ratios, and localized alt text. Commit the optimized public assets;
production builds do not need the originals.

The hands-on tightening photo uses the approved master at
`source-images/seminars/tohnichi/redacted/hands-on-tightening.png`. The
confidential identification sticker on the wrench is blurred in this master;
pixels outside the sticker region match the original public photograph.
Never regenerate it from `Toyota/IMG_8872.jpeg`. Public filenames include
`hands-on-tightening-redacted` to avoid serving cached unredacted versions.

Client names, dates, attendee counts, testimonials, and claimed production
improvements are intentionally omitted because no event notes were supplied.
Add them only when confirmed by the owner.
