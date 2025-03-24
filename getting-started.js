

//https://www.youtube.com/watch?v=LBOhVng5rk8&t=2083s



//CMS SETUP
//sign up with https://prismic.io/dashboard/signup (github) > select a repo (nextJS) > connect own web app > name app (skatersite) > answer questions > free > create repo




//project setup
//nvm use 20.18.0
//npx create-next-app@latest appNameHere(skatersite)
//answer yes to everything, except last (renaming alias)
//cd into folder and run: npx @slicemachine/init@latest --repository appNameHere(skatersite)
//delete everything in global css(except tailwind) and page.tsx
//npm run slicemachine (if needed) > open on 9999 > create page type > single type (1 home page) > name Homepage > click review changes on left > push
//note: 9999 is where you set types and what the user can change(titles, img, etc), prismic site is where you edit you that content made available
//notice a customtypes folder and other files appears at root
//now in prismic site we can press "I have pushed my models"
//create new page > select Homepage > fill in metadata tab > save in top right > publish in top right
//in 9999, click page types on left > click into Homepage > click add slice > create new > name Hero
//in 9999, click page types on left > click into Homepage > click Hero slice > add field > rich text > name it Body >  only select p, b, i for "text options" (do same for any more needed)
//notice now we have src/app/slices/hero/model... and we didnt even publish!
//in 9999, click page types on left > click into Homepage > click Hero slice > at top press "show code snippets" > copy each into src/app/slices/hero/index.tsx
//if red squiggle, click light bulb and import
//at this point, you can simulate the site, by clicking "simulate" in top right, then changing code in Hero will show up there too (handy for dummy data and faster testing)
//review changes > push
//in prismic site > Homepage > under Hero, add some text for header and body and button
//in 9999, click page types on left > click into Homepage > page snippet in top right > copy and paste into root(home) page.tsx

//site settings and menus
//if the content isnt a page, we can add "custom types" for general menus/settings etc
//in 9999, click custom types on left > single type > name it settings
//click + next to "static zone" > Text > name it Site title
//again for Meta description
//again for Fallback image (select image not text)
//global nav
//add another, select repeatable group > name it Navigation > under Navigation item click "Add field" > add link > name it Link
//review changes > push 
//now in prismic site > create new page > select settings > fill in the info we gave it, including a lists of links > save > publish

//adding product
//in 9999 select custom types > new > reusuable type (need many) > name it Skateboard > it needs a Name(text, move to top), Price(number), Image(image), Customiser Link(link)
//now we have a product (skateboard) that has "fields", we can add it to a new slice (section)
//in 9999 select slices > new > name it ProductGrid > add Heading (rich text, h2), Body (rich text, p b i) 
//add "repeatable group" call it Product > in there add field for "content relationship" > name it Skateboard, under types select Skateboard we made before
//because we added a new slice, we need to add it to home page, as they arent added to pages automatically > page types > Home page > add > productGrid
//push > publish
//now in prismic site > create new page > select skateboard > fill in details we gave it in 9999 > save > publish
//now in prismic site > home page > click bottom plus on left > add productGrid slice we made in 9999 > fill in fields we made in 9999, give it a product we added before (link to page, which is weird) 
//save > publish
//refresh site to see placeholder component message at bottom. This was added because we added a new slide to our site! (src/slices/productGrid file appears)
//we can edit that by going to 9999 > slices > productGrid > show code snippets (top), and copy any pasting each block into src/slices/productGrid (see file)
//in src/slices/productGrid add SkateboardProduct.tsx, import a product here from prismic (see file)


//live preview
//copy dev url (http://localhost:3000/)
//now in prismic site > home page > click live preview on left > get live editing > paste in url (it adds /slice-simulator) > save

//npm run dev
//npm run slicemachine









//FAVICON
//get favicon (icon.svg) from /surburbia-course-assets, place it where favicon is(src/app) and delete favicon
//should see icon in browser tab

//IMAGES
//delete everything in public, add everything from /surburbia-course-assets/add-to-public
//in prismic click media library on left > upload media > add everything from /surburbia-course-assets/add-to-prismic
//optional, in 9999 > click slices on left > click "add snapshot" and choose an image from  /surburbia-course-assets/slice-snapshots


//COMPONENTS AND CLSX AND TAILWIND FLUID
//fluid just adds clamp to text, may not need it
//clsx lets us "merge" logic/conditional based class names, with static ones (like `${styles.thing} thing2`)
//npm i clsx -S
//npm i fluid-tailwind -D (needed to add --force because of a version conflict)
//NOTE: tailwind v4 no longer has tailwind.config... so see postcss.config for setup
//create src/components/Bounded.tsx (copy content from https://prismic.io/courses/suburbia-skateboards#-documentation)
//now in src/slices/Hero, import and replace <section> with <Bounded>
//create src/app/components/Header.tsx


//TAILWIND (downgrading)
//tailwind v4 would not work with things in this tutorial, like fluid. So went back to v3, for its tailwind.config
//npm uninstall tailwindcss
//npm uninstall @tailwindcss/postcss
//delete postcss.config
//delete nodeModules
//npm install -D tailwindcss@3 postcss autoprefixer
//npx tailwindcss init -p (creates tailwind.config and postcss.config)
//import tailwind css into app/globals.css (see file)
//change tailwind.config to .ts (not .tsx!) and edit (see file)


//FONTS
//in root layout.tsx, change imported font (see file)...importing from next/font/google is way better performance
//replace giest and geist_mono functions and <body> tag with new fonts and classes
//now update postcss.config (see file) to add font classes to tailwind (font-sans, font-mono)


//COLOURS
//add colours to postcss.config so we can use them with tailwind
//now we can do bg-brand-blue or text-brand-blue


//IMAGES
//anything in public folder is the start of an image path, for example src="/bg-texture.webp"


//ICONS
//using react-icons: https://react-icons.github.io/react-icons/
//npm i react-icons -S


//ANIMATED BACKGROUND TEXT
//see src/app/components/SVGFilters and src/slices/Hero/WideLogo
//see animations added to tailwind.config


//SLIDE IN ANIMATIONS
//add slide-in-hidden class to globals.css
//add keyframe (see global.css file)
//create src/app/components/SlideIn.tsx (snippet tsrfc, remove word default) (see file)
//import and wrap <SlideIn> around whatever you want (can wrap around another component)
//see app/slices/TeamGrid.tsx, app/slices/ProductGrid.tsx for examples


//PHYSICS
//create src/app/components/Footer.tsx (snippet tsrfc, remove word default)
//import and add to layout.tsx
//in 9999 > custom types > settings > add image > call it footer image (this is for background)
//in 9999 > custom types > settings > add repeatable group > name it footer skateboards > under group add image > call it skateboard
//review changes > push
//in prismic > settings > footer image > select some boards for the repeatable group in settings
//create src/app/components/FooterPhysics.tsx
//npm i matter-js @types/matter-js
//import and add FooterPhysics to Footer.tsx


//3D IN HERO (three.js)
//npm i three @react-three/fiber @react-three/drei gsap @gsap/react
//at root create .npmrc to add legacy-peer-deps (see file)
//we need because *at time of writing" project, we are using react19 release candidate and react-three-fibre dont work well with latest versions
//add src/slices/Hero/InteractiveSkateboard.tsx (snippet tsrfc, remove word default)
//import into src/slices/Hero.tsx 
//convert to .gltf file (create in blender), it a jsx file > drop public/skateboard.gltf *and* public/skateboard.bin into site: https://gltf.pmnd.rs/ *at the same time!*
//open drop down in top right > tick settings, keep names, keep groups > click exports > copy to clipboard
//create src/app/components/Skateboard.tsx > paste
//made a new SkateboardProps type, and used that instead (see file)
//import and use src/app/components/Skateboard.tsx into InteractiveSkateboard.tsx
//for textures, see src/app/components/Skateboard.tsx

//hotspots (visual click spots)
//create src/slices/Hero/Hotspot.tsx (snippet tsrfc, remove word default)

//wavy lines (hero)
//create src/slices/Hero/WavyPaths.tsxt (snippet tsrfc, remove word default) (see file)







//CUSTOMISE BOARD PAGE
//we need different "layouts" for our customise page so theres no header/footer, but at mo we have header/footer in "main layout" page (src/app/layout.tsx) which is global, so effects all pages
//we can use "route groups" for this. They dont effect the url path (like normal folders do)
//create src/app/(home-page) folder > move src/app/page.tsx(home page) into src/app/(home-page) that we just made
//now in (home-page) create a new layout.tsx (snippet tsrfc, *do not* remove word default) (see file)
//now in src/app/layout, remove header and footer 
//src/app/(home-page)/page.tsx, is stil the homepage, as (), doesnt change the url paths...but we used a group to wrap it with a layout.tsx
//note: it *first* goes into src/app/layout to get all the global stuff(like fonts) in there, but *also* uses (home-page)/layout, *just for the home page*
//in 9999 > custom types on left > create > single type (because new page) > name it Board customiser
//created new tabs, Wheels, Decks, Metals
//in wheels add a repeatable group, then to that group add an image named texture and Text named UID 
//repeat for decks
//repeat for metals, but select Color instead of image
//review changes > push changes (top right)
//now in prismic site >  create the page > select Board customiser we just made > add wheels/decks/metals img and UID
//create src/app/build/page.tsx (snippet tsrfc, *do not* remove word default) (see file)





//DEPLOY
//sign into github > new repo
//copy lines from "…or push an existing repository from the command line":
// git remote add origin https://github.com/BenjaDotMin/skatesite.git
// git branch -M main
// git push -u origin main
//now for any changes, just commit and its connected to github


//netlify
//once repo is on github, use netlify of (vercel) to get online
//new new site > import exisiting > github > select repo > deploy


//update prismic preview site
//in prismic site > click any item > top right click 3 dots > live preview settings > paste in new url
//in prismic site > bottom left click "Settings" > preview on left > change Site Name to Production > domain to new url > Preview route to /api/preview
//webhooks: https://youtu.be/LBOhVng5rk8?si=3TNuyFrqiHnwQYsN&t=34143