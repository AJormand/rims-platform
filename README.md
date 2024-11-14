## PLAN

- Done - Edit Organization --> add api route to edit org
- Done Country Library
- Done Country routes
- Done application product columns Typescript error
- Done Country section to Applications
- Done Controlled vocabulary fetching from backend
- Done Used controlled vocabulary in Product
- Done Add Status bar for PRD
- Done implemented editProduct api function
- Done need to fix issue where product doesnt refresh on edit
- Done implement change status
- Done fix status bar rerender issue
- Done Creating Registrations
- Done PRoduct status bar issue
- Done clicking on product on application doesnt properly fetch product
- Done Product Status button stopped working
- Done - finish product localstorage hook --> localstorage should be red from main page and then pushed to the sections
- Done - Product Skeleton -> fix overlaping
- Done - Edit Registration
- Done - Product - Sidenav count
- Done - Product - scroll fix
- Done - scroll fix for other objects
- Done - Add sidenav count for all other objects!!!!! [app, reg, sub, org, country]
- Done - expand sections from sidenav for PRD
- Done - FIX editing of basic details not working now with expand of section
- Done - added status bar to Prd, Reg, App
- Done - status bar does not need query key anymore as it is being updated via useState
- Done - Managed to implement create custom object - but still requires fixes
- Done - Managed to fix columns for the custom-object
- Done - data fetch not working with different objects
- Done - data fatching not working for editing custom object
- Done - edit custom object api function
- Done - added CustomObjectTemplates to schema prisma -> store templates
- Done - added CustomObjects to schema prisma -> store custom objects data
- I added CustomObjects-templates object where collection name and rules would be stored -> next I need to add code to add new custom objects to this collection and also programatically I need to create these collections and later add data to them
- custom object templates API call added and collection added -> idea is to store the rules into this collection whereas the objects themselves would be all stored in 1 collection named custom objects..

- left here -> trying to fix delete of the custom template

- todo - add status bar to other objects
- todo - build expand of sections when clicking on sidenav for other objects
- todo - add skeleton to other objects
- todo - add localstorage for open sections to other objects
- Error - Get Registrations for product
- add link to Registrations inside Applicaiton-Registrations joint

- Registration - edit route

## Challenges

- CV implementation -> have 1 library for all CVs
  - shall I fetch all CVs or only the ones needed?
  - when to fetch CVs? at start or on edit of some record
  - in multipe section components if I fetch with useQuery on section open I would actually fetch it many times....
  - --> implemented by adding staleTime: Infinity, to useQuery which ensures the CV data is fetched only 1x

## BACKLOG

- Loading spinner after deletion of Substances and ORganizations

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Packages used

Authentication --> @clerk/nextjs

Icons --> Lucide react is an open-source icon library

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

aaa

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
