# Photo credits

The Home hero (`home-hero`) is the owner's own artwork. Every other photograph in `public/images/photos/` is
from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license) (free to
use, commercial use allowed, no attribution required; credited here as a courtesy). No Unsplash+ (premium) images
are used.

Every Unsplash image was cropped, colour-graded (desaturated, olive shadows, warm highlights, soft vignette) and
exported as responsive WebP by `scripts/grade-photo.mjs`. The owner's artwork was only tone-matched into the page
background (`--light`) and exported as WebP at its native size and below. File names follow `<name>-<width>.webp`;
the sizes available for each name are listed in `src/data/photos.ts`.

| Name | Used for | Photographer | Source |
|---|---|---|---|
| `home-hero` | Home hero (all widths) and the default / Home share images | Owner-supplied | Owner-supplied artwork (`ai-worker.png`, 1920×1080), used with the owner's permission; tone-matched only |
| `how-we-work` | Home "How we work" carousel background | [Brooke Cagle](https://unsplash.com/@brookecagle) | https://unsplash.com/photos/silver-laptop-on-womans-lap-n1m25jvupEU |
| `final-cta` | Final call-to-action background | [Chloe Fung](https://unsplash.com/@chloefung) | https://unsplash.com/photos/desk-by-a-window-with-dark-curtains-StCrd5WABUE |
| `forest-mist` | Solution card backgrounds | [Dave Hoefler](https://unsplash.com/@iamthedave) | https://unsplash.com/photos/forest-covered-in-fog-vW1TR9cBcSg |
| `forest-fill` | Footer wordmark fill | [Kyle Glenn](https://unsplash.com/@kylejglenn) | https://unsplash.com/photos/green-leafed-pine-trees-SrASYZZpyjw |
| `forest-floor` | Footer forest floor | [Michael Nau](https://unsplash.com/@michaelnau) | https://unsplash.com/photos/rough-rocks-covered-in-vibrant-green-moss-3O_NzpG2_Ak |
| `about-portrait` | Home about row (circle) | [Jadon Johnson](https://unsplash.com/@jadonjohnson) | https://unsplash.com/photos/a-young-woman-with-curly-hair-poses-thoughtfully-2HzKsWPajIk |
| `about-hands` | Home about row (stadium card) | [Redd Francisco](https://unsplash.com/@reddfrancisco) | https://unsplash.com/photos/a-man-sitting-on-a-couch-using-a-laptop-computer-GLwp8InyT8Q |
| `about-office` | Home about row (circle) | [Haberdoedas](https://unsplash.com/@haberdoedas) | https://unsplash.com/photos/modern-office-interior-with-plants-and-hanging-lights-5hGx8Ak_0as |
| `hero-solutions` | Solutions overview hero | [Kristijan Arsov](https://unsplash.com/@aarsoph) | https://unsplash.com/photos/woman-near-window-m30-rEqPCAQ |
| `hero-lead` | Never Miss a Lead hero | [Makeen M.Alaa](https://unsplash.com/@muhmedelbank) | https://unsplash.com/photos/man-sitting-and-looking-at-his-phone-yEc-FTJHf9E |
| `hero-grow` | Grow Without Hiring hero | [Carlos Gil](https://unsplash.com/@carlosgil83) | https://unsplash.com/photos/man-in-brown-suit-jacket-sitting-on-chair-07Kxy1lSsvA |
| `hero-pay` | Make Your AI Pay hero | [Hasnain Ayaz](https://unsplash.com/@hasnainayaz_com) | https://unsplash.com/photos/someone-is-typing-on-a-laptop-keyboard-Kkh9CwrFFR8 |
| `hero-services` | Services hero (and service pages) | [Haberdoedas](https://unsplash.com/@haberdoedas) | https://unsplash.com/photos/modern-office-interior-with-plants-and-desk-mBcar0a3Fj8 |
| `hero-industries` | Industries hero (and industry pages) | [Firas Wardhana](https://unsplash.com/@firassu) | https://unsplash.com/photos/a-row-of-empty-desks-in-a-classroom-dYPbE5tDHo0 |
| `hero-pricing` | Pricing hero | [Evan Wise](https://unsplash.com/@evanthewise) | https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-desk-0ABOLMFuvGs |
| `hero-how` | How It Works hero | [Árpád Czapp](https://unsplash.com/@czapp_arpad) | https://unsplash.com/photos/a-person-using-a-laptop-M5bwcOxPg78 |
| `hero-about` | About hero | [Steffen Lemmerzahl](https://unsplash.com/@steffen_l) | https://unsplash.com/photos/black-and-white-table-lamp-on-brown-wooden-table-Y_kgII7ML3M |
| `hero-contact` | Contact hero | [Akram Huseyn](https://unsplash.com/@akramhuseyn) | https://unsplash.com/photos/woman-in-black-tank-top-using-macbook-pro-sgzFhiSUoII |
| `hero-cases` | Case studies hero | [visualsoflukas](https://unsplash.com/@lukas_blass) | https://unsplash.com/photos/man-sitting-in-front-of-a-computer-N7Bjz9vY67E |
| `hero-blog` | Blog hero | [Eagan Hsu](https://unsplash.com/@eaganhsu) | https://unsplash.com/photos/a-desk-with-a-lamp-on-it-in-a-dark-room-TFjn0lTCQqk |
| `hero-404` | 404 hero | [Liliia Liliia](https://unsplash.com/@whylilia) | https://unsplash.com/photos/a-forest-filled-with-lots-of-trees-covered-in-fog-7b_AicO5BxY |

## Fonts

- **Inter Tight** (variable, latin + latin-ext) by The Inter Project Authors, SIL Open Font License 1.1.
  Self-hosted from `@fontsource-variable/inter-tight`; licence text in `public/fonts/InterTight-OFL.txt`.

## Swapping in your own photos

1. Export your image at each width listed for that name in `src/data/photos.ts` (e.g. `hero-about-960.webp`,
   `hero-about-1600.webp`, `hero-about-2400.webp`) and overwrite the files in `public/images/photos/`.
2. If the aspect ratio changes, update the `width`/`height` values for that name in `src/data/photos.ts`.
3. Replace the matching row in this file with the new source and licence.
